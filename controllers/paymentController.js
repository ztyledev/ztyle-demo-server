const asyncHandler = require('express-async-handler')
const Razorpay = require('razorpay')
const crypto = require('crypto')


//models
const paymentModel = require('../models/paymentModel')
const bookingModel = require ('../models/bookingModel')
const shopModel = require ('../models/shopModel')
const offerModel = require('../models/offerModel')
const offerRedemptionModel = require('../models/offerRedemptionModel')


const PaymentHome = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "payment routes : home page" })
})

const getServicePrice = asyncHandler(async (req, res) => {
    const { bookingId, offerCode } = req.body
    // validate back end
    if (!bookingId) {
        res.status(404)
        throw new Error('Booking Id Field Is Empty')
    }

    //get corresponding booking
    const currentBooking = await bookingModel.findById(bookingId)
    
    // booking validation
    if (!currentBooking) {
        res.status(400)
        throw new Error('Booking Not Found')
    }

    //extract price and service from booking

    const {shopId,service} = currentBooking

    //get corresponding shop and service

    const currentShop = await shopModel.findOne({ shopId })
    
    // shop validation
    if (!currentShop) {
        res.status(400)
        throw new Error('Shop Not Found')
    }
    
    const currentService = currentShop.menu?.find(menu => menu.name === service)
    
    // service validation
    if (!currentService) {
        res.status(400)
        throw new Error('Service Not Found')
    }

    if (currentBooking.status !== "confirmed") {
        res.status(400)
        throw new Error('Cannot Make Payment Since Your Booking Is Not Confirmed')
    }


    let netPrice = Number(currentService.price);
    // check whether offer is applicable to the price

    if (offerCode) {
        const offer = await offerModel.findOne({ offerCode })
        
        // existence of offer
        if (!offer) {
            res.status(404)
            throw new Error('No Offer Found For The Code')
        }

        // access the offer status
        if (offer.status !== "active") {
            res.status(400)
            throw new Error('This Offer Is Not Active Now')
        }
        
        // check the offer redemption by user
        const redemption = await offerRedemptionModel.findOne({ userId: currentBooking.userId, offerId: offer._id })
        
        if (redemption) {
            if (redemption.status === "used") {
                
                res.status(400)
                throw new Error('Offer Is Already redeamed')
            }
        }

        // modify the net price
        netPrice = Number(currentService.price) - Number(currentService.price) * offer.discountPercentage / 100
        
        // update the redemption status

        await offerRedemptionModel.create({ userId: currentBooking.userId, offerId: offer._id, status: "used" })
        
    }

    const paymentDetails = {
        amount : netPrice + 1,
        splitAmount: netPrice,
        accountId : currentShop.accountId
    }
    
    if (paymentDetails) {
        res.status(200).json(paymentDetails)
    } 
    else {
        res.status(400)
        throw new Error('payment details doesnot exist')
    }

    
})

const addOrder = asyncHandler(async (req, res) => {

    const { amount, splitAmount, accountId } = req.body
    
    // validate the fields
    if (!amount || !splitAmount || !accountId) {
        res.status(404)
        throw new Error('At Least One Field Is Empty')

    }
    
    // create razorpay instance
    const instance = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret:process.env.KEY_SECRET
    })

    const options = {
        amount: amount * 100,
        currency: 'INR',
        receipt: crypto.randomBytes(10).toString('hex'),
        transfers: [
            {
            
                account: accountId,
                amount: splitAmount * 100,
                currency: 'INR',
                notes: {
                    type: 'Split payment',
                    account:'Shop Account'
                },
                on_hold:0
            }
        ]
    }

    instance.orders.create(options, (error, order) => {
        if (error) {
            console.log(error)
            return res.status(500).json({message:"Something Went Wrong"})
        }
        res.status(200).json(order)
    })

    
})

const verifyOrder = asyncHandler(async (req, res) => {
    
    const {
        razorpay_order_id, razorpay_payment_id,
        razorpay_signature, bookingId, userId, amount,
        currency,paymentMethod
    } = req.body

    // validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId || !userId || !amount || !currency || !paymentMethod) {
        res.status(404)
        throw new Error('At Least One Field Is Empty')
    }

    // verify the razorpay signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSign = crypto.createHmac("sha256", process.env.KEY_SECRET).update(sign.toString()).digest('hex')

    if (razorpay_signature === expectedSign) {
        // payment data object

        const newPayment = {
            paymentId:razorpay_payment_id,
            orderId: razorpay_order_id,
            bookingId,
            userId,
            amount,
            currency,
            paymentMethod,
            status:"success"
        }

        await paymentModel.create(newPayment)
        await bookingModel.findByIdAndUpdate(bookingId, { status: 'completed' })
        
        const payment = await paymentModel.findOne({ bookingId })
        if (payment) {
            res.status(200).json(payment)
        }
        else {
            res.status(400)
            throw new Error("Invalid Payment")
        }
        
    }
    else {
        res.status(500)
        throw new Error("Invalid Signature .")
    }
    
    
})

const getPaymentById = asyncHandler(async (req, res) => {

    const { id } = req.params
    
    // access the booking with specified id
    const payment = await paymentModel.findById(id)
    if (payment) {
        res.status(200).json(payment)
    }
    else {
        res.status(404)
        throw new Error('Payment Not Found')
    }
})

const getPaymentByBookingId = asyncHandler(async (req, res) => {

    const { id } = req.params
    
    // access the booking with specified id
    const payment = await paymentModel.findOne({ bookingId: id })
    
    if (payment) {
        res.status(200).json(payment)
    }
    else {
        res.status(404)
        throw new Error('Payment Not Found')
    }
})

const getPaymentByByField = asyncHandler(async (req, res) => {
    
    //access field and value 
    const { field, value } = req.body
    // write cquery to select the field
    const query = {
        [field]:value
    }

    const payments = await paymentModel.find(query)

    if (payments.length !== 0) {
        res.status(200).json(payments)
    }
    else {
        res.status(400)
        throw new Error('No Payments Found For Specified Field')
    }

})


module.exports = {
    PaymentHome,
    getServicePrice,
    addOrder,
    verifyOrder,
    getPaymentById,
    getPaymentByBookingId,
    getPaymentByByField
    
}
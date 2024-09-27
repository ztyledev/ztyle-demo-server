const asyncHandler = require('express-async-handler')

//models
const paymentModel = require('../models/paymentModel')
const bookingModel = require ('../models/bookingModel')
const shopModel = require ('../models/shopModel')


const PaymentHome = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "payment routes : home page" })
})

const getServicePrice = asyncHandler(async (req, res) => {
    const {id} = req.params

    //get corresponding booking

    const currentBooking = await bookingModel.findById(id)
    
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

    const paymentDetails = {
        amount : currentService.price + 5,
        splitAmount : currentService.price,
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


module.exports = {
    PaymentHome,
    getServicePrice
}
const asyncHandler = require('express-async-handler')


// models
const offerModel = require('../models/offerModel')
const offerRedemptionModel = require('../models/offerRedemptionModel')


const offerHome = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "offer routes : home page" })
})

/// Offers

const getOffers = asyncHandler(async (req, res) => {
    // get all offers from db
    const offers = await offerModel.find()
    
    // check the existence of any offer
    if (offers.length !== 0) {
        res.status(200).json(offers)
    }
    else {
        res.status(404)
        throw new Error('No Offers Found')
    }
})

const addOffer = asyncHandler(async (req, res) => {
    const offer = req.body
    const { offerName, offerCode, startDate, endDate, discountPercentage } = offer
    // validate fields
    if (!offerName || !offerCode || !startDate || !endDate || !discountPercentage) {
        res.status(404)
        throw new Error('At Least One Field Is Empty')
    }

    // existence of offercode
    const existingCode = await offerModel.findOne({ offerCode })
    if (existingCode) {
        res.status(409);
        throw new Error('offer code already exists');
    }
    
    // create new offer
    const newOffer = await offerModel.create(offer)
    if (newOffer) {
        res.status(200).json(newOffer)
    }
    else {
        res.status(400)
        throw new Error('invalid offer')
    }

})
const getOfferById = asyncHandler(async (req, res) => {
    const { id } = req.params
    // access offer from db by id
    const offer = await offerModel.findById(id)
    if (offer.endDate < new Date())
    {
        const offerData = { status: 'inactive' }
        await offerModel.findByIdAndUpdate(id, offerData)
        
    }
    
    const updatedOffer = await offerModel.findById(id)

    // existence of updated offer
    if (updatedOffer) {
        res.status(200).json(updatedOffer)
    }
    else {
        res.status(404)
        throw new Error("Offer Not Found")
    }
    
    
})

const updateOfferById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const offer = req.body
    // update database
    await offerModel.findByIdAndUpdate(id, offer)
    
    // validate the updation
    const updatedOffer = await offerModel.findById(id)
    if (updatedOffer) {
        res.status(200).json(updatedOffer)
    }
    else {
        res.status(400)
        throw new Error('Invalid Offer')
    }


})

const deleteOfferById = asyncHandler(async (req, res) => {
    const { id } = req.params
    // delete the current offer
    await offerModel.findByIdAndDelete(id)

    // validate delete
    const deletedOffer = await offerModel.findById(id)
    if (!deletedOffer) {
        res.status(200).json(id)
    }
    else {
        res.status(400)
        throw new Error('Delete Failed')
    }
 
})

const getOfferByOfferCode = asyncHandler(async (req, res) => {
    const { offerCode } = req.body
    
    // validate backend

    if (!offerCode) {
        res.status(404)
        throw new Error('The Field Is Empty')
    }

    const offer = await offerModel.findOne({ offerCode })
    
    if (offer) {
        res.status(200).json(offer)
    }
    else {
        res.status(404)
        throw new Error('Offer Not Found')
    }

    
})

/// Offer Redemptions

const getRedemptionByUserId = asyncHandler(async (req, res) => {
    const { id } = req.params
    
    // check for the existence of any redemed offer
    const redemptions = await offerRedemptionModel.find({ userId: id })
    
    if (redemptions.length !== 0) {
        res.status(200).json(redemptions)
    }
    else {
        res.status(404)
        throw new Error('No Offer Is Redeemed By this user')
    }

    // res.json({ message: "get redumption by use id : success" })
})


module.exports = {
    offerHome,
    getOffers,
    addOffer,
    getOfferById,
    updateOfferById,
    deleteOfferById,
    getOfferByOfferCode,
    getRedemptionByUserId

}
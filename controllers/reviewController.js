const asyncHandler = require('express-async-handler')

// models
const beauticianReviewModel = require('../models/beauticianReviewModel')
const userModel = require('../models/userModel')
const beauticianProfileModel = require('../models/beauticianProfileModel')
const shopReviewModel = require('../models/shopReviewModel')
const shopModel = require('../models/shopModel')

// utils
const netReview = require('../utils/netReview')


const reviewHome = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "review routes: home page" })
})

/// User Section

// Beautician reviews
const addBeauticianReview = asyncHandler(async (req, res) => {
    const { userId, beauticianId, rating, reviewText } = req.body
    
    // validation
    if (!userId || !beauticianId || !rating) {
        res.status(404)
        throw new Error('At Least One Field Is Empty')
    }

    // existence of user
    const currentUser = await userModel.findById(userId)
    if (!currentUser) {
        res.status(404)
        throw new Error('User Does not exist')
    }

    // existence of beautician
    const currentBeautician = await beauticianProfileModel.findById(beauticianId)
    if (!currentBeautician) {
        res.status(404)
        throw new Error('Beautician Profile Does not exist')
    }

    const existingReview = await beauticianReviewModel.findOne({ userId, beauticianId })
    
    if (existingReview) {
        res.status(409);
        throw new Error('You Have Already Submitted Review For This Beautician . Please Edit Instead');

    }

    // create db entry
    const beauticianReview = await beauticianReviewModel.create({ userId, beauticianId, rating, reviewText })
    
    // update the beautician review
    const reviewStatus = netReview("beautician", beauticianId)
    if (!reviewStatus) {
        res.status(400)
        throw new Error('Review Update Failed')
    }

    if (beauticianReview) {
        res.status(200).json(beauticianReview)
    }
    else {
        res.status(400)
        throw new Error('invalid review')
    }
    

})

const updateBeauticianReviewById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const beauticianReview = req.body
    
    // update the current review in db
    await beauticianReviewModel.findByIdAndUpdate(id, beauticianReview)

    

    // validate the update
    const updatedBeauticianReview = await beauticianReviewModel.findById(id)

    // update the beautician review
    const reviewStatus = netReview("beautician", updatedBeauticianReview.beauticianId)
    if (!reviewStatus) {
        res.status(400)
        throw new Error('Review Update Failed')
    }

    if (updatedBeauticianReview) {
        res.status(200).json(updatedBeauticianReview)
    }
    else {
        res.status(400)
        throw new Error('invalid review')

    }
    
})

const getMyBeauticianReview = asyncHandler(async (req, res) => {
    const { userId, beauticianId } = req.body
    
    // existence of user
    const currentUser = await userModel.findById(userId)
    if (!currentUser) {
        res.status(404)
        throw new Error('User Does not exist')
    }

    // existence of beautician
    const currentBeautician = await beauticianProfileModel.findById(beauticianId)
    if (!currentBeautician) {
        res.status(404)
        throw new Error('Beautician Does not exist')
    }

    // access the review
    const myReview = await beauticianReviewModel.findOne({ userId, beauticianId })
    
    if (myReview) {
        res.status(200).json(myReview)
    }
    else {
        res.status(404)
        throw new Error("No Review Found")
    }
    
})

// Shop Reviews
const addShopReview = asyncHandler(async (req, res) => {
    const { userId, shopId, rating, reviewText } = req.body
    
    // validation
    if (!userId || !shopId || !rating) {
        res.status(404)
        throw new Error('At Least One Field Is Empty')
    }

    // existence of user
    const currentUser = await userModel.findById(userId)
    if (!currentUser) {
        res.status(404)
        throw new Error('User Does not exist')
    }

    // existence of shop
    const currentShop = await shopModel.findOne({ shopId })
    if (!currentShop) {
        res.status(404)
        throw new Error('Shop Does not exist')
    }

    const existingReview = await shopReviewModel.findOne({ userId, shopId })
    
    if (existingReview) {
        res.status(409);
        throw new Error('You Have Already Submitted Review For This Shop . Please Edit Instead');

    }

    // create db entry
    const shopReview = await shopReviewModel.create({ userId, shopId, rating, reviewText })
    
    // update the shop review
    const reviewStatus = netReview("shop", shopId)
    if (!reviewStatus) {
        res.status(400)
        throw new Error('Review Update Failed')
    }

    if (shopReview) {
        res.status(200).json(shopReview)
    }
    else {
        res.status(400)
        throw new Error('invalid review')
    }
    

})

const updateShopReviewById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const shopReview = req.body
    
    // update the current review in db
    await shopReviewModel.findByIdAndUpdate(id, shopReview)
    

    // validate the update
    const updatedShopReview = await shopReviewModel.findById(id)

    // update the beautician review
    const reviewStatus = netReview("shop", updatedShopReview.shopId)
    if (!reviewStatus) {
        res.status(400)
        throw new Error('Review Update Failed')
    }

    if (updatedShopReview) {
        res.status(200).json(updatedShopReview)
    }
    else {
        res.status(400)
        throw new Error('invalid review')

    }
    
})

const getMyShopreview = asyncHandler(async (req, res) => {
    const { userId, shopId } = req.body
    
    // existence of user
    const currentUser = await userModel.findById(userId)
    if (!currentUser) {
        res.status(404)
        throw new Error('User Does not exist')
    }

    // existence of shop
    const currentShop = await shopModel.findOne({ shopId })
    if (!currentShop) {
        res.status(404)
        throw new Error('Shop Does not exist')
    }

    // access the review

    const myReview = await shopReviewModel.findOne({ userId, shopId })
    
    if (myReview) {
        res.status(200).json(myReview)
    }
    else {
        res.status(404)
        throw new Error("No Review Found")
    }
    
})

/// Beautician Section

const getBeauticianReviews = asyncHandler(async (req, res) => {

    const { id } = req.params
    // access all reviews for given beautician id
    const reviews = await beauticianReviewModel.find({ beauticianId: id }).sort({ updatedAt: 'desc' })

    // existence of review
    if (reviews.length !== 0) {
        res.status(200).json(reviews)
    }
    else {
        res.status(404)
        throw new Error('No Reviews Found')
    }

 
})

const getShopReviews = asyncHandler(async (req, res) => {

    const { id } = req.params
    // access all reviews for given shop id
    const reviews = await shopReviewModel.find({ shopId: id }).sort({ updatedAt: 'desc' })

    // existence of review
    if (reviews.length !== 0) {
        res.status(200).json(reviews)
    }
    else {
        res.status(404)
        throw new Error('No Reviews Found')
    }


})



module.exports = {
    reviewHome,
    addBeauticianReview,
    updateBeauticianReviewById,
    addShopReview,
    updateShopReviewById,
    getMyShopreview,
    getMyBeauticianReview,
    getBeauticianReviews,
    getShopReviews
}

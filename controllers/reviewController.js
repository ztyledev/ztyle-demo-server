const asyncHandler = require('express-async-handler')

//Models

const reviewModel = require('../models/reviewModel')


const reviewHome = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "review routes: home page" })
})

const addReview = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "add review sucess"})
})

const updateReviewById = asyncHandler(async (req, res) => {
    res.status(200).json({message: "update review sucess"})
})

const getReviewById = asyncHandler(async (req, res) => {
    res.status(200).json({message: "get review by id sucess"})
})

const deleteReviewById = asyncHandler(async (req, res) => {
    res.status(200).json({message: "delete review by id sucess"})
})


module.exports = {
    reviewHome,
    addReview,
    updateReviewById,
    getReviewById,
    deleteReviewById
}

const express = require('express')
const router = express.Router()

// auth middleware jwt
const { protectUser } = require('../middleware/authMiddleware')

// controller
const {
    reviewHome,
    addReview,
    updateReviewById,
    getReviewById,
    deleteReviewById
} =require('../controllers/reviewController')

router.route('/').get(protectUser, reviewHome)
router.route('/reviews').post(protectUser,addReview)
router.route('/reviews/:id').patch(protectUser,updateReviewById)
router.route('/reviews/:id').get(protectUser,getReviewById)
router.route('/reviews/:id').delete(protectUser,deleteReviewById)

module.exports = router

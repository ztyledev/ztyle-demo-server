const express = require('express')
const router = express.Router()

// auth middleware jwt
const { protectUser,
    protectBeautician, 
    protectAdmin} = require('../middleware/authMiddleware')

// controller
const {
    reviewHome,
    addBeauticianReview,
    updateBeauticianReviewById,
    addShopReview,
    updateShopReviewById,
    getMyShopreview,
    getMyBeauticianReview,
    getBeauticianReviews,
    getShopReviews } = require('../controllers/reviewController')
    

router.route('/').get(protectUser, reviewHome)
/// user secion
// beautician reviews
router.route('/reviews/beautician/my-review').post(protectUser, getMyBeauticianReview)
router.route('/reviews/beautician/by-user/:id').get(protectUser, getBeauticianReviews)
router.route('/reviews/beautician').post(protectUser, addBeauticianReview)
router.route('/reviews/beautician/:id').patch(protectUser,updateBeauticianReviewById)

// shop reviews
router.route('/reviews/shop/my-review').post(protectUser, getMyShopreview)
router.route('/reviews/shop/by-user/:id').get(protectUser, getShopReviews)
router.route('/reviews/shop').post(protectUser, addShopReview)
router.route('/reviews/shop/:id').patch(protectUser, updateShopReviewById)

/// beautician section
router.route('/reviews/beautician/by-beautician/:id').get(protectBeautician, getBeauticianReviews)
router.route('/reviews/shop/by-beautician/:id').get(protectBeautician, getShopReviews)
/// admin section
router.route('/reviews/beautician/by-admin/:id').get(protectAdmin, getBeauticianReviews)
router.route('/reviews/shop/by-admin/:id').get(protectAdmin, getShopReviews)

module.exports = router

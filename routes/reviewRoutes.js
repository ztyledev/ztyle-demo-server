const express = require('express')
const router = express.Router()

// auth middleware jwt
const { protectUser,
    protectBeautician } = require('../middleware/authMiddleware')

// controller
const {
    reviewHome,
    addBeauticianReview,
    updateBeauticianReviewById,
    getBeauticianReviewById,
    deleteBeauticianReviewById,
    addShopReview,
    updateShopReviewById,
    deleteShopReviewById,
    getBeauticianReviews } = require('../controllers/reviewController')
    

router.route('/').get(protectUser, reviewHome)
/// user secion
// beautician reviews
router.route('/reviews/beautician').post(protectUser, addBeauticianReview)
router.route('/reviews/beautician/:id').patch(protectUser,updateBeauticianReviewById)
router.route('/reviews/beautician/:id').get(protectUser,getBeauticianReviewById)
router.route('/reviews/beautician/:id').delete(protectUser, deleteBeauticianReviewById)
// shop reviews
router.route('/reviews/shop').post(protectUser, addShopReview)
router.route('/reviews/shop/:id').patch(protectUser, updateShopReviewById)
// router.route('/reviews/shop/:id').get(protectBeautician,)
router.route('/reviews/shop/:id').delete(protectUser, deleteShopReviewById)
/// beautician section
router.route('/reviews/by-beautician/:id').get(protectBeautician, getBeauticianReviews)


module.exports = router

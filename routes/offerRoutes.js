const express = require('express')
const router = express.Router()

// auth middleware jwt
const {
    protectUser,
    protectAdmin,
    protectBeautician } = require('../middleware/authMiddleware')

// controllers
const {
    offerHome,
    getOffers,
    addOffer,
    getOfferById,
    updateOfferById,
    deleteOfferById,
    getOfferByOfferCode,
    getRedemptionByUserId } = require('../controllers/offerController')

router.route('/').get(protectAdmin, offerHome)
/// offer section
// admin routes
router.route('/offers').get(protectAdmin, getOffers)
router.route('/offers').post(protectAdmin, addOffer)
router.route('/offers/:id').get(protectAdmin, getOfferById)
router.route('/offers/:id').patch(protectAdmin, updateOfferById)
router.route('/offers/:id').delete(protectAdmin, deleteOfferById)
router.route('/offers/by-admin').post(protectAdmin, getOfferByOfferCode)
// user routes
router.route('/offers/by-user').post(protectUser, getOfferByOfferCode)
// beautician routes
router.route('/offers/by-beautician').post(protectBeautician, getOfferByOfferCode)

/// redemption section
// user routes
router.route('/redemptions/by-user/:id').get(protectUser, getRedemptionByUserId)


module.exports = router

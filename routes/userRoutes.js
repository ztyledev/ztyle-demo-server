const express = require('express')
const router = express.Router()

// jwt auth middleware
const { protectUser } = require('../middleware/authMiddleware')

// controllers

const {
    userHome,
    getShops,
    getShopById,
    getBeauticiansByShopId } = require('../controllers/userController')

router.route('/').get(protectUser, userHome)

// shop routes
router.route('/shops').get(protectUser, getShops)
router.route('/shops/:id').get(protectUser, getShopById)

// beautician routes
router.route('/beauticians/shop-id').post(protectUser, getBeauticiansByShopId)


module.exports = router

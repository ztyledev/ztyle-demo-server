const express = require('express')
const router = express.Router()

// jwt auth middleware
const { protectUser } = require('../middleware/authMiddleware')

// controllers

const {
    userHome,
    getShops,
    getShopById,
    getBeauticiansByShopId,
    getBeauticianById,
    getShopMenu } = require('../controllers/userController')

router.route('/').get(protectUser, userHome)

// shop routes
router.route('/shops').get(protectUser, getShops)
router.route('/shops/:id').get(protectUser, getShopById)
router.route('/menu/shops').post(protectUser, getShopMenu)


// beautician routes
router.route('/beauticians/shop-id').post(protectUser, getBeauticiansByShopId)
router.route('/beauticians/:id').get(protectUser, getBeauticianById)


module.exports = router

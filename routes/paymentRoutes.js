const express = require('express')
const router = express.Router()

// auth middleware jwt
const {protectUser} =require('../middleware/authMiddleware')

// controllers
const {
    PaymentHome,
    getServicePrice } = require('../controllers/paymentController')

router.route('/').all(protectUser, PaymentHome)
router.route('/service-price/:id').get(protectUser, getServicePrice)


module.exports = router
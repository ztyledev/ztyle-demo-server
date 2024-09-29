const express = require('express')
const router = express.Router()

// auth middleware jwt
const {
    protectUser,
    protectBeautician,
    protectAdmin } = require('../middleware/authMiddleware')

// controllers
const {
    PaymentHome,
    getServicePrice,
    addOrder,
    verifyOrder,
    getPaymentById,
    getPaymentByBookingId,
    getPaymentByByField } = require('../controllers/paymentController')

router.route('/').all(protectUser, PaymentHome)
// user access
router.route('/service-price/:id').get(protectUser, getServicePrice)
router.route('/orders').post( addOrder)
router.route('/verify').post(verifyOrder)
router.route('/user-payments/:id').get(protectUser, getPaymentById)
router.route('/user-payments/by-booking/:id').get(protectUser, getPaymentByBookingId)
router.route('/user-payments/by-field').post(protectUser, getPaymentByByField)
// beautician access
router.route('/beautician-payments/:id').get(protectBeautician, getPaymentById)
router.route('/beautician-payments/by-booking/:id').get(protectBeautician, getPaymentByBookingId)
router.route('/beautician-payments/by-field').post(protectBeautician, getPaymentByByField)
// admin access
router.route('/admin-payments/:id').get(protectAdmin, getPaymentById)
router.route('/admin-payments/by-booking/:id').get(protectAdmin, getPaymentByBookingId)
router.route('/admin-payments/by-field').post(protectAdmin, getPaymentByByField)



module.exports = router
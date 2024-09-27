const express = require('express')
const router = express.Router()

// auth middleware jwt
const {
    protectUser,
    protectBeautician,
    protectAdmin } = require('../middleware/authMiddleware')

// controllers
const {
    bookingHome,
    getBookingsByUser,
    addBookingByUser,
    getBookingById,
    cancelBookingByUserById,
    getBookingsByBeautician,
    updateBookingByBeauticianById,
    getBookingsByAdmin,
    getBookingByAdminByField,
    deletebookingByAdminById, } = require('../controllers/bookingController')

router.route('/').get(protectUser, bookingHome)
// associated with user
router.route('/user-bookings/my-bookings').post(protectUser,getBookingsByUser)
router.route('/user-bookings').post(protectUser, addBookingByUser)
router.route('/user-bookings/:id').get(protectUser, getBookingById)
router.route('/user-bookings/:id').patch(protectUser,cancelBookingByUserById)
// associated with beautician
router.route('/beautician-bookings/my-bookings').post(protectBeautician,getBookingsByBeautician)
router.route('/beautician-bookings/:id').get(protectBeautician,getBookingById)
router.route('/beautician-bookings/:id').patch(protectBeautician, updateBookingByBeauticianById)
// associated with admin
router.route('/admin-bookings').get(protectAdmin, getBookingsByAdmin)
router.route('/admin-bookings/field').post(protectAdmin, getBookingByAdminByField)
router.route('/admin-bookings/:id').get(protectAdmin, getBookingById)
router.route('/admin-bookings/:id').delete(protectAdmin, deletebookingByAdminById)


module.exports = router

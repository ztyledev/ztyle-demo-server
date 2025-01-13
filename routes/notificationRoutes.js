const express = require('express')
const router = express.Router()

// jwt authenticators
const {
    protectUser,
    protectBeautician
} = require('../middleware/authMiddleware')


// controllers
const {
    notificationHome,
    addNotification,
    getNotifications,
    readNotification } = require('../controllers/notificationController')

router.route('/').get(protectUser, notificationHome)
router.route('/user-notifications').post(protectUser, addNotification)
router.route('/user-notifications/:id').get(protectUser, getNotifications)
router.route('/beautician-notifications').post(protectBeautician, addNotification)
router.route('/beautician-notifications/:id').get(protectBeautician, getNotifications)
router.route('/user-read-notifications/:id').get(protectUser, readNotification)
router.route('/beautician-read-notifications/:id').get(protectBeautician, readNotification)


module.exports=router
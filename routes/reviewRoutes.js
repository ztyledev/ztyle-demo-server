const express = require('express')
const router = express.Router()

// auth middleware jwt
const { protectUser } = require('../middleware/authMiddleware')

// controller
const {reviewHome} =require('../controllers/reviewController')

router.route('/').get(protectUser, reviewHome)

module.exports = router

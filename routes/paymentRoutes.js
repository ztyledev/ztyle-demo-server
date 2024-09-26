const express = require('express')
const router = express.Router()

const {PaymentHome} = require ('../controllers/paymentController')

router.get('/',PaymentHome)

module.exports = router
const asyncHandler = require('express-async-handler')

//models
const paymentModel = require('../models/paymentModel')

const PaymentHome = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "payment routes : home page" })
})

const getServicePrice = asyncHandler(async (req, res) => {
    const {id} = req.params

    res.json({ message: "service payment : success" })
})


module.exports = {
    PaymentHome,
    getServicePrice
}
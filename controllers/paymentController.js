const asyncHandler = require('express-async-handler')

//models


const PaymentHome = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "payment routes : home page" })
})

const getServicePrice = asyncHandler(async (req, res) => {
    res.json({ message: "service payment : success" })
})

module.exports = {
    PaymentHome,
    getServicePrice
}
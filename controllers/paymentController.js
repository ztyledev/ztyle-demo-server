const asyncHandler = require('express-async-handler')


const PaymentHome = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "payment routes : home page" })
})


module.exports = {
    PaymentHome
}
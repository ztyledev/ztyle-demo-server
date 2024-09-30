const asyncHandler = require('express-async-handler')


const reviewHome = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "review routes: home page" })
})

module.exports = {
    reviewHome
}

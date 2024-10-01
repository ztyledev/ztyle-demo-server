// models
const beauticianReviewModel =require('../models/beauticianReviewModel') 
const beauticianProfileModel = require('../models/beauticianProfileModel')
const shopReviewModel = require('../models/shopReviewModel')
const shopModel = require('../models/shopModel')

const netReview = async( reviewType,Id ) => {
    
    let allRatings
    if (reviewType === "beautician") {
        allRatings = await beauticianReviewModel.find({ beauticianId: Id })
    }
    else if (reviewType === "shop") {
        allRatings = await shopReviewModel.find({ shopId: Id })
    }
    const sumRating = allRatings.reduce((n, { rating }) => n + rating, 0)
    
    const netRating = sumRating / allRatings.length
    
    if (reviewType === "beautician") {
        await beauticianProfileModel.findByIdAndUpdate(Id, { clientRating: netRating })
        const reviewUpdatedBeautician = await beauticianProfileModel.findById(Id)
        if (reviewUpdatedBeautician) {
            return true
        }
        else {
            return false
        }
        
    }
    else if (reviewType === "shop") {
        const currentShop = await shopModel.findOne({ shopId: Id })
        
        await shopModel.findByIdAndUpdate(currentShop._id, { clientRating: netRating })
        const reviewUpdatedShop = await shopModel.findById(currentShop._id)
        if (reviewUpdatedShop) {
            return true
        }
        else {
            return false
        }
    }
    
}


module.exports = netReview
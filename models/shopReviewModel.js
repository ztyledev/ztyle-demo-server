const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shopReviewSchema = new Schema ({

    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'user'
    },

    shopId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required:true
    },
    reviewText: String

},
{
    timestamps: true
}

)

const shopReviewModel = new mongoose.model('shopReview', shopReviewSchema)
module.exports = shopReviewModel
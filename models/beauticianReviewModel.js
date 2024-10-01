const mongoose = require('mongoose')
const Schema = mongoose.Schema

const beauticianReviewSchema = new Schema ({

    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'user'
    },

    beauticianId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'beauticianProfile'
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

const beauticianReviewModel = new mongoose.model('beauticianReview', beauticianReviewSchema)
module.exports = beauticianReviewModel





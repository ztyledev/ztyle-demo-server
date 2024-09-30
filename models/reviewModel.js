const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema ({

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

const reviewModel = new mongoose.model('review', reviewSchema)
module.exports = reviewModel





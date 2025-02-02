const mongoose = require('mongoose')
const Schema = mongoose.Schema

const offerSchema = new Schema(
    {
        offerName: {
            type: String,
            required:true
        },
        offerCode: {
            type: String,
            required: true,
            unique:true
        },
        offerDescription: String,
        startDate: {
            type: Date,
            required: true,
            default:Date.now
        },
        endDate: {
            type: Date,
            required:true
        },
        discountPercentage: {
            type: Number,
            required:true
        },
        status: {
            type: String,
             enum: ['active', 'inactive'],
             default: 'active'
        }

    }
)

const offerModel = new mongoose.model('offer', offerSchema)
module.exports = offerModel

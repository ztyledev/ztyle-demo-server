const mongoose = require('mongoose')
const Schema = mongoose.Schema

const offerRedemptionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'user'
    },
    offerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'offer'
    },
    redemptionDate: {
        type: Date,
        default:Date.now
    },
    status: {
        type: String,
        enum: ['used', 'unused'],
        default:'unused'
    }

})

const offerRedemptionModel = new mongoose.model('offerredemption', offerRedemptionSchema)
module.exports = offerRedemptionModel

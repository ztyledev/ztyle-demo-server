const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const paymentSchema = new Schema (
    {
        paymentId: {
            type: String,
            required: true,
        },

        orderId: {
            type: String,
            required: true,
        },

        bookingId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref:'booking'
        },

        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref:'user'
        },

        amount: Number,

        currency: String,

        paymentMethod: String,

        status: {
            type: String,
        enum: ['pending', 'success', 'fail'],
        default: 'pending'
    }


    },
    {
        timestamps: true
    }
)

const paymentModel = new mongoose.model('payment', paymentSchema)
module.exports = paymentModel


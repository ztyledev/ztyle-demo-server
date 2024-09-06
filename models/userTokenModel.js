const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userTokenSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    token: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires:600
    }

})

const userTokenModel = new mongoose.model('userResetToken', userTokenSchema)

module.exports = userTokenModel

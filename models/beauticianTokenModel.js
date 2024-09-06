const mongoose = require('mongoose')
const Schema = mongoose.Schema

const beauticianTokenSchema = new Schema({

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

const beauticianTokenModel = new mongoose.model('beauticianResetToken', beauticianTokenSchema)

module.exports = beauticianTokenModel

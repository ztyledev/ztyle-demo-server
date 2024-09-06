const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminTokenSchema = new Schema({

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

const adminTokenModel = new mongoose.model('adminResetToken', adminTokenSchema)

module.exports = adminTokenModel
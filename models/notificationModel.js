const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema(
    {
        senderName: {
            type: String,
            required:true
        },
        senderId: {
            type: Schema.Types.ObjectId,
            required:true
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            required:true
        },
        message: {
            type: String,
            required:true
        },
        status: {
            type: Boolean,
            default:false
        }
    },
    {
        timestamps:true
    }

)

const notificationModel = new mongoose.model('notification', notificationSchema)
module.exports = notificationModel

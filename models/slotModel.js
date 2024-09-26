const mongoose = require('mongoose')
const Schema = mongoose.Schema

const slotSchema = new Schema({

    beauticianId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'beauticianProfile'
    },
    date: {
        type: Date,
        required:true
    },
    slots:[{
        start: String,
        end: String,
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'canceled'],
            default: 'pending'
        }
    }]

})

const slotModel = new mongoose.model('slot', slotSchema)

module.exports = slotModel

const mongoose = require('mongoose')

const beauticianProfileSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },
    shopId:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum:['male','female']
    },
    dob: {
        type: Date,
        required:true
    },
    position: String,
    specialty: String,
    yearsOfExperience: Number,
    employmentStatus: String,
    clientRating: Number,
    performanceMetrics: Number,
    achievements:[{
        type:String
    }],
    availableSlots:[{
        start: String,
        end:String
    }],
    holidaySchedule:[{
        type:String
    }],
    profilePic: String,
    languagesSpoken:[{
        type:String
    }],
    notes: String,
    status: {
        type: String,
        required: true,
        enum: ['pending', 'active', 'rejected'],
        default: 'pending'
    },
    profileCompletion: {
        type: String,
        default:"0"
    },
    advanceProfileStatus: {
        type: Boolean,
        default:false
    }

})

const beauticianProfileModel = new mongoose.model('beauticianProfile', beauticianProfileSchema)

module.exports = beauticianProfileModel

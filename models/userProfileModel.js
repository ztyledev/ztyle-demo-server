const mongoose = require('mongoose')

const userProfileSchema = new mongoose.Schema(
    
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        dob: {
            type:Date
        },
        address: {
            type:String
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'others']
        }

    },
    {
        timestamps: true        
    }
)

const userProfileModel = new mongoose.model('userProfile', userProfileSchema)

module.exports = userProfileModel

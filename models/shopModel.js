const mongoose = require('mongoose')

// shop schema

const shopSchema = new mongoose.Schema(
    
    {
        shopName: {
            type: String,
            required: true
        },
        shopId: {
            type: String,
            required: true,
            unique: true
        },
        ownerFullName: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        location: {
            type:String
        },
        address: String,
        district:String,
        state: String,
        accountId: {
            type:String
        },
        workingDays: [{
            type: String
        }],
        openingTime:{
            type: String
        },
        closingTime:{
            type: String
        },
        category: {
            type: String
        },
        menu: {
            type: Array,
            default:[]
        },
        shopImage: String,
        image1: String,
        image2: String,
        shopCertificate: String,
        clientRating: Number,
        status: {
            type: String,
            enum: ['pending', 'active', 'rejected'],
            default: 'pending'
        },
        profileCompletion: {
            type: String,
            default: "0"
        },
        advanceProfileStatus: {
            type: Boolean,
            default: false
        }
        
    },
    {
        timestamps: true 
    }
    
)

const shopModel = new mongoose.model('shop', shopSchema)

module.exports = shopModel

const mongoose = require('mongoose')

// shop schema

const shopSchema = new mongoose.Schema(
    
    {
        shopName: {
            type: String,
            required: true
        },
        shopId: {
            type:String
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
        accountId: {
            type:String
        },
        workingDays: [{
            type: String
        }],
        OpeningTime:[{
            type: String
        }],
        ClosingTime:[{
            type: String
        }],
        category: {
            type: String
        },
        menu: {
            type: Array,
            default:[]
        },
        shopImage: String,
        shopCertificate: String,
        status: {
            type: String,
            enum: ['pending', 'active', 'rejected'],
            default: 'pending'
        }
        
    },
    {
        timestamps: true 
    }
    
)

const shopModel = new mongoose.model('shop', shopSchema)

module.exports = shopModel

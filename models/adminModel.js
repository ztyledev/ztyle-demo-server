const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// admin db schema

const adminSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required:true
        },
        mobile: {
            type: String,
            required:true
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required:true
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'active', 'rejected'],
            default:'pending'
        }
    },
    {
        timestamps: true
    }

)

// hash admin's password with salt before saving document to db

adminSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// enable matching password for admin login entry

adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const adminModel = new mongoose.model('admin', adminSchema)

module.exports = adminModel

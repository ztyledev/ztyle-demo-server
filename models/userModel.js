const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// user db schema
const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required:true
        }
    },
    {
        timestamps: true
    }
)

// hash user's password with salt before saving document to db

userSchema.pre('save', async function () {
    
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})

// enable matching password for user login entry

userSchema.methods.matchPassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password)

}

const userModel = new mongoose.model('user', userSchema)

module.exports = userModel

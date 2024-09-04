const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// beautician schema

const beauticianSchema = new mongoose.Schema(
    
    {
        fullName: {
            type: String,
            required: true,
        },
        shopId: {
            type: String,
            required: true,
        },
        mobile: {
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

// hash beautician's password with salt before saving document to db

beauticianSchema.pre('save', async function () {
    
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})

// enable matching password for beautician login entry

beauticianSchema.methods.matchPassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password)

}

const beauticianModel = new mongoose.model('beautician', beauticianSchema)

module.exports = beauticianModel

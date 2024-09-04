const asyncHandler = require('express-async-handler')


//models
const userModel = require('../models/userModel')
const adminModel = require('../models/adminModel')
const shopModel = require('../models/shopModel')
const beauticianModel = require('../models/beauticianModel')


// utils
const generateToken = require('../utils/generateToken')

const authHome = asyncHandler(async (req, res) => {

    res.status(200).json({ message: 'auth routes: home page' })
})

/// User Section

const registerUser = asyncHandler(async (req, res) => {
    
    const { fullName, email, password } = req.body
    
    // check whether the user already exists in database

    const existingUser = await userModel.findOne({ email })
    
    if (existingUser) {
        res.status(409);
        throw new Error('user already exists');
    }

    // create the new user
    const user = await userModel.create({ fullName, email, password })
    
    if (user) {
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email:user.email
        })

    }
    else {
        res.status(400)
        throw new Error('invalid user')
    }

})

const loginUser = asyncHandler(async (req, res) => {
    
    const { email, password } = req.body
    
    // access the user based on given credentials
    const user = await userModel.findOne({ email })

    // authenticate the user
    if (user && await user.matchPassword(password)) {
        
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: email,
            token: generateToken(user._id)
        })

        
    }
    else {
        res.status(400)
        throw new Error('Invalid email or password')

    }


})

/// Admin Section

const registerAdmin = asyncHandler(async (req, res) => {
    const { fullName, designation, mobile, email, password } = req.body
    
    // check whether the admin user already exists in database

    const existingAdmin = await adminModel.findOne({ email })
    
    if (existingAdmin) {
        res.status(409);
        throw new Error('admin user already exists');
        
    }
    // create the new admin user
    const admin = await adminModel.create({
        fullName,
        designation,
        mobile,
        email,
        password
    })

    
    if (admin) {
        res.status(200).json({
            _id: admin._id,
            fullName: admin.fullName,
            designation: admin.designation,
            mobile:admin.mobile,
            email:admin.email
        })

    }
    else {
        res.status(400)
        throw new Error('invalid admin user')
    }


})

const loginAdmin = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    
    // access the admin based on given credentials

    const admin = await adminModel.findOne({ email })

     // authenticate the admin
    if (admin && await admin.matchPassword(password)) {
        
        if (admin.status === 'pending') {
            res.status(401)
            throw new Error('Your activation is pending .. Please wait')
        }
        else if (admin.status === 'rejected') {
            res.status(401)
            throw new Error('Your activation for admin account is rejected')
        }
        else if (admin.status === 'active') {
            res.status(200).json({
                _id: admin._id,
                fullName: admin.fullName,
                designation: admin.designation,
                mobile:admin.mobile,
                email: email,
                token: generateToken(admin._id)
        })
            
        }

        
    }
    else {
        res.status(400)
        throw new Error('Invalid email or password')

    }

    
})

// Beautician Section

const registerBeautician = asyncHandler(async (req, res) => {

    const { fullName, shopId, mobile, email, password } = req.body
    
    // check for the existance of shop based on shop id

    const shop = await shopModel.findOne({ shopId });


    // check whether the beautician user already exists in database

    if (shop) {
        const existingBeautician = await beauticianModel.findOne({ email })
        
        if (existingBeautician) {
            res.status(409);
            throw new Error('beautician user already exists');
            
        }

        // create the new beautician user
        const beautician = await beauticianModel.create({
            fullName,
            shopId,
            mobile,
            email,
            password
        })

    
        if (beautician) {
            res.status(200).json({
                _id: beautician._id,
                fullName: beautician.fullName,
                shopId: beautician.designation,
                mobile: beautician.mobile,
                email: beautician.email
            })
        }
        else {
            res.status(400)
            throw new Error('invalid beautician user')
        }

    }
    else {
        res.status(404)
        throw new Error('Shop Id Does Not Exists')

    }
    

})

const loginBeautician = asyncHandler(async (req, res) => {
    
    const { email, password } = req.body
    
    // access the beautician user based on given credentials
    const beautician = await beauticianModel.findOne({ email })
    
    // authenticate the beautician user
    if (beautician && await beautician.matchPassword(password)) {
        
        res.status(200).json({
            _id: beautician._id,
            fullName: beautician.fullName,
            shopId: beautician.shopId,
            mobile:beautician.mobile,
            email: email,
            token: generateToken(beautician._id)
        })

        
    }
    else {
        res.status(400)
        throw new Error('Invalid email or password')

    }


})

module.exports = {
    authHome,
    registerUser,
    loginUser,
    registerAdmin,
    loginAdmin,
    registerBeautician,
    loginBeautician

}

const asyncHandler = require('express-async-handler')


//models
const userProfileModel = require('../models/userProfileModel')
const userModel = require('../models/userModel')

const userProfileHome = asyncHandler(async (req, res) => {
    
    res.status(200).json({ message: "User Profile Routes: Home Page" })

})


const getUserProfiles = asyncHandler(async (req, res) => {
    
    const userProfiles = await userProfileModel.find()
    
    // check there exist any profiles or not

    if (userProfiles.length !== 0) {
        res.status(200).json(userProfiles)
    }
    else {
        res.status(404)
        throw new Error('No User Profiles Found')
        
    }


})

const addUserProfile = asyncHandler(async (req, res) => {
    
    const newUserProfile = req.body
    const { email } = newUserProfile

    // check for the existence of user 
    const user = await userModel.findOne({ email })
    if (user) {

         // check whether the profile is already existing in db

        const existingUserProfile = await userProfileModel.findOne({ email })
        
        if (existingUserProfile) {
            
            res.status(409)
            throw new Error("Profile already Exist for User")

        }

        // create new user profile in db

        const userProfile = await userProfileModel.create(newUserProfile)

        if (userProfile) {
            res.status(200).json(userProfile)
        }
        else {
            res.status(400)
            throw new Error('Invalid User Profile')
        }
        
    }
    else {
        res.status(404)
        throw new Error('Please Create A User Account.')
        
    }

   
    
})

const getUserProfile = asyncHandler(async (req, res) => {
    
    const { email } = req.body
    
    // find the user profile from db
    const myUserProfile = await userProfileModel.findOne({ email })
    
     // check specified user profile exists or not
    if (myUserProfile) {
        res.status(200).json(myUserProfile)
    }
    else {
        res.status(404)
        throw new Error('Profile Does not Exist')
    }
    
})

const getUserProfileById = asyncHandler(async (req, res) => {
    
    const { id } = req.params
    
    // access the profile with specified profile id

    const userProfile = await userProfileModel.findById(id)
    
    if (userProfile) {
        res.status(200).json(userProfile)
    }
    else {
        res.status(404)
        throw new Error('Profile Does not Exist')
    }

    
})

const updateUserProfileById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const userProfile = req.body
    
     // update the current user profile from req.body
    
    await userProfileModel.findByIdAndUpdate(id, userProfile)
    
    // access the updated user profile
    
    const updatedUserProfile = await userProfileModel.findById(id)

    // check the updation status and return the same

    if (updatedUserProfile) {
        res.status(200).json(updatedUserProfile)

    }
    else {
        res.status(404)
        throw new Error('Profile Does Not Exists')
    }

    
})

const deleteUserProfileById = asyncHandler(async (req, res) => {
    
    const { id } = req.params
    
    // delete the current user profile

    await userProfileModel.findByIdAndDelete(id)

     // check the deleted profile exists or not
    const deletedUserProfile = await userProfileModel.findById(id)

    if (!deletedUserProfile) {
        res.status(200).json({ _id: id })

    }
    else {
        res.status(400)
        throw new Error('Delete Failed')
    }
})


module.exports = {
    userProfileHome,
    getUserProfiles,
    addUserProfile,
    getUserProfile,
    getUserProfileById,
    updateUserProfileById,
    deleteUserProfileById
}

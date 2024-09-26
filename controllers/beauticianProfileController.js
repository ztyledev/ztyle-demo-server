const path = require('path')
const fs = require('fs')
const asyncHandler = require('express-async-handler')

// models
const beauticianProfileModel = require('../models/beauticianProfileModel')
const beauticianModel = require('../models/beauticianModel')


// configs
const { baseUrl } = require('../config/Constants')

// utils
const existFile = require('../utils/existFile')


const beauticianProfileHome = asyncHandler(async (req, res) => {
    res.json({ message: "beautician routes: home" })
})

const getBeauticianProfiles = asyncHandler(async (req, res) => {
    
    const beauticianProfiles = await beauticianProfileModel.find()
     
    // check there exist any profiles or not

    if (beauticianProfiles.length !== 0) {
        res.status(200).json(beauticianProfiles)
    }
    else {
        res.status(404)
        throw new Error('No Beautician Profiles Found')
    }


})

const addBeauticianProfile = asyncHandler(async (req, res) => {

    const newBeauticianProfile = req.body
    
    const { email } = newBeauticianProfile

    // check for the existence of user
    const beautician = await beauticianModel.findOne({ email })
    
    if (beautician) {
        
        // check whether the profile is already existing in db

        const existingBeauticianProfile = await beauticianProfileModel.findOne({ email })
        
        if (existingBeauticianProfile) {
            res.status(409)
            throw new Error("Profile already Exist for Beautician")
        }

        // create new beautician profile in db
        
        const beauticianProfile = await beauticianProfileModel.create(newBeauticianProfile)

        if (beauticianProfile) {
            res.status(200).json(beauticianProfile)
        }
        else {
            res.status(400)
            throw new Error('Invalid Beautician Profile')
        }
    }
    else {
        res.status(404)
        throw new Error('Please Create A Beautician Account.')
    }
    
})

const getBeauticianProfile = asyncHandler(async (req, res) => {
    
    const { email } = req.body
    
    // find the user profile from db
    const myBeauticianProfile = await beauticianProfileModel.findOne({ email })
    
     // check specified beautician profile exists or not
    if (myBeauticianProfile) {
        
        // check for the existance of profilePic in storage
        const currentProfilePic = myBeauticianProfile.profilePic
        const { id } = myBeauticianProfile
        
        if (currentProfilePic) {
            
            const currentProfilePicName = currentProfilePic.match(/\/([^\/?#]+)[^\/]*$/)
            const currentProfilePicPath = path.resolve(__dirname, '../storage/images', currentProfilePicName[1])
            
            // findout the status of the file existence

            const existStatus = existFile(currentProfilePicPath)

            if (!existStatus) {
                myBeauticianProfile.profilePic = ""
                await beauticianProfileModel.findByIdAndUpdate(id, myBeauticianProfile)
            }

        }
        

        
    }


    // find the beautician profile agaian
    
    const currentBeauticianProfile = await beauticianProfileModel.findOne({ email })
    
    // check specified beautician profile exists or not

    if (currentBeauticianProfile) {
        res.status(200).json(currentBeauticianProfile)
    }
    else {
        res.status(404)
        throw new Error('Profile Does not Exist')
    }
    
})


const getBeauticianProfileById = asyncHandler(async (req, res) => {
    
    const { id } = req.params
    
    // access the profile with specified profile id

    const beauticianProfile = await beauticianProfileModel.findById(id)
    
    if (beauticianProfile) {
         // check for the existance of profilePic in storage
        const currentProfilePic = beauticianProfile.profilePic
        const { id } = beauticianProfile
        
        if (currentProfilePic) {
            
            const currentProfilePicName = currentProfilePic.match(/\/([^\/?#]+)[^\/]*$/)
            const currentProfilePicPath = path.resolve(__dirname, '../storage/images', currentProfilePicName[1])
            
            // findout the status of the file existence

            const existStatus = existFile(currentProfilePicPath)

            if (!existStatus) {
                beauticianProfile.profilePic = ""
                await beauticianProfileModel.findByIdAndUpdate(id, beauticianProfile)
            }

        }
        
    }

    // find the beautician profile agaian
    
    const currentBeauticianProfile = await beauticianProfileModel.findById(id)
    
    // check specified beautician profile exists or not

    if (currentBeauticianProfile) {
        res.status(200).json(currentBeauticianProfile)
    }
    else {
        res.status(404)
        throw new Error('Profile Does not Exist')
    }
        
    
})

const updateBeauticianProfileById = asyncHandler(async (req, res) => {
    const { id } = req.params
   
    const beauticianProfile = req.body
    

     // update the current user profile from req.body
    
    await beauticianProfileModel.findByIdAndUpdate(id, beauticianProfile)
    
    // access the updated user profile
    
    const updatedBeauticianProfile = await beauticianProfileModel.findById(id)

    // check the updation status and return the same

    if (updatedBeauticianProfile) {
        res.status(200).json(updatedBeauticianProfile)

    }
    else {
        res.status(404)
        throw new Error('Profile Does Not Exists')
    }

    
})

const deleteBeauticianProfileById = asyncHandler(async (req, res) => {
    
    const { id } = req.params

    // remove existsing profile pic
    const currentProfile = await beauticianProfileModel.findById(id)
    const currentProfilePic = currentProfile.profilePic
    
    if (currentProfilePic) {
        
        const currentProfilePicName = currentProfilePic.match(/\/([^\/?#]+)[^\/]*$/)
        const currentProfilePicPath = path.resolve(__dirname, '../storage/images', currentProfilePicName[1])
        fs.unlinkSync(currentProfilePicPath)
    }
    
    // delete the current user profile

    await beauticianProfileModel.findByIdAndDelete(id)

     // check the deleted profile exists or not
    const deletedBeauticianProfile = await beauticianProfileModel.findById(id)

    if (!deletedBeauticianProfile) {
        res.status(200).json({ _id: id })

    }
    else {
        res.status(400)
        throw new Error('Delete Failed')
    }
})

const updateProfilePicById = asyncHandler(async (req, res) => {

    const { id } = req.params
    
    // declare an empty profile object and image url
    const profile = {}
    var imgUrl = ''
    
    // assign image url
    if (req.file) {
        imgUrl = `${baseUrl}/storage/images/${req.file.filename}`
    }
    
    profile.profilePic = imgUrl
   
    //to check whether profilePic exists for this profile

    const currentProfile = await beauticianProfileModel.findById(id)
    const currentProfilePic = currentProfile.profilePic
    
    if (currentProfilePic) {
        
        const currentProfilePicName = currentProfilePic.match(/\/([^\/?#]+)[^\/]*$/)
        const currentProfilePicPath = path.resolve(__dirname, '../storage/images', currentProfilePicName[1])
        fs.unlinkSync(currentProfilePicPath)
    }

    // update profile to include image url

    await beauticianProfileModel.findByIdAndUpdate(id, profile)
    
    // verify update

    const updatedProfile = await beauticianProfileModel.findById(id)
    if (updatedProfile) {
        res.status(200).json(updatedProfile)
    }
    else {
        res.status(404)
        throw new Error('Profile Does not Exist')
    }
    
})

const deleteProfilePicById = asyncHandler(async (req, res) => {

    const { id } = req.params
    
    // remove existsing profile pic
    const currentProfile = await beauticianProfileModel.findById(id)
    const currentProfilePic = currentProfile.profilePic
    
    if (currentProfilePic) {
        
        const currentProfilePicName = currentProfilePic.match(/\/([^\/?#]+)[^\/]*$/)
        const currentProfilePicPath = path.resolve(__dirname, '../storage/images', currentProfilePicName[1])
        fs.unlinkSync(currentProfilePicPath)
    }

    // database entry is removed
    currentProfile.profilePic = null
    await beauticianProfileModel.findByIdAndUpdate(id, currentProfile)
    
    // validate delete
    const picDeletedProfile = await beauticianProfileModel.findById(id)

    if (!picDeletedProfile.profilePic) {
        
        res.status(200).json(picDeletedProfile)

    }
    else {
        res.status(400)
        throw new Error('Delete profile pic failed')
    }

    
})

module.exports = {
    beauticianProfileHome,
    getBeauticianProfiles,
    addBeauticianProfile,
    getBeauticianProfile,
    getBeauticianProfileById,
    updateBeauticianProfileById,
    deleteBeauticianProfileById,
    updateProfilePicById,
    deleteProfilePicById
}

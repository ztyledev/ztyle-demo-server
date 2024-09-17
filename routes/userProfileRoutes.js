const express = require('express')
const router = express.Router()

// auth middleware jwt
const {protectUser } = require('../middleware/authMiddleware')


//controllers

const {
    userProfileHome,
    getUserProfiles,
    addUserProfile,
    getUserProfile,
    getUserProfileById,
    updateUserProfileById,
    deleteUserProfileById

} =require('../controllers/userProfileController')


router.route('/').get(protectUser, userProfileHome)
router.route('/user-profiles').get(protectUser, getUserProfiles)
router.route('/user-profiles').post(protectUser, addUserProfile)
router.route('/user-profiles/my-profile').post(protectUser, getUserProfile)
router.route('/user-profiles/:id').get(protectUser, getUserProfileById)
router.route('/user-profiles/:id').patch(protectUser, updateUserProfileById)
router.route('/user-profiles/:id').delete(protectUser, deleteUserProfileById)



module.exports =router
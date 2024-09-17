const express = require('express')
const router = express.Router()


// auth middleware jwt
const { protectBeautician } = require('../middleware/authMiddleware')

// utils
const { profilePicUpload } = require('../utils/fileUpload')


// controllers 
const {
    beauticianProfileHome,
    getBeauticianProfiles,
    addBeauticianProfile,
    getBeauticianProfile,
    getBeauticianProfileById,
    updateBeauticianProfileById,
    deleteBeauticianProfileById,
    updateProfilePicById,
    deleteProfilePicById
} = require('../controllers/beauticianProfileController')

// home
router.route('/').get(protectBeautician, beauticianProfileHome)
//basic profile routes
router.route('/beautician-profiles').get(protectBeautician, getBeauticianProfiles)
router.route('/beautician-profiles').post(protectBeautician, addBeauticianProfile)
router.route('/beautician-profiles/my-profile').post(protectBeautician, getBeauticianProfile)
router.route('/beautician-profiles/:id').get(protectBeautician, getBeauticianProfileById)
router.route('/beautician-profiles/:id').patch(protectBeautician, updateBeauticianProfileById)
router.route('/beautician-profiles/:id').delete(protectBeautician, deleteBeauticianProfileById)
// routes related to files/images
router.route('/beautician-profiles/profile-pic/:id').patch(protectBeautician, profilePicUpload('./storage/images'), updateProfilePicById)
router.route('/beautician-profiles/profile-pic/:id').delete(protectBeautician, deleteProfilePicById)


module.exports = router

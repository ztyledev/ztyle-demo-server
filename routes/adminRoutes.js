const express = require('express')
const router = express.Router()

// auth middleware jwt

const { protectAdmin } = require('../middleware/authMiddleware')

// utils

const {
    shopImageUpload,
    image1Upload,
    image2Upload,
    shopCertificateUpload } = require('../utils/fileUpload')


//controllers

const {
    adminHome,
    getShops,
    addShop,
    getShop,
    getShopById,
    updateShopById,
    deleteShopById,
    getShopsByState,
    getShopsByDistrict,
    getPendingShopsState,
    getPendingShopsDistrict,
    updateShopImageById,
    deleteShopImageById,
    updateImage1ById,
    deleteImage1ById,
    updateImage2ById,
    deleteImage2ById, 
    updateshopCertificateById,
    deleteShopCirtificateById,
    activateAdmin,
    deactivateAdmin,
    rejectAdmin,
    deleteAdmin,
    getAdmins,
    getAdminById,
    getPendingAdmins,
    getBeauticiansByShopId,
    getBeauticianById,
    editBeauticianById,
    deleteBeauticianById
} = require('../controllers/adminController')
    
// shop related routes
router.route('/').get(protectAdmin, adminHome)
router.route('/shops').get(protectAdmin, getShops)
router.route('/shops').post(protectAdmin, addShop)
router.route('/shops/my-shop').post(protectAdmin, getShop)
router.route('/shops/:id').get(protectAdmin, getShopById)
router.route('/shops/:id').patch(protectAdmin, updateShopById)
router.route('/shops/:id').delete(protectAdmin, deleteShopById)
router.route('/shops/by-state').post(protectAdmin, getShopsByState)
router.route('/shops/by-district').post(protectAdmin, getShopsByDistrict)
router.route('/shops/pending/by-state').post(protectAdmin, getPendingShopsState)
router.route('/shops/pending/by-district').post(protectAdmin, getPendingShopsDistrict)

// file related routes
router.route('/shops/shop-image/:id').patch(protectAdmin, shopImageUpload('./storage/images'), updateShopImageById)
router.route('/shops/shop-image/:id').delete(protectAdmin, deleteShopImageById)
router.route('/shops/image1/:id').patch(protectAdmin, image1Upload('./storage/images'), updateImage1ById)
router.route('/shops/image1/:id').delete(protectAdmin, deleteImage1ById)
router.route('/shops/image2/:id').patch(protectAdmin, image2Upload('./storage/images'), updateImage2ById)
router.route('/shops/image2/:id').delete(protectAdmin, deleteImage2ById)
router.route('/shops/certificate/:id').patch(protectAdmin, shopCertificateUpload('./storage/certificates'), updateshopCertificateById)
router.route('/shops/certificate/:id').delete(protectAdmin, deleteShopCirtificateById)


//admin related routes
router.route('/admins/activate/:id').patch(protectAdmin, activateAdmin)
router.route('/admins/deactivate/:id').patch(protectAdmin, deactivateAdmin)
router.route('/admins/reject/:id').patch(protectAdmin, rejectAdmin)
router.route('/admins/delete/:id').patch(protectAdmin, deleteAdmin)
router.route('/admins').get(protectAdmin, getAdmins)
router.route('/admins/:id').get(protectAdmin, getAdminById)
router.route('/pending/admins').get(protectAdmin, getPendingAdmins)

// beautician related routes
router.route('/beauticians/shop-id').post(protectAdmin, getBeauticiansByShopId)
router.route('/beauticians/:id').get(protectAdmin, getBeauticianById)
router.route('/beauticians/:id').patch(protectAdmin, editBeauticianById)
router.route('/beauticians/:id').delete(protectAdmin, deleteBeauticianById)

module.exports = router

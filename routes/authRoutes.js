const express = require('express')
const router = express.Router()

// middlewares
const { protectUser, protectAdmin, protectBeautician } = require('../middleware/authMiddleware')

// controllers
const {
    authHome,
    registerUser,
    loginUser,
    deactivateUserAccount,
    requestResetPasswordUser,
    resetPasswordUser,
    registerAdmin,
    loginAdmin,
    requestResetPasswordAdmin,
    resetPasswordAdmin,
    deactivateAdminAccount,
    registerBeautician,
    loginBeautician,
    requestResetPasswordBeautician,
    resetPasswordBeautician,
    deactivateBeauticianAccount,
    getShopIds } = require('../controllers/authController')

router.get('/', authHome)
/// user
router.post('/user-register', registerUser)
router.post('/user-login', loginUser)
router.post('/user-request-reset-password', requestResetPasswordUser)
router.post('/user-reset-password', resetPasswordUser)
router.route('/user-deactivate-account/:id').delete(protectUser, deactivateUserAccount)
/// admin 
router.post('/admin-register', registerAdmin)
router.post('/admin-login', loginAdmin)
router.post('/admin-request-reset-password', requestResetPasswordAdmin)
router.post('/admin-reset-password', resetPasswordAdmin)
router.route('/admin-deactivate-account/:id').delete(protectAdmin, deactivateAdminAccount)
/// beautician
router.post('/beautician-register', registerBeautician)
router.post('/beautician-login', loginBeautician)
router.post('/beautician-request-reset-password', requestResetPasswordBeautician)
router.post('/beautician-reset-password', resetPasswordBeautician)
router.route('/beautician-deactivate-account/:id').delete(protectBeautician, deactivateBeauticianAccount)
router.get('/shop-ids', getShopIds);


module.exports =router
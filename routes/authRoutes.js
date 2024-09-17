const express = require('express')
const router = express.Router()

// middlewares
const { protectUser } = require('../middleware/authMiddleware')

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
    registerBeautician,
    loginBeautician,
    requestResetPasswordBeautician,
    resetPasswordBeautician } = require('../controllers/authController')

router.get('/', authHome)
router.post('/user-register', registerUser)
router.post('/user-login', loginUser)
router.post('/user-request-reset-password', requestResetPasswordUser)
router.post('/user-reset-password', resetPasswordUser)
router.route('/user-deactivate-account/:id').delete(protectUser, deactivateUserAccount)
router.post('/admin-register', registerAdmin)
router.post('/admin-login', loginAdmin)
router.post('/admin-request-reset-password', requestResetPasswordAdmin)
router.post('/admin-reset-password', resetPasswordAdmin)
router.post('/beautician-register', registerBeautician)
router.post('/beautician-login', loginBeautician)
router.post('/beautician-request-reset-password', requestResetPasswordBeautician)
router.post('/beautician-reset-password', resetPasswordBeautician)


module.exports =router
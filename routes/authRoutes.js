const express = require('express')
const router = express.Router()

const {
    authHome,
    registerUser,
    loginUser,
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
router.post('/admin-register', registerAdmin)
router.post('/admin-login', loginAdmin)
router.post('/admin-request-reset-password', requestResetPasswordAdmin)
router.post('/admin-reset-password', resetPasswordAdmin)
router.post('/beautician-register', registerBeautician)
router.post('/beautician-login', loginBeautician)
router.post('/beautician-request-reset-password', requestResetPasswordBeautician)
router.post('/beautician-reset-password', resetPasswordBeautician)


module.exports =router
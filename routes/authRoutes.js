const express = require('express')
const router = express.Router()

const {
    authHome,
    registerUser,
    loginUser,
    registerAdmin,
    loginAdmin,
    registerBeautician,
    loginBeautician } = require('../controllers/authController')

router.get('/', authHome)
router.post('/user-register', registerUser)
router.post('/user-login', loginUser)
router.post('/admin-register', registerAdmin)
router.post('/admin-login', loginAdmin)
router.post('/beautician-register', registerBeautician)
router.post('/beautician-login', loginBeautician)


module.exports =router
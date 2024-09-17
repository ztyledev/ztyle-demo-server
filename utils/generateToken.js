const jwt = require('jsonwebtoken')

const generateToken = (id, userType ) => {
    
    let secret;

    if (userType === 'user') {
        secret = process.env.USER_JWT_SECRET
    }
    else if (userType === 'admin') {
        secret = process.env.ADMIN_JWT_SECRET
    }
    else if (userType === 'beautician') {
        secret = process.env.BEAUTICIAN_JWT_SECRET
    }
    
    return jwt.sign({ id }, secret)
    
}

module.exports = generateToken

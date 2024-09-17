const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// authenticate the user 

const protectUser = asyncHandler(async (req, res, next) => {
    
    // access autherization value from header
    const authHeader = req.headers.authorization;


    let token;

    if (authHeader && authHeader.startsWith('Bearer')) {
        
        try {
            // split token by removing 'Bearer'
            token = authHeader.split(' ')[1]
    
            // verify the token with JWT secret
            jwt.verify(token, process.env.USER_JWT_SECRET)
            next();
            
        }
        catch (err) {
            res.status(401);
            throw new Error("Not Autherized , Invalid token");
        }

    }
    else {
        res.status(401);
        throw new Error("Not Autherized , Invalid token");
        
    }

})

// authenticate for beautician

const protectBeautician = asyncHandler(async (req, res, next) => {
    
    // access autherization value from header
    const authHeader = req.headers.authorization;


    let token;

    if (authHeader && authHeader.startsWith('Bearer')) {
        
        try {
            // split token by removing 'Bearer'
            token = authHeader.split(' ')[1]
    
            // verify the token with JWT secret
            jwt.verify(token, process.env.BEAUTICIAN_JWT_SECRET)
            next();
            
        }
        catch (err) {
            res.status(401);
            throw new Error("Not Autherized , Invalid token");
        }

    }
    else {
        res.status(401);
        throw new Error("Not Autherized , Invalid token");
        
    }

})

// authenticate for beautician

const protectAdmin = asyncHandler(async (req, res, next) => {
    
    // access autherization value from header
    const authHeader = req.headers.authorization;


    let token;

    if (authHeader && authHeader.startsWith('Bearer')) {
        
        try {
            // split token by removing 'Bearer'
            token = authHeader.split(' ')[1]
    
            // verify the token with JWT secret
            jwt.verify(token, process.env.ADMIN_JWT_SECRET)
            next();
            
        }
        catch (err) {
            res.status(401);
            throw new Error("Not Autherized , Invalid token");
        }

    }
    else {
        res.status(401);
        throw new Error("Not Autherized , Invalid token");
        
    }

})

module.exports = {
    protectUser,
    protectBeautician,
    protectAdmin
}

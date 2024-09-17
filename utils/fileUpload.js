const multer = require('multer')
const path = require('path')

// create a storage
const storage = (destination) => multer.diskStorage({

    destination: destination,
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const profilePicUpload = (destination) => multer({

    storage: storage(destination),
    limits: {
        fileSize:2*1024*1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
             cb(null, true);
        }
        else {
            return cb(new Error('Only .png, .jpg, .jpeg files are supported'));
        }
    },
     onError: function (err, next) {
        return console.log('Error :', err);
        next(err);
    }
     
}).single('profilePic')

const shopImageUpload = (destination) => multer({

    storage: storage(destination),
    limits: {
        fileSize:2*1024*1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
             cb(null, true);
        }
        else {
            return cb(new Error('Only .png, .jpg, .jpeg files are supported'));
        }
    },
     onError: function (err, next) {
        return console.log('Error :', err);
        next(err);
    }
     
}).single('shopImage')

const image1Upload = (destination) => multer({

    storage: storage(destination),
    limits: {
        fileSize:2*1024*1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
             cb(null, true);
        }
        else {
            return cb(new Error('Only .png, .jpg, .jpeg files are supported'));
        }
    },
     onError: function (err, next) {
        return console.log('Error :', err);
        next(err);
    }
     
}).single('image1')

const image2Upload = (destination) => multer({

    storage: storage(destination),
    limits: {
        fileSize:2*1024*1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
             cb(null, true);
        }
        else {
            return cb(new Error('Only .png, .jpg, .jpeg files are supported'));
        }
    },
     onError: function (err, next) {
        return console.log('Error :', err);
        next(err);
    }
     
}).single('image2')

const shopCertificateUpload = (destination) => multer({

    storage: storage(destination),
    limits: {
        fileSize:2*1024*1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "application/pdf") {
             cb(null, true);
        }
        else {
            return cb(new Error('Only .pdf .png, .jpg, .jpeg files are supported'));
        }
    },
     onError: function (err, next) {
        return console.log('Error :', err);
        next(err);
    }
     
}).single('shopCertificate')

module.exports = {
    profilePicUpload,
    shopImageUpload,
    image1Upload,
    image2Upload,
    shopCertificateUpload
}
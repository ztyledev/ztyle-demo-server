const path = require('path')
const fs =require('fs')
const asyncHandler = require('express-async-handler')

// models
const shopModel = require('../models/shopModel')
const adminModel = require('../models/adminModel')
const beauticianProfileModel = require('../models/beauticianProfileModel')

// configs
const { baseUrl } = require('../config/Constants')



const adminHome = asyncHandler(async (req, res) => {
    res.status(200).json({message:"admin routes : home page"})
})

const getShops = asyncHandler(async (req, res) => {

    const shops = await shopModel.find()
    
    // check there exist any shops or not
    
    if (shops.length !== 0) {
        res.status(200).json(shops)
    }
    else {
        res.status(404)
        throw new Error('No Shops Found')
    }

})

/// shop section

const addShop = asyncHandler(async (req, res) => {
    
    const newShop = req.body
    const { shopName, mobile, shopId } = newShop
    
    // check for the existence of shop
    
    const existingShop = await shopModel.findOne({ shopName, mobile })
    
    if (existingShop) {
        res.status(409)
        throw new Error("Shop Already Exists")
    }

    // check the existence of shop id

    const existingShopId = await shopModel.findOne({ shopId })
    
    if (existingShopId) {
        res.status(409)
        throw new Error("Shop Id Already Exists. Please Provide a Different Id")
    }

    // create new shop in db

    const shop = await shopModel.create(newShop)

    if (shop) {
        res.status(200).json(shop)
    }
    else {
        res.status(400)
        throw new Error('Invalid Shop')
    }
    
})

const getShop = asyncHandler(async (req, res) => {
    
    const { shopId } = req.body
    
    // find the shop from db
    const myShop = await shopModel.findOne({ shopId })
    
    // check specified shop exists or not
    
    if (myShop) {
        res.status(200).json(myShop)
    }
    else {
        res.status(404)
        throw new Error('Shop Does not Exist')
    }
    
})

const getShopById = asyncHandler(async (req, res) => {
    
    const { id } = req.params
    
    // access the shop with specified shop id

    const shop = await shopModel.findById(id)
    
    if (shop) {
        res.status(200).json(shop)
    }
    else {
        res.status(404)
        throw new Error('Shop Does not Exist')
    }


})

const updateShopById = asyncHandler(async (req, res) => {
    
    const { id } = req.params
    const shop = req.body
    
    // update the current shop from req.body
    
    await shopModel.findByIdAndUpdate(id, shop)
    
    // access the updated shop
    const updatedShop = await shopModel.findById(id)

    // check the updation status and return the same

    if (updatedShop) {
        res.status(200).json(updatedShop)
    }
    else {
        res.status(404)
        throw new Error('Shop Does Not Exists')
    }
    
    
})

const deleteShopById = asyncHandler(async (req, res) => {
    
    const { id } = req.params
    
    // remove existsing shop image
    const currentShop = await shopModel.findById(id)
    const currentShopImage = currentShop.shopImage


    if (currentShopImage) {
        
        const currentShopImageName = currentShopImage.match(/\/([^\/?#]+)[^\/]*$/)
        const currentShopImagePath = path.resolve(__dirname, '../storage/images', currentShopImageName[1])
        fs.unlinkSync(currentShopImagePath)

    }

    // remove existsing image1
    const currentImage1 = currentShop.image1


    if (currentImage1) {
        
        const currentImage1Name = currentImage1.match(/\/([^\/?#]+)[^\/]*$/)
        const currentImage1Path = path.resolve(__dirname, '../storage/images', currentImage1Name[1])
        fs.unlinkSync(currentImage1Path)

    }

    // remove existsing image2
    const currentImage2 = currentShop.image2


    if (currentImage2) {
        
        const currentImage2Name = currentImage2.match(/\/([^\/?#]+)[^\/]*$/)
        const currentImage2Path = path.resolve(__dirname, '../storage/images', currentImage2Name[1])
        fs.unlinkSync(currentImage2Path)

    }

    // remove existsing shop certificate
    const currentShopCertificate = currentShop.shopCertificate


    if (currentShopCertificate) {
        
        const currentShopCertificateName = currentShopCertificate.match(/\/([^\/?#]+)[^\/]*$/)
        const currentShopCertificatePath = path.resolve(__dirname, '../storage/certificates', currentShopCertificateName[1])
        fs.unlinkSync(currentShopCertificatePath)

    }
    
    // delete the current shop

    await shopModel.findByIdAndDelete(id)

    // check the deleted shop exists or not

    const deletedShop = await shopModel.findById(id)

    if (!deletedShop) {
        res.status(200).json(id)
    }
    else {
        res.status(400)
        throw new Error('Delete Failed')
    }

})

const getShopsByState = asyncHandler(async (req, res) => {
    
    const { state } = req.body
    // find shops
    const shops = await shopModel.find({ state })
    
    if (shops.length !== 0) {

        // filter out active shops

        const activeShops = shops.filter(shop => shop.status === "active")
        
        if (activeShops.length !== 0) {
            res.status(200).json(activeShops)    
        }
        else {
            res.status(404)
            throw new Error('No Shops Found')
        }
        
    }
    else {
        res.status(404)
        throw new Error('No Shops Found')
    }
    
})


const getShopsByDistrict = asyncHandler(async (req, res) => {
    
    const { state, district } = req.body
    
    const shops = await shopModel.find({ state, district })
    
    if (shops.length !== 0) {

        // filter out active shops

        const activeShops = shops.filter(shop => shop.status === "active")
        
        if (activeShops.length !== 0) {
            res.status(200).json(activeShops)    
        }
        else {
            res.status(404)
            throw new Error('No Shops Found')
        }
    }
    else {
        res.status(404)
        throw new Error('No Shops Found')
    }
    
})

const getPendingShopsState = asyncHandler(async (req, res) => {

    const { state } = req.body
    // find shops
    const shops = await shopModel.find({ state })
    
    if (shops.length !== 0) {

        // filter out pending shops

        const pendingShops = shops.filter(shop => shop.status === "pending")
        
        if (pendingShops.length !== 0) {
            res.status(200).json(pendingShops)    
        }
        else {
            res.status(404)
            throw new Error('No Shops Found')
        }
        
    }
    else {
        res.status(404)
        throw new Error('No Shops Found')
    }

})

const getPendingShopsDistrict = asyncHandler(async (req, res) => {

    const { state, district } = req.body
    
    const shops = await shopModel.find({ state, district })
    
    if (shops.length !== 0) {

        // filter out pending shops

        const pendingShops = shops.filter(shop => shop.status === "pending")
        
        if (pendingShops.length !== 0) {
            res.status(200).json(pendingShops)    
        }
        else {
            res.status(404)
            throw new Error('No Shops Found')
        }
    }
    else {
        res.status(404)
        throw new Error('No Shops Found')
    }

    
})

// related to files

const updateShopImageById = asyncHandler(async (req, res) => {
    
    const { id } = req.params
    
    // declare an empty shop object and image url
    const shop = {}
    var imgUrl = ''

    // assign image url
    if (req.file) {
        imgUrl = `${baseUrl}/storage/images/${req.file.filename}`
    }

    shop.shopImage = imgUrl
    
    //to check whether shop image exists for this profile

    const currentShop = await shopModel.findById(id)
    const currentShopImage = currentShop.shopImage


    if (currentShopImage) {
        
        const currentShopImageName = currentShopImage.match(/\/([^\/?#]+)[^\/]*$/)
        const currentShopImagePath = path.resolve(__dirname, '../storage/images', currentShopImageName[1])
        fs.unlinkSync(currentShopImagePath)

    }

    // update shop to include image url
    await shopModel.findByIdAndUpdate(id, shop)
    
    // verify the update
    const updatedShop = await shopModel.findById(id)

    if (updatedShop) {
        res.status(200).json(updatedShop)
    }
    else {
        res.status(404)
        throw new Error('Shop Does not Exist')
    }
    
})

const deleteShopImageById = asyncHandler(async (req, res) => {

    const { id } = req.params

    // remove existsing shop image
    const currentShop = await shopModel.findById(id)
    const currentShopImage = currentShop.shopImage


    if (currentShopImage) {
        
        const currentShopImageName = currentShopImage.match(/\/([^\/?#]+)[^\/]*$/)
        const currentShopImagePath = path.resolve(__dirname, '../storage/images', currentShopImageName[1])
        fs.unlinkSync(currentShopImagePath)

    }

    // database entry is removed
    currentShop.shopImage = null
    await shopModel.findByIdAndUpdate(id, currentShop)
    
    // validate delete
    const picDeletedShop = await shopModel.findById(id)
    if (!picDeletedShop.shopImage) {
        res.status(200).json(picDeletedShop)

    }
    else {
        res.status(400)
        throw new Error('Delete shop image failed')
    }

    
})

const updateImage1ById = asyncHandler(async (req, res) => {
    
    const { id } = req.params
    
    // declare an empty shop object and image url
    const shop = {}
    var imgUrl = ''

    // assign image url
    if (req.file) {
        imgUrl = `${baseUrl}/storage/images/${req.file.filename}`
    }

    shop.image1 = imgUrl
    
    //to check whether image1 exists for this profile

    const currentShop = await shopModel.findById(id)
    const currentImage1 = currentShop.image1


    if (currentImage1) {
        
        const currentImage1Name = currentImage1.match(/\/([^\/?#]+)[^\/]*$/)
        const currentImage1Path = path.resolve(__dirname, '../storage/images', currentImage1Name[1])
        fs.unlinkSync(currentImage1Path)

    }

    // update shop to include image url
    await shopModel.findByIdAndUpdate(id, shop)
    
    // verify the update
    const updatedShop = await shopModel.findById(id)

    if (updatedShop) {
        res.status(200).json(updatedShop)
    }
    else {
        res.status(404)
        throw new Error('Shop Does not Exist')
    }
    
})

const deleteImage1ById = asyncHandler(async (req, res) => {

    const { id } = req.params

    // remove existsing image1
    const currentShop = await shopModel.findById(id)
    const currentImage1 = currentShop.image1


    if (currentImage1) {
        
        const currentImage1Name = currentImage1.match(/\/([^\/?#]+)[^\/]*$/)
        const currentImage1Path = path.resolve(__dirname, '../storage/images', currentImage1Name[1])
        fs.unlinkSync(currentImage1Path)

    }

    // database entry is removed
    currentShop.image1 = null
    await shopModel.findByIdAndUpdate(id, currentShop)
    
    // validate delete
    const picDeletedShop = await shopModel.findById(id)
    if (!picDeletedShop.image1) {
        res.status(200).json(picDeletedShop)

    }
    else {
        res.status(400)
        throw new Error('Delete image1 failed')
    }

})

const updateImage2ById = asyncHandler(async (req, res) => {
    
    const { id } = req.params
    
    // declare an empty shop object and image url
    const shop = {}
    var imgUrl = ''

    // assign image url
    if (req.file) {
        imgUrl = `${baseUrl}/storage/images/${req.file.filename}`
    }

    shop.image2 = imgUrl
    
    //to check whether image2 exists for this profile

    const currentShop = await shopModel.findById(id)
    const currentImage2 = currentShop.image2


    if (currentImage2) {
        
        const currentImage2Name = currentImage2.match(/\/([^\/?#]+)[^\/]*$/)
        const currentImage2Path = path.resolve(__dirname, '../storage/images', currentImage2Name[1])
        fs.unlinkSync(currentImage2Path)

    }

    // update shop to include image url
    await shopModel.findByIdAndUpdate(id, shop)
    
    // verify the update
    const updatedShop = await shopModel.findById(id)

    if (updatedShop) {
        res.status(200).json(updatedShop)
    }
    else {
        res.status(404)
        throw new Error('Shop Does not Exist')
    }
    
})

const deleteImage2ById = asyncHandler(async (req, res) => {

    const { id } = req.params

    // remove existsing image2
    const currentShop = await shopModel.findById(id)
    const currentImage2 = currentShop.image2


    if (currentImage2) {
        
        const currentImage2Name = currentImage2.match(/\/([^\/?#]+)[^\/]*$/)
        const currentImage2Path = path.resolve(__dirname, '../storage/images', currentImage2Name[1])
        fs.unlinkSync(currentImage2Path)

    }

    // database entry is removed
    currentShop.image2 = null
    await shopModel.findByIdAndUpdate(id, currentShop)
    
    // validate delete
    const picDeletedShop = await shopModel.findById(id)
    if (!picDeletedShop.image2) {
        res.status(200).json(picDeletedShop)

    }
    else {
        res.status(400)
        throw new Error('Delete image1 failed')
    }

})

const updateshopCertificateById = asyncHandler(async (req, res) => {
    
    const { id } = req.params
    
    // declare an empty shop object and file url
    const shop = {}
    var fileUrl = ''

    // assign image url
    if (req.file) {
        fileUrl = `${baseUrl}/storage/certificates/${req.file.filename}`
    }

    shop.shopCertificate = fileUrl
    
    //to check whether certificate exists for this profile

    const currentShop = await shopModel.findById(id)
    const currentshopCertificate = currentShop.shopCertificate
    

    if (currentshopCertificate) {
        
        const currentshopCertificateName = currentshopCertificate.match(/\/([^\/?#]+)[^\/]*$/)
        const currentshopCertificatePath = path.resolve(__dirname, '../storage/certificates', currentshopCertificateName[1])
        fs.unlinkSync(currentshopCertificatePath)
        
    }

    // update shop to include file url
    await shopModel.findByIdAndUpdate(id, shop)
    
    // verify the update
    const updatedShop = await shopModel.findById(id)

    if (updatedShop) {
        res.status(200).json(updatedShop)
    }
    else {
        res.status(404)
        throw new Error('Shop Does not Exist')
    }
    
})

const deleteShopCirtificateById = asyncHandler(async (req, res) => {

    const { id } = req.params

    // remove existsing shop certificate
    const currentShop = await shopModel.findById(id)
    const currentShopCertificate = currentShop.shopCertificate


    if (currentShopCertificate) {
        
        const currentShopCertificateName = currentShopCertificate.match(/\/([^\/?#]+)[^\/]*$/)
        const currentShopCertificatePath = path.resolve(__dirname, '../storage/certificates', currentShopCertificateName[1])
        fs.unlinkSync(currentShopCertificatePath)

    }

    // database entry is removed
    currentShop.shopCertificate = null
    await shopModel.findByIdAndUpdate(id, currentShop)
    
    // validate delete
    const picDeletedShop = await shopModel.findById(id)
    if (!picDeletedShop.shopCertificate) {
        res.status(200).json(picDeletedShop)

    }
    else {
        res.status(400)
        throw new Error('Delete shop certificate failed')
    }

})

/// Admin section


const activateAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { designation, status } = req.body
    
    if (designation === "director" && status === "active") {
        // change status to active
        const currentAdmin = { status: "active" }
        // activate admin
        await adminModel.findByIdAndUpdate(id, currentAdmin)
        
        // validate activation
        const updatedAdmin = await adminModel.findById(id)
        if (updatedAdmin.status === "active") {
            res.status(200).json(updatedAdmin)
        }
        else {
            res.status(400)
            throw new Error('Activation Failed')
        }

    }
    else {
        res.status(400)
        throw new Error('Not Authorized To Perform This Action. Please Contact System Admin')
    }
    
})

const deactivateAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { designation, status } = req.body
    
    if (designation === "director" && status === "active") {
        // change status to pending
        const currentAdmin = { status: "pending" }
        // deactivate admin
        await adminModel.findByIdAndUpdate(id, currentAdmin)
        
        // validate activation
        const updatedAdmin = await adminModel.findById(id)
        if (updatedAdmin.status === "pending") {
            res.status(200).json(updatedAdmin)
        }
        else {
            res.status(400)
            throw new Error('Activation Failed')
        }

    }
    else {
        res.status(400)
        throw new Error('Not Authorized To Perform This Action. Please Contact System Admin')
    }
    
})


const rejectAdmin = asyncHandler (async(req,res) => {

    const { id } = req.params
    const { designation, status } = req.body
    
    if (designation === "director" && status === "active") {
        // change status to Rejected
        const currentAdmin = { status: "rejected" }
        // reject admin
        await adminModel.findByIdAndUpdate(id, currentAdmin)
        
        // validate rejection
        const updatedAdmin = await adminModel.findById(id)
        if (updatedAdmin.status === "rejected") {
            res.status(200).json(updatedAdmin)
        }
        else {
            res.status(400)
            throw new Error('Rejection Failed')
        }

    }
    else {
        res.status(400)
        throw new Error('Not Authorized To Perform This Action. Please Contact System Admin')
    }
    
})

const deleteAdmin =asyncHandler (async(req,res) => {
    const { id } = req.params
    const { designation, status } = req.body
    
    if (designation === "director" && status === "active") {

        // delete admin
        await adminModel.findByIdAndDelete(id)

        // validate deletion
        const deletedAdmin = await adminModel.findById(id)
        if (!deletedAdmin) {
            res.status(200).json(id)
        }
        else {
            res.status(400)
            throw new Error('Deletion Failed')
        }

    }
    else {
        res.status(400)
        throw new Error('Not Authorized To Perform This Action. Please Contact System Admin')
    }

})

const getAdmins =asyncHandler (async(req,res) => {

    // check there exist any admins or not
    const activeAdmins = await adminModel.find()

    if (activeAdmins.length !== 0) {
        res.status(200).json(activeAdmins)
    }
    else {
        res.status(404)
        throw new Error('No Active Admins Found')
    }
     
    
})

const getAdminById = asyncHandler(async (req, res) => {
    const { id } = req.params
    
    // get admin from db by id

    const admin = await adminModel.findById(id)
    if (admin) {
        res.status(200).json(admin)
    }
    else {
        res.status(404)
        throw new Error('Admin Not Found')
    }

})

const getPendingAdmins =asyncHandler (async(req,res) => {

    const pendingAdmins = await adminModel.find({status: 'pending'})
    
    if (pendingAdmins.length !==0) {
        res.status(200).json(pendingAdmins)
    }
    else {
        res.status(404)
        throw new Error('No Pending Admins')
    }
})

/// Beautician

const getBeauticiansByShopId = asyncHandler(async (req, res) => {
    const { shopId } = req.body;
    // validate back end
    if (!shopId) {
        res.status(404)
        throw new Error("Enter Shop Id ")
    }

    const beauticians = await beauticianProfileModel.find({ shopId });
    if (beauticians.length !== 0) {
            res.status(200).json(beauticians)    
    }
    
    else {
        res.status(404)
        throw new Error('No Beauticians For This Shop')
    }
    
})

const getBeauticianById = asyncHandler(async (req, res) => {
    const { id } = req.params
    
    // get profile from db
    const beautician = await beauticianProfileModel.findById(id)
    
    if (beautician) {
        res.status(200).json(beautician)
    }
    else {
        res.status(404)
        throw new Error('Beautician Not Found')
    }

    
})

const editBeauticianById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const beautician = req.body
    


    // update the current beautician from req.body
    
    await beauticianProfileModel.findByIdAndUpdate(id, beautician)
    
    // access the updated beautician
    const updatedBeautician = await beauticianProfileModel.findById(id)

    // check the updation status and return the same

    if (updatedBeautician) {
        res.status(200).json(updatedBeautician)
    }
    else {
        res.status(404)
        throw new Error('Beautician Does Not Exists')
    }
})

const deleteBeauticianById = asyncHandler(async (req, res) => {
    const { id } = req.params;

     // remove existsing profile pic
    const currentProfile = await beauticianProfileModel.findById(id)
    const currentProfilePic = currentProfile.profilePic
    
    if (currentProfilePic) {
        
        const currentProfilePicName = currentProfilePic.match(/\/([^\/?#]+)[^\/]*$/)
        const currentProfilePicPath = path.resolve(__dirname, '../storage/images', currentProfilePicName[1])
        fs.unlinkSync(currentProfilePicPath)
    }

    // delete beautician
        await beauticianProfileModel.findByIdAndDelete(id)

        // validate deletion
        const deletedBeautician = await beauticianProfileModel.findById(id)
        if (!deletedBeautician) {
            res.status(200).json(id)
        }
        else {
            res.status(400)
            throw new Error('Deletion Failed')
        }
    
})

module.exports = {
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


}
const asyncHandler = require('express-async-handler')

// models
const shopModel = require('../models/shopModel')
const beauticianProfileModel = require('../models/beauticianProfileModel')

const userHome = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User Routes : Home Page" })
})

const getShops = asyncHandler(async (req, res) => {

    // access all shops in db
    const shops = await shopModel.find({status:"active"});
    if (shops.length !== 0) {
        res.status(200).json(shops)
    }
    else {
        res.status(404)
        throw new Error('No Shops Found')
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
        throw new Error('Shop Does Not Exist')

    }
})

const getBeauticiansByShopId = asyncHandler(async (req, res) => {
    const { shopId } = req.body
    // back end validation
    if (!shopId) {
        res.status(404)
        throw new Error('Invalid Shop Id . Shop Does Not Exist')
    }

    // data base access
    const beauticians = await beauticianProfileModel.find({ shopId, status: "active" })
    
    // check existance of beautician
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
    // check the database for beautician
    const beautician = await beauticianProfileModel.findById(id)
    if (beautician) {
        res.status(200).json(beautician)
    }
    else {
        res.status(404)
        throw new Error('Beautician Not Found')
    }
   
})

const getShopMenu = asyncHandler(async (req, res) => {
    // the mongodb object id for shop
    const { id } = req.body;
    // back end validation
    if (!id) {
        res.status(404)
        throw new Error('At least one field is empty')
    }
    // check the existance of shop
    const shop = await shopModel.findById(id);
    if (!shop) {
        res.status(404)
        throw new Error('Shop Not Found')
    }

    const menu = shop.menu;
    if (menu) {
        res.status(200).json(menu)
    }
    else {
        res.status(404)
        throw new Error('Menu Does not Exist')
    }
    
})

module.exports = {
    userHome,
    getShops,
    getShopById,
    getBeauticiansByShopId,
    getBeauticianById,
    getShopMenu
}
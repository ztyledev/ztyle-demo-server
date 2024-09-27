const asyncHandler = require('express-async-handler')


// models
const bookingModel = require('../models/bookingModel')
const userModel = require('../models/userModel')
const beauticianProfileModel = require('../models/beauticianProfileModel')
const shopModel = require('../models/shopModel')
const slotModel = require('../models/slotModel')

// utils
const dateValidator = require('../utils/dateValidator')
const dateExtractor = require('../utils/dateExtractor')


const bookingHome = asyncHandler(async (req, res) => {
     res.status(200).json({ message: "booking routes : home page" })
})

// User Section

const getBookingsByUser = asyncHandler(async (req, res) => {
    const { userId } = req.body
    // search bookings in db with given userId 
    const userBookings = await bookingModel.find({ userId })
    
    if (userBookings.length !== 0) {
        res.status(200).json(userBookings)
    }
    else {
        res.status(404)
        throw new Error('No Bookings Found For This User')
    }
    
})


const addBookingByUser = asyncHandler(async (req, res) => {
    
    const newBooking = req.body
    const { userId, beauticianId, shopId, date, slot } = newBooking

    // back end validation
    if (!userId || !beauticianId || !shopId || !date || !slot) {
        res.status(404)
        throw new Error('At Least One Field Is Empty')
    }

    // existence of user
    const currentUser = await userModel.findById(userId)
    if (!currentUser) {
        res.status(404)
        throw new Error('User Does not exist')
    }

    // existence of shop
    const currentShop = await shopModel.findOne({ shopId })
    if (!currentShop) {
        res.status(404)
        throw new Error('Shop Does not exist')
    }

    // existence of beautician
    const currentBeautician = await beauticianProfileModel.findById(beauticianId)
    if (!currentBeautician) {
        res.status(404)
        throw new Error('Beautician Profile Does not exist')
    }

    if (currentBeautician.shopId !== shopId) {
        res.status(404)
        throw new Error(`Beautician Doesn't' Belong to the given Shop`)

    }

    // check whether the given date is valid for booking
    const dateStatus = dateValidator(date)
    
    if (!dateStatus) {
        res.status(400)
        throw new Error(`The Date Selected is Past`)
    }
    
    // remove time from date
    const extractedDate = dateExtractor(new Date(date))
    
    // access the slots for specified beautician and date
    let dateSlotes = await slotModel.findOne({ beauticianId, date: extractedDate })
    
    // if slot is not created for specific day, create the same 
    if (!dateSlotes) {
        dateSlotes = await slotModel.create({
            beauticianId,
            date: extractedDate,
            slots:currentBeautician.availableSlots
        })

        const allSlots = await slotModel.find({ beauticianId })

        let i 

        for (i = 0; i < allSlots.length; i++){
            if (allSlots[i].date < extractedDate) {
                await slotModel.findByIdAndDelete(allSlots[i]._id)
            }
        }

        

    }

    const specifiedSlot = dateSlotes?.slots?.find(dateSlot => dateSlot.start === slot.start && dateSlot.end === slot.end)

    
    // check for the existence of slot
    if (!specifiedSlot) {
        res.status(404)
        throw new Error(`given slot is not provided by the specified beautician`)
    }

    if (specifiedSlot.status === 'confirmed') {
        res.status(409)
        throw new Error(`given slot is already booked`)
    }
    
    // confirm the booking of specified slot for specified beautician and date 
    specifiedSlot.status = "confirmed"
    dateSlotes.slots?.map((dateSlot) => {
        if (dateSlot.start === slot.start && dateSlot.end == slot.end) {
            dateSlot.status="confirmed"
        }
    })

    // update the slot data to acknowledge the given booking
    await slotModel.findByIdAndUpdate(dateSlotes._id,dateSlotes)
    
    newBooking.date = extractedDate
    // create booking data for given booking
    const booking = await bookingModel.create(newBooking)

    if (booking) {
        res.status(200).json(booking)
    }
    else {
        res.status(400)
        throw new Error('Invalid Booking')
    }

})

const getBookingById = asyncHandler(async (req, res) => {
    const { id } = req.params
    
    // access the booking with specified id
    const booking = await bookingModel.findById(id)
    if (booking) {
        res.status(200).json(booking)
    }
    else {
        res.status(404)
        throw new Error('Booking Not Found')
    }
})

const cancelBookingByUserById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const booking = await bookingModel.findById(id)
    if (!booking) {
        res.status(404)
        throw new Error('Booking Not Found')
    }

    // cases for invalid cancellation requests
    if (booking.status === 'confirmed') {
        res.status(400)
        throw new Error('Cant Cancel Booking After Confirmation')
    }
    if (booking.status === 'canceled by user') {
        res.status(400)
        throw new Error('Booking Is Already Canceled By User')
    }
    if (booking.status === 'canceled by beautician') {
        res.status(400)
        throw new Error('Booking Is Already Canceled By Beautician')
    }

    const { beauticianId, date, slot } = booking
    
    let dateSlotes = await slotModel.findOne({ beauticianId, date })
    
    if (!dateSlotes) {
        res.status(404)
        throw new Error('There is no slot associated with given booking')
    }
     // confirm the booking of specified slot for specified beautician and date
    dateSlotes.slots?.map((dateSlote) => {
        if (dateSlote.start === slot.start && dateSlote.end === slot.end) {
            dateSlote.status = 'canceled'
        }
        
    })

     // update the slot data to acknowledge the given booking cancellation
    await slotModel.findByIdAndUpdate(dateSlotes._id,dateSlotes)
    
    // update the booking
    await bookingModel.findByIdAndUpdate(id, { status: 'canceled by user' })
    
    // validate the update

    const updatedBooking = await bookingModel.findById(id)
    if (updatedBooking) {
        res.status(200).json(updatedBooking)
    }
    else {
        res.status(400)
        throw new Error('Invalid Booking')
    }
})

// Beautician Section

const getBookingsByBeautician = asyncHandler(async (req, res) => {

    const { beauticianId } = req.body
    // search bookings in db with given beauticianId 
    const beauticianBookings = await bookingModel.find({ beauticianId })

    if (beauticianBookings.length !== 0) {
        res.status(200).json(beauticianBookings)
    }
    else {
        res.status(404)
        throw new Error('No Bookings Found For This Beautician')
    }
    
})

const updateBookingByBeauticianById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { action } = req.body
    
    // access the booking corresponding to id
    const currentBooking = await bookingModel.findById(id)

    // existence of booking
    if (!currentBooking) {
        res.status(404)
        throw new Error('No Booking Found')
    }

    // check whether the booking is already cancelled

    if (currentBooking.status === "canceled by user" || currentBooking.status === "canceled by beautician")
    {
        res.status(409)
        throw new Error('Booking Is Already Canceled')
    }
    // check wwhether the booking is confirmed or completed
    
    if (currentBooking.status === "confirmed" || currentBooking.status === "completed") {
        
        res.status(400)
        throw new Error('Cannot Cancel Or Confirm Since the Bokking Is Confiremd Or Completed ')
    }

    // updated the booking status
    currentBooking.status = `${action}`
    await bookingModel.findByIdAndUpdate(id, currentBooking)
    // validate update
    const updatedBooking = await bookingModel.findById(id)
    if (updatedBooking) {
        res.status(200).json(updatedBooking)
    }
    else {
        res.status(400)
        throw new Error('Invalid Booking')
    }
    
})

// Admin Section

const getBookingsByAdmin = asyncHandler(async (req, res) => {
    
    // access all bookings in db

    const bookings = await bookingModel.find()
    if (bookings.length !== 0) {
        res.status(200).json(bookings)
    }
    else {
        res.status(404)
        throw new Error('No Bookings Found')
    }
    
    
})

const getBookingByAdminByField = asyncHandler(async (req, res) => {
    
    //access field and value 
    const { field, value } = req.body
    // write cquery to select the field
    const query = {
        [field]:value
    }

    const bookings = await bookingModel.find(query)

    if (bookings.length !== 0) {
        res.status(200).json(bookings)
    }
    else {
        res.status(400)
        throw new Error('No Bookings Found For Specified Field')
    }

})

const deletebookingByAdminById = asyncHandler(async (req, res) => {
    const { id } = req.params
    
    // delete the booking in db
    await bookingModel.findByIdAndDelete(id)
    // validate the deletion
    const deletedBooking = await bookingModel.findById(id)
    if (!deletedBooking) {
        res.status(200).json(id)
    }
    else {
        res.status(400)
        throw new Error('Delete Failed')
    }


})




module.exports = {
    bookingHome,
    getBookingsByUser,
    addBookingByUser,
    getBookingById,
    cancelBookingByUserById,
    getBookingsByBeautician,
    updateBookingByBeauticianById,
    getBookingsByAdmin,
    getBookingByAdminByField,
    deletebookingByAdminById,
    
}
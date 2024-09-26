const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// enable .env file
require('dotenv').config()

// PORT, database and error middlewares
const PORT = process.env.PORT || 5000
const connectDb = require('./config/db')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

// routes
const authRoutes = require('./routes/authRoutes')
const userProfileRoutes = require('./routes/userProfileRoutes')
const beauticianProfileRoutes = require('./routes/beauticianProfileRoutes')
const adminRoutes = require('./routes/adminRoutes')
const bookingRoutes = require('./routes/bookingRoutes')


// connect to mongodb using mongoose

connectDb()

// middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/storage/images', express.static('storage/images'))
app.use('/storage/certificates', express.static('storage/certificates'))
app.use('/api/auth', authRoutes)
app.use('/api/user-profile', userProfileRoutes)
app.use('/api/beautician-profile', beauticianProfileRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/booking',bookingRoutes)


// the landing page of server
app.get('/', (req, res) => {
    res.status(200).json({ message: "server home page" })
})

app.use(notFound)
app.use(errorHandler)

// starting the server
app.listen(PORT, () => {
    console.log(`server is listening at PORT ${PORT}`)
})

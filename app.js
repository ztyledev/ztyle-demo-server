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


// connect to mongodb using mongoose

connectDb()

// middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)

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

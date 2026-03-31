const dotenv = require('dotenv')
dotenv.config()  // ← MUST be first, before any other imports

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/auth')
const chatRoutes = require('./routes/chat')
const paymentRoutes = require('./routes/payment')  // ← now loads AFTER dotenv

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/webhook', express.raw({ type: 'application/json' }))
app.use('/api/payment', paymentRoutes)

connectDB()

// console.log('KEY ID:', process.env.RAZORPAY_KEY_ID)    // should print your key now
// console.log('SECRET:', process.env.RAZORPAY_KEY_SECRET) // should print your secret now

app.get('/', (req, res) => {
  res.send('Server is running')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
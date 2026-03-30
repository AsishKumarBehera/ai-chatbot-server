const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const authRoutes = require('./routes/auth')
const chatRoutes = require('./routes/chat')


dotenv.config()
const app = express()


// Middleware

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)
connectDB()

// Routes

app.get('/', (req, res) => {
    res.send('Server is running')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})



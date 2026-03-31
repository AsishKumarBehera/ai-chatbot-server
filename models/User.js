const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requiered: true
    },
    email: {
        type: String,
        required: true,
        unique: true  
    },
    password: {
        type: String,
        required: true
    },

    // backend/models/User.js
plan: {
  type: String,
  enum: ['free', 'pro'],
  default: 'free'
}
})

// Create the Model

const User = mongoose.model('User', userSchema)

module.exports = User
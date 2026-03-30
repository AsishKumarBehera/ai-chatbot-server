const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    role:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

// Chat Schema
const chatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        default: 'New chat'
    },
    messages: [messageSchema]
}, {timestamps: true})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
const express = require('express')
const router = express.Router()
const Chat = require('../models/Chat')
const authMiddleware = require('../middleware/authMiddleware')


// Create Chat route
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const chat = new Chat({
      userId: req.userId,
      title: 'New chat',
      messages: []
    })
    await chat.save()
    res.status(201).json(chat)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get Chat route

router.get('/all', authMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json(chats)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


// add message to chat route

router.put('/:id/message', authMiddleware, async (req, res) => {
  try {
    const { messages, title } = req.body

    const chat = await Chat.findByIdAndUpdate(
  req.params.id,
  { messages, title },
  { returnDocument: 'after' }
)
    res.json(chat)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete chat route

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id)
    res.json({ message: 'Chat deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


// backend/routes/user.js (or wherever your user routes are)
router.get('/plan', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('plan')
    res.json({ plan: user.plan || 'free' })
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch plan' })
  }
})



module.exports = router
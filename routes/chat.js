const express = require('express');
const { handleChatMessage, handleChatMessageById, handleRegenerateChat } = require('../controller/chat')
const router = express.Router();

router.post('/', handleChatMessage)
router.post('/regenerate', handleRegenerateChat)
router.get('/:id', handleChatMessageById)

module.exports = router;
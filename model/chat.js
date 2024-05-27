const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    question: {
        type: 'string',
        required: true,
    },
    answer: {
        type: 'string',
        required: true,
    },
    askedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true })

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
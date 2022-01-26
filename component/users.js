const mongoose = require('mongoose');
const users = require('../models/users');

//setting up model
require('../models/users');
const User = mongoose.model('Users');

// Save a new User

module.exports.SaveNewUser = (msg)=> {
    const newUser ={
        username: msg.chat.id,
        telegramID: msg.chat.username,
        first_name:message.chat.first_name,
        date: msg.date,
    }
    new User(newUser)
        .save();
}

module.exports
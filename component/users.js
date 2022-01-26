const mongoose = require('mongoose');
const users = require('../models/users');

//setting up model
require('../models/users');
const User = mongoose.model('Users');

// Save a new User

module.exports.saveNewUser = (msg)=> {
    const newUser ={
        username: msg.chat.username,
        telegramID: msg.chat.id,
        first_name:msg.chat.first_name,
        date: msg.date,
    }
    new User(newUser)
        .save()
        .then(newUser=>{
            console.log('user registered');
            bot.sendMessage(chatId, 'Done. User Registered Successfully');
        });
}
module.exports.addEmail = ()=> {
    // correct email pattern
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const pattern2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const chatId = msg.chat.id
    const email =match[1];
    // if email is valid  save
    if (pattern.test(email)) {
        User.findOne({telegramID:msg.chat.id})
            .lean()/** for granting access */
            .then(User=>{
                User.email=email;
                User.save().
                then(User=>{
                     bot.sendMessage(chatId," email registered succesfully")
                })
            })
    } else {
        bot.sendMessage(chatId, 'incorect email');
    }
}
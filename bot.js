// bot.js

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const mongoose = require('mongoose');
// This file would be created soon
const parser = require('./parser.js');
require('dotenv').config();

//setting up mongodb
const mongoDb= process.env.MONGO_BD;
mongoose.connect(mongoDb, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log('Mongodb connected')
}).catch(err=>console.log(err))
//my sub module
const {findWord,bible} = require('./component/all-comp');
const {saveNewUser,addEmail} = require('./component/users');

const token = process.env.TELEGRAM_TOKEN_CHUKSONU;
let bot;

// const sasas = `your token is ${token} from bot 1`;
console.log(sasas);

if (process.env.NODE_ENV === 'production') {
    bot = new TelegramBot(token);
    bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
    bot = new TelegramBot(token, { polling: true });
}

// Matches "/word whatever"
bot.onText(/\/word (.+)/, (msg, match) => {
    findWord(bot,msg,match)
});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content of the message
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

// Matches "/bile return ramdom scripture"
bot.onText(/\/bible/, (msg) => {
   bible(bot,msg)
});

// Listen for any kind of message. There are different kinds of messages. 
// acknoledge the reciept of message
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const name = msg.from.username;
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, `Hello ${name} Received your message expect a reply Shortly`);
});


    //register a user
bot.onText(/\/register/, (msg) => {
    saveNewUser(bot,msg) 
})

//saving emails
bot.onText(/\/email (.+)/,(msg,match)=>{
    bot=bot;
    addEmail(bot,msg,match)
})
//The bot sends a message to each user once per second — we just go through the array of users with a for-loop.
setInterval(function() {
        if (users.length > 0) {
            for (let i = 0; i < users.length; i++) {
                bot.sendMessage(users[i], 'Is this annoying?')
            }
        } else {
            console.log('no user registered')
        }
    }, 1780000)
    //setting up the web hook for heroku

// Move the package imports to the top of the file
const express = require('express')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.listen(process.env.PORT);

app.get('/',(req,res)=>{
res.redirect('https://t.me/Chuksonubotou');
})
app.get('/live',(req,res)=>{
res.status(200).send({message:"OK"});
})

app.post('/' + bot.token, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});
// pushing time

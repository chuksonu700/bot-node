// bot.js

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
// This file would be created soon
const parser = require('./parser.js');

require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN_CHUKSONU;
let bot;


const sasas = `your token is ${token} from bot 1`;
console.log(sasas);


if (process.env.NODE_ENV === 'production') {
    bot = new TelegramBot(token);
    bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
    bot = new TelegramBot(token, { polling: true });
}

// Matches "/word whatever"
bot.onText(/\/word (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const word = match[1];
    axios
        .get(`${process.env.OXFORD_API_URL}/entries/en-gb/${word}`, {
            params: {
                fields: 'definitions',
                strictMatch: 'false'
            },
            headers: {
                app_id: process.env.OXFORD_APP_ID,
                app_key: process.env.OXFORD_APP_KEY
            }
        })
        .then(response => {
            const parsedHtml = parser(response.data);
            bot.sendMessage(chatId, parsedHtml, { parse_mode: 'HTML' });
        })
        .catch(error => {
            const errorText = error.response.status === 404 ? `No definition found for the word: <b>${word}</b>` : `<b>An error occured, please try again later</b>`;
            bot.sendMessage(chatId, errorText, { parse_mode: 'HTML' })
        });
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
    // 'msg' is the received Message from Telegram
    
    const chatId = msg.chat.id;
    axios.get('https://labs.bible.org/api/?passage=random')
    .then(response => {
        const parsedHtml = parser(response.data);
        bot.sendMessage(chatId, parsedHtml, { parse_mode: 'HTML' });
    }).catch(error => {
        const errorText = error.response.status === 404 ? `can't get Scripture Now: <b>${word}</b>` : `<b>An error occured, please try again later</b>`;
        bot.sendMessage(chatId, errorText, { parse_mode: 'HTML' })
    });
});

// Listen for any kind of message. There are different kinds of messages. 
// acknoledge the reciept of message
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const name = msg.from.username;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, `Hello ${name} Received your message expect a reply Shortly`);
});

let users = []
    //register a user
bot.onText(/\/register/, (msg, match) => {
    const chatId = msg.chat.id
    users.push(chatId)
    console.log('user registered')
    bot.sendMessage(chatId, 'Done.')
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

app.post('/' + bot.token, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});
// pushing time
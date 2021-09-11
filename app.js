const TelegramBot = require('node-telegram-bot-api');

const token = '1732922344:AAHBNkuCkw3WDUhRxpPSFSJrMoj2YGZ8Z3U'


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
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
}, 1000)
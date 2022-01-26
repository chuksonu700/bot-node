//setting up bot
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
module.exports.findWord =() => {
        axios.get(`${process.env.OXFORD_API_URL}/entries/en-gb/${word}`, {
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
}

module.exports.bible =() => {
     // 'msg' is the received Message from Telegram
    
     const chatId = msg.chat.id;
     axios.get('https://labs.bible.org/api/?passage=random')
         .then(function (response) {
         // handle success
         console.log(response.data);
         const parsedHtml = response.data;
         bot.sendMessage(chatId, parsedHtml, { parse_mode: 'HTML' });
     })
     .catch(function (error) {
          // handle error
          console.log(error);
          const errorText = `can't get Scripture Now <b>An error occured, please try again later</b>`;
          bot.sendMessage(chatId, errorText, { parse_mode: 'HTML' })
     })
}


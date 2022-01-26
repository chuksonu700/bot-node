
// Matches "/word whatever"
module.exports.findWord =(msg,match) => {
    const chatId = msg.chat.id;
    const word = match[1];
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

module.exports.bible =(msg) => {
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


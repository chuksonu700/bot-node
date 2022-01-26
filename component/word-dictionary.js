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

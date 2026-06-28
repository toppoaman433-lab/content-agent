require('dotenv').config();
const axios = require('axios');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const url = `https://api.telegram.org/bot${TOKEN}/getUpdates`;

axios.get(url).then(response => {
    const updates = response.data.result;
    if (updates.length > 0) {
        const chatId = updates[0].message.chat.id;
        console.log('Your Chat ID:', chatId);
    } else {
        console.log('No messages found. Send a message to your bot first!');
    }
}).catch(error => console.error('Error:', error.message));
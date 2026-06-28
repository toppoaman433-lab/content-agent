require('dotenv').config();
const axios = require('axios');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendMessage(message) {
    try {
        const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
        const response = await axios.post(url, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        });
        console.log('✅ Message sent to Telegram!');
        return response.data;
    } catch (error) {
        console.log('❌ Error sending message:', error.message);
    }
}

// Test message
const testMessage = `
🤖 <b>Content Agent Report</b>

📊 <b>Today's Stats:</b>
- Total Likes: 143.5K
- Total Comments: 6,761
- Engagement Rate: 112%

💡 <b>Top Performing Post:</b>
"Sunsets and good vibes 🌅" — 4,660 likes

📅 <b>Content Scheduled:</b>
- 3 posts for Monday
- 2 videos for Wednesday
- 1 carousel for Friday

✉️ <b>New DMs:</b> 23 brand inquiries

<i>Report generated at ${new Date().toLocaleString()}</i>
`;

sendMessage(testMessage);
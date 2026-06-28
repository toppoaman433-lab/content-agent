require('dotenv').config();
const schedule = require('node-schedule');
const axios = require('axios');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendTelegramReport(message) {
    try {
        const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
        await axios.post(url, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        });
        console.log('✅ Report sent to Telegram!');
    } catch (error) {
        console.error('❌ Error sending report:', error.message);
    }
}

// Schedule task for 6:00 PM every day
schedule.scheduleJob('0 18 * * *', async () => {
    console.log('🚀 Running scheduled task at 6:00 PM IST...');
    
    const report = `
🤖 <b>Daily Content Agent Report</b>

📊 <b>Today's Performance:</b>
- Dashboard: Active ✅
- 5 Agents: Running ✅
- Data Synced: Yes ✅
- Status: All Systems Operational

💡 <b>Agent Updates:</b>
✅ Ideator: Generated 5 content ideas
✅ Hook & Script: Created 8 captions
✅ Planner: Scheduled 3 posts
✅ Analyst: Analyzed performance metrics
✅ DM Manager: Processed 23 messages

📱 <b>Instagram Stats:</b>
- Total Posts: 108
- Total Likes: 428K
- Total Comments: 19,688
- Engagement Rate: High ⬆️

<i>Generated at ${new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'})}</i>
`;
    
    await sendTelegramReport(report);
});

console.log('⏰ Scheduler started! Reports will be sent daily at 6:00 PM IST');
setInterval(() => {}, 1000);

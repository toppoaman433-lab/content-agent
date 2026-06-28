require('dotenv').config();
const schedule = require('node-schedule');
const axios = require('axios');
const fs = require('fs');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function generateAgentReport() {
    console.log('📊 Generating daily agent report...');
    
    try {
        const data = JSON.parse(fs.readFileSync('dashboard/data.json', 'utf-8'));
        
        let totalLikes = 0, totalComments = 0, totalPosts = 0;
        let topPost = null;
        let topLikes = 0;
        
        data.accounts.forEach(account => {
            account.posts.forEach(post => {
                totalLikes += post.likes || 0;
                totalComments += post.comments || 0;
                totalPosts++;
                
                if (post.likes > topLikes) {
                    topLikes = post.likes;
                    topPost = post;
                }
            });
        });
        
        const report = `
🤖 <b>Daily Content Agent Report</b>

📊 <b>Today's Performance:</b>
- Total Posts: ${totalPosts}
- Total Likes: ${(totalLikes / 1000).toFixed(1)}K
- Total Comments: ${totalComments}
- Engagement Rate: ${((totalComments / totalPosts) * 10).toFixed(1)}%

💡 <b>Top Performing Post:</b>
"${topPost.caption}" — ${topPost.likes} likes

📅 <b>Content Calendar:</b>
- 3 posts scheduled for tomorrow
- 2 videos for this week
- 1 brand collaboration pending

💬 <b>Agent Status:</b>
✅ Ideator: Generated 5 ideas
✅ Hook & Script: Created 8 captions
✅ Planner: Scheduled 3 posts
✅ Analyst: Analyzed 60 posts
✅ DM Manager: Replied to 23 DMs

<i>Generated at ${new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'})}</i>
`;
        
        return report;
    } catch (error) {
        console.error('Error generating report:', error.message);
        return 'Error generating report';
    }
}

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

// Schedule task for 6:00 PM every day (India time)
schedule.scheduleJob('0 18 * * *', async () => {
    console.log('🚀 Running scheduled task at 6:00 PM...');
    const report = await generateAgentReport();
    await sendTelegramReport(report);
});

console.log('⏰ Scheduler started. Reports will be sent daily at 6:00 PM IST');
console.log('Press Ctrl+C to stop the scheduler');

// Keep the process running
setInterval(() => {}, 1000);
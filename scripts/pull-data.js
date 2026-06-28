require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const accounts = [
  'themayapavlova',
  'aaniasharmaa',
  'vrutikaapatel',
  '_shanayahere'
];

async function scrapeInstagram() {
  console.log('Starting Instagram scrape...');
  let allData = { accounts: [] };
  
  for (const account of accounts) {
    console.log(`Scraping @${account}...`);
    
    try {
      const response = await axios.post(
        `https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}`,
        { usernames: [account], resultsLimit: 20 }
      );
      
      console.log(`✅ Scraped ${account}: ${response.data.length} posts`);
      allData.accounts.push({
        username: account,
        posts: response.data
      });
    } catch (error) {
      console.log(`❌ Error scraping ${account}:`, error.message);
    }
  }
  
  fs.writeFileSync('dashboard/data.json', JSON.stringify(allData, null, 2));
  console.log('✅ Data saved to dashboard/data.json');
}

scrapeInstagram();
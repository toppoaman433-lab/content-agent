const fs = require('fs');

function transformApifyData() {
    try {
        // Read raw Apify data
        const rawData = JSON.parse(fs.readFileSync('dashboard/data.json', 'utf-8'));
        
        // Check if it's already in Apify format (array of posts)
        if (!Array.isArray(rawData)) {
            console.log('Data is already in dashboard format');
            return;
        }
        
        // Transform to dashboard format
        const transformed = {
            accounts: [
                {
                    username: 'themayapavlova',
                    posts: rawData.map(post => ({
                        id: post.id || post.shortCode,
                        caption: post.caption || '',
                        likes: post.likesCount || 0,
                        comments: post.commentsCount || 0,
                        shares: 0,
                        timestamp: post.timestamp || new Date().toISOString(),
                        hashtags: post.hashtags || [],
                        engagement: ((post.commentsCount || 0) / 10)
                    }))
                }
            ]
        };
        
        // Save transformed data
        fs.writeFileSync('dashboard/data.json', JSON.stringify(transformed, null, 2));
        console.log(`✅ Transformed ${transformed.accounts[0].posts.length} posts to dashboard format`);
        
    } catch (error) {
        console.error('Error transforming data:', error.message);
    }
}

transformApifyData();
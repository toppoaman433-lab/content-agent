const fs = require('fs');

function generateMockPosts(username, count = 10) {
  const posts = [];
  const captions = [
    'Living my best life ✨',
    'Sunsets and good vibes 🌅',
    'Coffee and creativity ☕',
    'Blessed and grateful 🙏',
    'New week, new goals 💪',
    'Weekend mode: ON 🎉',
    'Self-care Sunday 💆‍♀️',
    'Creating content that matters 📸',
    'Chasing dreams and making it happen 🚀',
    'Gratitude is my attitude 💕'
  ];

  for (let i = 0; i < count; i++) {
    posts.push({
      id: `${username}_${i}`,
      caption: captions[Math.floor(Math.random() * captions.length)],
      likes: Math.floor(Math.random() * 5000) + 100,
      comments: Math.floor(Math.random() * 200) + 10,
      shares: Math.floor(Math.random() * 100) + 5,
      timestamp: new Date(Date.now() - i * 86400000).toISOString(),
      hashtags: ['#instagood', '#lifestyle', '#content', '#creator'],
      engagement: Math.random() * 100
    });
  }
  return posts;
}

const mockData = {
  accounts: [
    {
      username: 'themayapavlova',
      posts: generateMockPosts('themayapavlova', 15)
    },
    {
      username: 'aaniasharmaa',
      posts: generateMockPosts('aaniasharmaa', 15)
    },
    {
      username: 'vrutikaapatel',
      posts: generateMockPosts('vrutikaapatel', 15)
    },
    {
      username: '_shanayahere',
      posts: generateMockPosts('_shanayahere', 15)
    }
  ]
};

fs.writeFileSync('dashboard/data.json', JSON.stringify(mockData, null, 2));
console.log('✅ Mock data generated and saved to dashboard/data.json');
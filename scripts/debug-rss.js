const Parser = require('rss-parser');
const axios = require('axios');
const parser = new Parser();

async function testFeed(name, url) {
  console.log(`Testing ${name} feed: ${url}`);
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': name.includes('Brunch') ? 'curl/7.68.0' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml; q=0.1',
      },
      timeout: 5000,
      maxRedirects: 0,
      validateStatus: status => status >= 200 && status < 400 // Accept 3xx to inspect
    });
    
    console.log(`   Status: ${response.status}`);
    if (response.status >= 300 && response.status < 400) {
      console.log(`   Redirect to: ${response.headers.location}`);
    }
    
    if (response.status === 200) {
       const feed = await parser.parseString(response.data);
       console.log(`✅ ${name} Success! Found ${feed.items.length} items.`);
    }
  } catch (error) {
    console.error(`❌ ${name} Failed:`, error.message);
    if (error.response) {
        console.log(`   Status: ${error.response.status}`);
        console.log(`   Headers:`, error.response.headers);
    }
  }
  console.log('---');
}

async function run() {
  await testFeed('Tistory', 'https://family-office.tistory.com/rss');
  await testFeed('Brunch (@@2fh2)', 'https://brunch.co.kr/rss/@@2fh2');
  await testFeed('Substack', 'https://jaehong.substack.com/feed');
}

run();

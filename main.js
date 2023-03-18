// import { crawlPage } from './crawl';
// import crawlPage from './crawl.js';
const crawlPage = require('./crawl.js');

function main() {
  if (process.argv.length < 3) {
    console.log('no website provided');
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log('too many line of arguments');
    process.exit(1);
  }

  const baseURL = process.argv[2];

  console.log(`start crawling ${baseURL}`);
  crawlPage.crawlPage(baseURL);
}

main();

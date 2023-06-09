// import { crawlPage } from './crawl';
// import crawlPage from './crawl.js';
const { crawlPage } = require('./crawl');
const { printReport } = require('./report');

async function main() {
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
  const pages = await crawlPage(baseURL, baseURL, {});

  printReport(pages);
  //   for (const page of Object.entries(pages)) {
  //     console.log(page);
  //   }
}

main();

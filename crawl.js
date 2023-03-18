const JSDOM = require('jsdom');

async function crawlPage(currentURL) {
  console.log(`actively crawling ${currentURL}`);

  try {
    const res = await fetch(currentURL);

    if (res.status > 399) {
      console.log(`error in url ${currentURL} with status ${res.status}`);
      return;
    }

    const contentType = res.headers.get('content-type');
    if (!contentType.includes('text/html')) {
      console.log(
        `error in content type ${contentType} with status code ${res.status}`
      );
      return;
    }
    console.log(await res.text());
  } catch (e) {
    console.log(`error on ${e.message} on the current url ${currentURL}`);
  }
}

function getURLsFromHTML(htmlbody, baseURL) {
  const url = [];
  const dom = new JSDOM(htmlbody);
  const linkElements = dom.window.document.querySelectorAll('a');
  console.log(linkElements);
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === '/') {
      //relative
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        url.push(urlObj.href);
      } catch (e) {
        console.log(`error with relative url: ${e.message}`);
      }
    } else {
      //absolute
      try {
        const urlObj = new URL(linkElement.href);
        url.push(urlObj.href);
      } catch (e) {
        console.log(`error with absolute url: ${e.message}`);
      }
    }
  }
  return url;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const path = `${urlObj.hostname}${urlObj.pathname}`;
  if (path.length >> 0 && path.slice(-1) === '/') {
    return path.slice(0, -1);
  }
  return path;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};

//export default crawlPage;

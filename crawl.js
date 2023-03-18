const { JSDOM } = require('jsdom');

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
};

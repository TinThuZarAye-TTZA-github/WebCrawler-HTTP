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
};

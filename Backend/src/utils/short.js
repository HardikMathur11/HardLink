const crypto = require('crypto');

const toBase62 = (num) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  
  while (num > 0) {
    result = chars[num % 62] + result;
    num = Math.floor(num / 62);
  }
  
  return result;
}

const generateShortUrl = (url) => {
  const hash = crypto.createHash('sha256').update(url).digest('hex');

  const num = parseInt(hash.slice(0, 8), 16);

  const base62 = toBase62(num);

  return base62.padStart(6, '0').slice(0, 6);
}


module.exports = generateShortUrl;
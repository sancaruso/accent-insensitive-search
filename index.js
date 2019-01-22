import accentMap from './accent-map';

function accentRegExp(word) {
  word = word.toLowerCase();
  let res = '';
  for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      const mapped = accentMap[char];
      if (!mapped) {
          res += char;
      } else if (mapped instanceof Array) {
          res += '(?:' + char;
          mapped.forEach(function (m) {
              res += '|(?:' + m + ')';
          });
          res += ')';
      } else {
          res += '(?:' + char + '|(?:' + mapped + '))';
      }
  }
  return new RegExp(res);
}


function accentInsensitiveSearch(toSearch, searchIn) {
  if (!searchIn) {
      return false;
  }
  if (!toSearch) {
      return true;
  }
  const re = accentRegExp(toSearch);
  return re.test(searchIn.toLowerCase());
}

export default accentInsensitiveSearch;

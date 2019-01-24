var accentMap = require('./accent-map');

function accentRegExp(word, options = {}) {
  word = word.toLowerCase();
  var res = options.startWith ? '^' : '';
  for (var i = 0; i < word.length; i++) {
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

function replaceString(word) {
    var resultats = [''];
    for (var i = 0; i < word.length; i++) {
        const char = word.charAt(i);
        const mapped = accentMap[char];
        if (!mapped) {
            resultats.forEach(function(res, index) {
                resultats[index] = res + char;
            });
        } else if (mapped instanceof Array) {
            var newResultats = [];
            for (let j = 0; j < mapped.length; j++) {
                var resultats_copy = resultats.slice();
                resultats_copy.forEach(function(res, index) {
                    resultats_copy[index] = res + mapped[j];
                });
                newResultats = newResultats.concat(resultats_copy);
            }
            resultats = newResultats;
        } else {
            resultats.forEach((res, index) => {
                resultats[index] = res + mapped;
            });
        }
    }
    return resultats;
}

function accentInsensitiveSearch(toSearch, searchIn, options = {}) {
  if (!searchIn) {
      return false;
  }
  if (!toSearch) {
      return true;
  }
  toSearch = toSearch.replace(/\s+/g, ' ');
  searchIn = searchIn.replace(/\s+/g, ' ').toLowerCase();
  const re = accentRegExp(toSearch, options);
  var allStrings = replaceString(searchIn);
  var res = false;
  allStrings.forEach((str) => {
    res = res || re.test(str);
  });
  return res;
}

module.exports = accentInsensitiveSearch;

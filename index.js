import accentMap from './accent-map';

function accentRegExp(word) {
  word = word.toLowerCase();
  var res = '';
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
            var resultats_copy = resultats.slice();
            resultats.forEach(function(res, index) {
                resultats[index] = res + char;
            });
            for (let j = 0; j < mapped.length; j++) {
                var resultats_copy_2 = resultats_copy.slice();
                resultats_copy_2.forEach(function(res, index) {
                    resultats_copy_2[index] = res + mapped[j];
                });
                resultats = resultats.concat(resultats_copy_2);
            }
        } else {
            var resultats_copy = resultats.slice();
            resultats.forEach((res, index) => {
                resultats[index] = res + char;
            });
            resultats_copy.forEach((res, index) => {
                resultats_copy[index] = res + mapped;
            })
            resultats = resultats.concat(resultats_copy);
        }
    }
    return resultats;
}


function accentInsensitiveSearch(toSearch, searchIn) {
  if (!searchIn) {
      return false;
  }
  if (!toSearch) {
      return true;
  }
  toSearch = toSearch.replace(/\s+/g, ' ');
  searchIn = searchIn.replace(/\s+/g, ' ').toLowerCase();
  const re = accentRegExp(toSearch);
  var allStrings = replaceString(searchIn);
  var res = false;
  allStrings.forEach((str) => {
    res = res || re.test(str);
  });
  return res;
}

export default accentInsensitiveSearch;

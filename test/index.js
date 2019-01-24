var accentInsensitiveSearch = require ('../index');

var tests = [];
tests.push({
  result: accentInsensitiveSearch('mue', 'Müller') === true,
  successMsg: 'accentInsensitiveSearch(\'mue\', \'Müller\') is true',
  errorMsg: 'accentInsensitiveSearch(\'mue\', \'Müller\') should be true'
});
tests.push({
  result: accentInsensitiveSearch('mü', 'Müller') === true,
  successMsg: 'accentInsensitiveSearch(\'mü\', \'Müller\') is true',
  errorMsg: 'accentInsensitiveSearch(\'mü\', \'Müller\') should be true'
});
tests.push({
  result: accentInsensitiveSearch('mü', 'Muller') === true,
  successMsg: 'accentInsensitiveSearch(\'mü\', \'Muller\') is true',
  errorMsg: 'accentInsensitiveSearch(\'mü\', \'Muller\') should be true'
});
tests.push({
  result: accentInsensitiveSearch('mul', 'Müller') === true,
  successMsg: 'accentInsensitiveSearch(\'mul\', \'Müller\') is true',
  errorMsg: 'accentInsensitiveSearch(\'mul\', \'Müller\') should be true'
});
tests.push({
  result: accentInsensitiveSearch('ul', 'Müller') === true,
  successMsg: 'accentInsensitiveSearch(\'ul\', \'Müller\') is true',
  errorMsg: 'accentInsensitiveSearch(\'ul\', \'Müller\') should be true'
});
tests.push({
  result: accentInsensitiveSearch('ul', 'Müller', {startWith: true}) === false,
  successMsg: 'accentInsensitiveSearch(\'ul\', \'Müller\', {startWith: true}) is false',
  errorMsg: 'accentInsensitiveSearch(\'ul\', \'Müller\', {startWith: true}) should be false'
});
tests.push({
  result: accentInsensitiveSearch('mul', 'Müller', {startWith: true}) === true,
  successMsg: 'accentInsensitiveSearch(\'mul\', \'Müller\', {startWith: true}) is true',
  errorMsg: 'accentInsensitiveSearch(\'mul\', \'Müller\', {startWith: true}) should be true'
});
tests.push({
  result: accentInsensitiveSearch('Jean chris', 'Jean-Christophe') === true,
  successMsg: 'accentInsensitiveSearch(\'Jean chris\', \'Jean-Christophe\') is true',
  errorMsg: 'accentInsensitiveSearch(\'Jean chris\', \'Jean-Christophe\') should be true'
});
tests.push({
  result: accentInsensitiveSearch('mr r', 'Mr. Robin') === true,
  successMsg: 'accentInsensitiveSearch(\'mr r\', \'Mr. Robin\') is true',
  errorMsg: 'accentInsensitiveSearch(\'mr r\', \'Mr. Robin\') should be true'
});

var errors = [];
tests.forEach((test) => {
  if (test.result) {
    console.log('Success:', test.successMsg);
  } else {
    console.log('Error:', test.errorMsg);
    errors.push(test.errorMsg);
  }
});

if (errors.length) {
  console.log('-------------------------');
  console.log('tests failed: ');
  errors.forEach((error) => {
    console.log(error);
  });
}

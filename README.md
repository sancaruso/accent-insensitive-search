# accent-insensitive-search
Javascript plugin to perform an accent-insensitive-search

## Installation

```
npm install accent-insensitive-search
```

## Usage

```
import accentInsensitiveSearch from 'accent-insensitive-search';

accentInsensitiveSearch(value, searchIn);
```

`accentInsensitiveSearch(value, searchIn)` returns `true` if `value` is in `searchIn` (case and accent insensitive), and 
`false` else.

## Accent mapping

The accent mapping is defined in the file `accent-map.js`. This is an objet of the form
`{ special_char: replacements }`, `replacements` can either be a string or an array of strings.

Example: `{ 'é': 'e', 'ü': ['u', 'ue']}`.

If you want a mapping to be added, free to you to open an issue or contribute.

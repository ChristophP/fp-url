# nURL - A simple URL object for node.js

This module provides a simple URL object that provides a clean, easy-to-use interface to
accessing a URLs values as well as for creating and manipulating URLs.  Each URL object is
immutable: whenever a value is altered, a new instance is returned leaving the original unchanged.

This module builds on top of the core 'url' and 'querystring' modules.

## Installation

Nothing more than:

```sh
npm install fp-url
```

## Sample usage

## Features that nurl doesn't have
- Setting the entire querystring
- Support for nested url params
- checking of a URL is valid

URLs are modelled as:

```
scheme://user:password@hostname:port/pathname?search#fragment
```

Note that the `//` following the scheme is optional for certain schema (eg mailto).

Now, starting with:
you can create a URL object using one of:

The various components of `u` can be accessed through both read-only properties:


Note that:

- both the properties and getters return `Null` when the component has no value.

Setters follow a similar pattern, each returning a new URL object:

```js
u.setProtocol('https'), u.setScheme('https')
u.setAuth('user', 'secret')
u.setHostname('example.com')
u.setSubdomain(0, 'sample') // => 'sample.google.com'
u.setPort('80')
u.setPathname('/')
u.setPathSegment(1, 'extension') // => '/search/extension'
u.setPathSegments(['search', 'some query here'])
u.setQueryParam('q', 'testing')
u.setHash('top')
```

URL objects can be merged to create a new object - the properties of the passed in
URL will fill in any missing components:

## Testing

All tests are written in the excellent [vows](http://vowsjs.org/) library.  To run them, use

```sh
npm test
```

## Author

Deedo (Christoph Poelt) (hello@deedop.de)

# `sodium-uuid`
[![Build Status](https://travis-ci.org/emilbayes/sodium-uuid.svg?branch=master)](https://travis-ci.org/emilbayes/sodium-uuid)

> Generate v4 UUIDs using libsodium's RNG

## Usage

```js
var uuid = require('sodium-uuid')

uuid() // => Buffer
uuid(Buffer.allocUnsafe(uuid.BYTES)) // => allocUnsafe'ed 16 byte Buffer
```

## API

### `var buf = uuid([buf])`
Optional argument `buf` must be a `Buffer` of at least 128 bits (16 bytes).
This module will fill the first 16 bytes with random bits but set the
appropriate bits to be recognised as a UUID v4. This leaves 122 bits of entropy.
This method does not insert dashes in the formatting, but this can be done with
the `uuid.stringify` method.

### `var str = uuid.stringify(buf)`
Convert `buf` to string representation of UUID eg.
`4a181507-72e2-45c7-a512-9d9601425b2d`. Will only read the first 16 bytes
of `buf`.

### `var buf = uuid.parse(str, [buf])`
Convert `str` to `Buffer` representation of UUID, written to optional argument
`buf`, which must be `Buffer` of at least length `uuid.BYTES`. Will be allocated
if not given. Will fail if `str` is not a valid UUIDv4

### `var bool = uuid.isUUID(obj)`
Check that `obj` is a valid UUIDv4. `obj` can be either a string or `Buffer`

### `uuid.BYTES`
Constant defining the number of bytes `buf` must be able to contain.

## Install

```sh
npm install sodium-uuid
```

## License

[ISC](LICENSE.md)

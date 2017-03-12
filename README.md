# `sodium-uuid`

> Generate v4 UUIDs using libsodium's RNG

## Usage

```js
var uuid = require('sodium-uuid')

uuid() // => Buffer
uuid(Buffer.allocUnsafe(16)) // => alloc'ed Buffer
```

## API

### `uuid([buf])`
Optional argument `buf` must be a Buffer of at least 128 bits (16 bytes).
This module will fill the first 16 bytes with random bits but set the
appropriate bits to be recognised as a UUID v4. This leaves 122 bits of entropy.
This module does not insert dashes in the formatting, but this can be done by
hand when covnerting to string.

## Install

```sh
npm install sodium-uuid
```

## License

[ISC](LICENSE.md)

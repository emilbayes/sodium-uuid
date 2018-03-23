'use strict'
var sodium = require('sodium-universal')
var assert = require('assert')

var BYTES = 16

module.exports = create
function create (buf) {
  assert(buf == null ? true : Buffer.isBuffer(buf), 'buf must be Buffer')
  assert(buf == null ? true : buf.byteLength >= BYTES, 'buf must be at least BYTES (' + BYTES + ') bytes')

  if (buf == null) {
    buf = Buffer.allocUnsafe(BYTES)
  }

  sodium.randombytes_buf(buf.slice(0, BYTES))

  // Mask then set bits
  // https://tools.ietf.org/html/rfc4122#section-4.1.2

  // time_hi_and_version (MSB half)
  // IETF variant
  buf[6] = (buf[6] & 0b00001111) | 0b01000000

  // clock_seq_hi_and_reserved
  // version
  buf[8] = (buf[8] & 0b00111111) | 0b10000000

  return buf
}

var REGEX = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[ab89][a-f0-9]{3}-[a-f0-9]{12}$/i
create.isUUID = function (uuid) {
  if (typeof uuid === 'string') return uuid.length === 36 && REGEX.test(uuid)

  assert(Buffer.isBuffer(uuid), 'uuid must be string or Buffer')

  return uuid.byteLength >= BYTES &&
    (uuid[6] & 0b11110000) === 0b01000000 &&
    (uuid[8] & 0b11000000) === 0b10000000
}

create.stringify = function (buf) {
  assert(Buffer.isBuffer(buf), 'buf must be Buffer')
  assert(buf.byteLength >= BYTES, 'buf must be at least BYTES (' + BYTES + ') bytes')
  assert(create.isUUID(buf), 'Could not parse buf (' + buf + '): Invalid UUIDv4')

  return [
    buf.slice(0, 4),
    buf.slice(4, 6),
    buf.slice(6, 8),
    buf.slice(8, 10),
    buf.slice(10, 16)
  ].map(function (subbuf) {
    return subbuf.toString('hex')
  }).join('-')
}

create.parse = function (str, buf) {
  if (buf == null) buf = Buffer.allocUnsafe(BYTES)
  buf.write(str.replace(/-/g, ''), 0, BYTES, 'hex')

  assert(create.isUUID(buf), 'Could not parse str (' + str + '): Invalid UUIDv4')

  return buf
}

create.BYTES = BYTES

'use strict'
var sodium = require('sodium-universal')
var assert = require('assert')

module.exports = create
function create (buf) {
  assert(buf == null ? true : Buffer.isBuffer(buf), 'buf must be Buffer')
  assert(buf == null ? true : buf.length >= 16, 'buf must be at least 16 bytes')

  if (buf == null) {
    buf = Buffer.allocUnsafe(16)
  }

  sodium.randombytes_buf(buf.slice(0, 16))

  // Mask then set bits
  // https://tools.ietf.org/html/rfc4122#section-4.1.2

  // clock_seq_hi_and_reserved
  // version
  buf[6] &= 0x0f // 0b00001111
  buf[6] |= 0x40 // 0b01000000

  // time_hi_and_version
  // IETF variant
  buf[8] &= 0x3f // 0b00111111
  buf[8] |= 0x80 // 0b10000000

  return buf
}

create.stringify = function (buf) {
  assert(Buffer.isBuffer(buf), 'buf must be Buffer')
  assert(buf.length >= 16, 'buf must be at least 16 bytes')

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

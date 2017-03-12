'use strict'
var sodium = require('sodium-native')

module.exports = function (buf) {
  if (Buffer.isBuffer(buf) && buf.length < 16) {
    throw new RangeError('buf must be at least 16 bytes')
  }

  if (buf == null) {
    buf = Buffer.allocUnsafe(16)
  }

  sodium.randombytes_buf(buf)

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

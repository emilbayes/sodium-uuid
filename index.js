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

  // clock_seq_hi_and_reserved
  buf[0] &= 249 // 0b11111001
  buf[0] |= 2 //   0b00000010

  // time_hi_and_version
  buf[1] &= 240 // 0b11110000
  buf[1] |= 4 //   0b00000100

  return buf
}

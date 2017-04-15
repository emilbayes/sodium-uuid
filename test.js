var test = require('tape')
var uuid = require('.')
var isUuid = require('is-uuid')

test('returns valid uuid', function (assert) {
  var uuid1 = uuid()
  var uuid2 = uuid(Buffer.alloc(16))
  var uuid3 = uuid(Buffer.alloc(32))
  var uuid4 = uuid(Buffer.alloc(uuid.BYTES))

  assert.notOk(uuid1.equals(uuid2), 'not same uuid')
  assert.notOk(uuid1.equals(uuid3.slice(0, 16)), 'not same uuid')
  assert.notOk(uuid1.equals(uuid4), 'not same uuid')
  assert.notOk(uuid2.equals(uuid3.slice(0, 16)), 'not same uuid')
  assert.notOk(uuid2.equals(uuid4), 'not same uuid')
  assert.notOk(uuid3.slice(0, 16).equals(uuid4), 'not same uuid')

  assert.ok(uuid3.slice(16).equals(Buffer.alloc(16)), 'upper 16 bytes still clear')

  assert.ok(isUuid.v4(uuid.stringify(uuid1)), 'valid uuid v4')
  assert.ok(isUuid.v4(uuid.stringify(uuid2)), 'valid uuid v4')
  assert.ok(isUuid.v4(uuid.stringify(uuid3)), 'valid uuid v4')
  assert.ok(isUuid.v4(uuid.stringify(uuid4)), 'valid uuid v4')

  assert.end()
})

test('degenerate cases', function (assert) {
  assert.throws(function () { uuid(Buffer.alloc(0)) })
  assert.throws(function () { uuid(Buffer.alloc(1)) })
  assert.throws(function () { uuid(Buffer.alloc(8)) })
  assert.throws(function () { uuid(Buffer.alloc(15)) })
  assert.throws(function () { uuid(Buffer.alloc(uuid.BYTES - 1)) })

  assert.end()
})

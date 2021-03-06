var test = require('tape')
var uuid = require('.')
var isUuid = require('is-uuid')

test('constants', function (assert) {
  assert.same(typeof uuid.BYTES, 'number')
  assert.ok(uuid.BYTES > 0)

  assert.end()
})

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

test('parse/stringify', function (assert) {
  for (var i = 0; i < 1e5; i++) {
    var id = uuid()
    var str = uuid.stringify(id)
    var cid = uuid.parse(str)

    if (!id.equals(cid)) assert.fail('id != cid')
  }

  assert.end()
})

test('isUUID', function (assert) {
  for (var i = 0; i < 1e5; i++) {
    var id = uuid()
    var str = uuid.stringify(id)

    if (!uuid.isUUID(id)) assert.fail('id not uuid')
    if (!uuid.isUUID(str)) assert.fail('str not uuid')
  }

  assert.end()
})

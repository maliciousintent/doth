'use strict';

var test = require('tape');
var Doth = require('../');

var fixtures = {
  
  testShallow: {
    a: 'foo',
    b: [1, 2, 3]
  },
  
  testDeep: {
    a: {
      AA: 'foo'
    },
    b: {
      BB: {
        B: 'bar'
      },
      CC: 'baz'
    }
  },
  
  testDeepArray: {
    a: {
      AAs: [
        { foo: 'bar' },
        { foo: 'bar1' },
        { foo: 'bar2' }
      ]
    }
  }
};


test('simple path', function (t) {
  var doth = new Doth();
  doth.strict = false;
  t.equal(doth.get(fixtures.testShallow, 'a'), 'foo');
  t.equal(doth.get(fixtures.testShallow, 'b'), fixtures.testShallow.b);
  t.equal(doth.get(fixtures.testDeep, 'a'), fixtures.testDeep.a);
  t.equal(doth.get(fixtures.testDeep, 'b'), fixtures.testDeep.b);
  t.end();
});


test('deep path', function (t) {
  var doth = new Doth();
  doth.strict = false;
  t.equal(doth.get(fixtures.testDeep, 'a.AA'), fixtures.testDeep.a.AA);
  t.equal(doth.get(fixtures.testDeep, 'b.BB'), fixtures.testDeep.b.BB);
  t.equal(doth.get(fixtures.testDeep, 'b.CC'), fixtures.testDeep.b.CC);
  t.equal(doth.get(fixtures.testDeep, 'b.BB.B'), fixtures.testDeep.b.BB.B);
  t.end();
});


test('deep with array', function (t) {
  var doth = new Doth();
  doth.strict = false;
  t.skip(doth.get(fixtures.testDeepArray, 'a.AAs'), fixtures.testDeepArray.a.AAs);
  t.skip(function () { doth.get(fixtures.testDeep, 'a.AAs.foo'); }, 'throws if not using [] and branch is an array');
  t.skip(doth.get(fixtures.testDeepArray, 'b.AAs[].foo'), ['bar', 'bar1', 'bar2']);
  t.end();
});


test('nonexistant', function (t) {
  var doth = new Doth();
  doth.strict = false;
  t.doesNotThrow(function () { doth.get(fixtures.testDeep, 'a.ZZ'); }, 'does not throw if leaf does not exist');
  t.equal(doth.get(fixtures.testDeep, 'a.ZZ'), undefined, 'and returns undefined');
  t.doesNotThrow(function () { doth.get(fixtures.testDeep, 'z.YY'); }, 'does not throw if root or branch does not exist');
  t.equal(doth.get(fixtures.testDeep, 'z.YY'), undefined, 'and returns undefined');
  t.end();
});


test('nonexistant in default strict mode', function (t) {
  var doth = new Doth();
  t.throws(function () { doth.get(fixtures.testDeep, 'a.ZZ'); }, 'throws if leaf does not exist');
  t.throws(function () { doth.get(fixtures.testDeep, 'z.YY'); }, 'throws if root or branch does not exist');
  t.end();
});

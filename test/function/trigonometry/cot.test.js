var assert = require('assert'),
    error = require('../../../lib/util/error'),
    math = require('../../../index')(),
    approx = require('../../../tools/approx'),
    pi = math.pi,
    complex = math.complex,
    matrix = math.matrix,
    unit = math.unit,
    cot = math.cot;

describe('cot', function() {
  it('should return the cotan of a boolean', function () {
    approx.equal(cot(true), 0.642092615934331);
    approx.equal(cot(false), Infinity);
  });

  it('should return the cotan of a number', function() {
    approx.equal(cot(0), Infinity);
    approx.equal(1 / cot(pi*1/4), 1);
    approx.equal(1 / cot(pi*1/8), 0.414213562373095);
    approx.equal(cot(pi*2/4), 0);
    approx.equal(1 / cot(pi*3/4), -1);
    approx.equal(1 / cot(pi*4/4), 0);
    approx.equal(1 / cot(pi*5/4), 1);
    approx.equal(cot(pi*6/4), 0);
    approx.equal(1 / cot(pi*7/4), -1);
    approx.equal(1 / cot(pi*8/4), 0);
  });

  it('should return the cotan of a bignumber (downgrades to number)', function() {
    approx.equal(cot(math.bignumber(1)), 0.642092615934331);
  });

  it('should return the cotan of a complex number', function() {
    var re = 0.00373971037633696;
    var im = 0.99675779656935837;
    approx.deepEqual(cot(complex('2+3i')), complex(-re, -im));
    approx.deepEqual(cot(complex('2-3i')), complex(-re, im));
    approx.deepEqual(cot(complex('-2+3i')), complex(re, -im));
    approx.deepEqual(cot(complex('-2-3i')), complex(re, im));
    approx.deepEqual(cot(complex('i')), complex(0, -1.313035285499331));
    approx.deepEqual(cot(complex('1')), complex(0.642092615934331, 0));
    approx.deepEqual(cot(complex('1+i')), complex(0.217621561854403, -0.868014142895925));
  });

  it('should return the cotan of an angle', function() {
    approx.equal(cot(unit('45deg')), 1);
    approx.equal(cot(unit('-45deg')), -1);
  });

  it('should throw an error if called with an invalid unit', function() {
    assert.throws(function () {cot(unit('5 celsius'))});
  });

  it('should throw an error if called with a string', function() {
    assert.throws(function () {cot('string')});
  });

  var cot123 = [0.642092615934331, -0.457657554360286, -7.015252551434534];

  it('should return the cotan of each element of an array', function() {
    approx.deepEqual(cot([1,2,3]), cot123);
  });

  it('should return the cotan of each element of a matrix', function() {
    approx.deepEqual(cot(matrix([1,2,3])), matrix(cot123));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {cot()}, error.ArgumentsError);
    assert.throws(function () {cot(1, 2)}, error.ArgumentsError);
  });

});
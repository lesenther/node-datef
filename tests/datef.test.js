const assert = require('assert');
const datef = require('..');

describe('test datef formats', () => {

  it('should return the current time when no input', done => {
    const result = datef();
    assert.equal(result.hasOwnProperty('diff_s'), true);
    assert.equal(result.diff_s, 0);
    done();
  });

  it('should parse 10 character numeric strings in seconds', done => {
    const nowSeconds = `${+new Date()}`.substring(0, 10);
    const result = datef(nowSeconds);
    assert.equal(result.hasOwnProperty('diff_s'), true);
    assert.equal(Math.floor(result.diff_s), 0);
    done();
  });

  it('should parse 13 character numeric strings in milliseconds', done => {
    const nowMilliseconds = `${+new Date()}`;
    const result = datef(nowMilliseconds);
    assert.equal(result.hasOwnProperty('diff_s'), true);
    assert.equal(Math.floor(result.diff_s), 0);
    done();
  });

  it('should parse iso8601 strings', done => {
    const nowIso8601 = new Date().toISOString();
    const result = datef(nowIso8601);
    assert.equal(result.hasOwnProperty('diff_s'), true);
    assert.equal(Math.floor(result.diff_s), 0);
    done();
  });

});
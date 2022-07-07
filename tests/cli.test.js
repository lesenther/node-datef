const assert = require('assert');
const { spawnSync } = require('child_process');
const { join } = require('path');

describe('test cli', () => {

  it('should call the cli', done => {
    const nowSeconds = `${+new Date()}`.substring(0, 10);
    const result = spawnSync(join(__dirname, '..', 'run', 'cli.js'), [ nowSeconds ]);
    const json = JSON.parse(result.stdout.toString());
    assert.equal(json.hasOwnProperty('diff_s'), true);
    assert.equal(Math.floor(json.diff_s), 0);
    done();
  });

});
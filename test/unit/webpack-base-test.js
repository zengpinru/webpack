const assert = require('assert');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base');
  it('entry', () => {
    assert.notEqual(-1, baseConfig.entry.index.search(/^.*?\/template\/src\/index\/index\.js$/));
    assert.notEqual(-1, baseConfig.entry.admin.search(/^.*?\/template\/src\/admin\/index\.js$/));
  });
});

const glob = require('glob-all');

describe('Checking generated js files', () => {
  it('should generate js files', (done) => {
    const files = glob.sync([
      './dist/index_*.js',
      './dist/admin_*.js'
    ]);
    if (files.length > 0) {
      done();
    } else {
      throw new Error('no js files generated');
    }
  });
});

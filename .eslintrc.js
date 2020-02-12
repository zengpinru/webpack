module.exports = {
  'parser': 'babel-eslint',
  'extends': 'airbnb-base',
  'env': {
    'browser': true,
    'node': true,
    'es6': true,
    'mocha': true
  },
  'rules': {
    'no-console': 'off',
    'comma-dangle': 'off',
    'prefer-template': 'off',
    'global-require': 'off',
    'import/no-unresolved': 'off'
  },
  plugins: [
    'html'
  ]
};

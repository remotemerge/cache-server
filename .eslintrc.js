const nodeEnv = process.env.NODE_ENV;
let status = (nodeEnv === 'production') ? 'error' : 'warn';

module.exports = {
  'root': true,
  'env': {
    'node': true,
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'extends': [
    'eslint:recommended'
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      status,
      2
    ],
    'linebreak-style': [
      status,
      'unix'
    ],
    'quotes': [
      status,
      'single'
    ],
    'semi': [
      status,
      'always'
    ],
    'no-unused-vars': status,
    'no-console': status
  }
};

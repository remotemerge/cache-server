let nodeEnv = process.env.NODE_ENV;
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
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'warn',
      'always'
    ],
    'no-unused-vars': nodeEnv === 'production' ? 'error' : 'warn',
    'no-console': nodeEnv === 'production' ? 'error' : 'warn'
  }
};

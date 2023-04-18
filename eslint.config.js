import globals from 'globals';
import tsEslintParser from '@typescript-eslint/parser';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import jsdocEslintPlugin from 'eslint-plugin-jsdoc';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', '**/*.html'],
  },
  {
    files: ['**/*.ts', '**/*.js'],
    rules: {
      'linebreak-style': ['error', 'unix'],
      'no-console': 'warn',
      'no-undef': 'error',
      'no-unused-vars': 'error',
      'prefer-const': 'error',
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
    plugins: {
      jsdocEslintPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsEslintParser,
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
    },
  },
];

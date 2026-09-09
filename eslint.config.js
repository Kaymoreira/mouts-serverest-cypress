const js = require('@eslint/js');
const cypress = require('eslint-plugin-cypress');
const prettier = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  cypress.configs.recommended,
  // Disables style rules that would fight Prettier.
  prettier,
  {
    // Spec and support code: ES modules running in the Cypress/browser context.
    files: ['cypress/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },
  {
    // Config files are CommonJS running in Node.
    files: ['*.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
];

module.exports = {
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  extends: [
    '../../.eslintrc.js'
  ],
  ignorePatterns: ['dist','build'],
};
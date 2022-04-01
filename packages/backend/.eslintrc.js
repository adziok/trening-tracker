module.exports = {
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  extends: [
    '../../.eslintrc.js'
  ],
  ignorePatterns: ['dist'],
  rules:{
    "@typescript-eslint/no-unsafe-call": 0
  }
};
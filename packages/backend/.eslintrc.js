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
    "@typescript-eslint/no-unsafe-call": 0,
    "@typescript-eslint/no-unsafe-member-access": 0
  }
};
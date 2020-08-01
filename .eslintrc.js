module.exports = {
  env: {
    browser: true,
    node:true,
    es2020: true,
  },
  plugins: [
    "babel",
  ],
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  parser: "babel-eslint",
  rules: {
    "no-console": 0
  },
};

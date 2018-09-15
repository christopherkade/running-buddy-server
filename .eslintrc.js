module.exports = {
  env: {
    mocha: true,
    node: true,
    protractor: true,
    es6: true
  },
  extends: ["eslint:recommended", "airbnb", "prettier"],
  plugins: ["prettier"],
  parser: "babel-eslint",
  rules: {
    "prettier/prettier": "error"
  }
};

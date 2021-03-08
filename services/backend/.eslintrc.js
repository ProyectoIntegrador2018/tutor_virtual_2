module.exports = {
  env: {
    node: true,
  },
  extends: ["airbnb-typescript", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "prefer-default-export": false,
  },
};

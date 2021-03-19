module.exports = {
  extends: ["airbnb-typescript", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
  },
};

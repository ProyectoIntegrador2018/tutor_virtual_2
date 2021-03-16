module.exports = {
  extends: ["airbnb-typescript", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "import/no-extraneous-dependencies": "off",
  },
};

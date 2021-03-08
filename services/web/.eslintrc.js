module.exports = {
  extends: ["airbnb-typescript", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};

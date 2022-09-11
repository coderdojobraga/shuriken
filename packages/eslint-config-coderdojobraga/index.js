module.exports = {
  extends: [
    "next",
    "prettier",
    "turbo",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["import", "unused-imports", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "sort-imports": ["error", { ignoreDeclarationSort: true }],
  },
};

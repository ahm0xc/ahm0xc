/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  importOrder: [
    "^(bun:(.*)$)|^(bun$)",
    "^(node:(.*)$)|^(node$)",
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "^(react-native/(.*)$)|^(react-native$)",
    "^(expo/(.*)$)|^(expo$)",
    "<THIRD_PARTY_MODULES>",
    "^types$",
    "^~/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;

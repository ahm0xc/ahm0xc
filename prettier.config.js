/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  tailwindStylesheet: "./apps/web/src/styles/globals.css",
  tailwindFunctions: ["clsx", "cn"],
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

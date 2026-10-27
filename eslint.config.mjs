import { FlatCompat } from "@eslint/eslintrc";

const eslintConfig = [
  ...new FlatCompat({ baseDirectory: import.meta.dirname }).extends(
    "next/core-web-vitals",
    "next/typescript"
  ),
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "_archive/**", "red-informatica/**"],
  },
];

export default eslintConfig;

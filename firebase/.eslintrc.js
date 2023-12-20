module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  ignorePatterns: [
    "*.d.ts",
    "/dist/**",
    "/functions/lib/**/*", // Ignore built files.
  ],
  plugins: ["@typescript-eslint", "import"],
  overrides: [
    {
      files: ["*.ts"],
      extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "prettier",
      ],
      parserOptions: {
        project: ["tsconfig.json", "tsconfig.dev.json", "common/tsconfig.json"],
        sourceType: "module",
      },
      rules: {
        "import/no-unresolved": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
      },
    },
  ],
};

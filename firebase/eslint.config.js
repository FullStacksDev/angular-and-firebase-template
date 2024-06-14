// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const eslintConfigPrettier = require("eslint-config-prettier");
const globals = require("globals");

module.exports = tseslint.config(
  {
    ignores: ["**/*.d.ts", "dist/", "common/**/*.js", "functions/lib/"],
  },
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      eslintConfigPrettier,
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 5,
      sourceType: "module",
      parserOptions: {
        project: [
          "tsconfig.json",
          "tsconfig.dev.json",
          "tsconfig.spec.json",
          "common/tsconfig.json",
        ],
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/method-signature-style": ["error", "property"],
      "@typescript-eslint/no-confusing-void-expression": [
        "error",
        {
          ignoreArrowShorthand: true,
        },
      ],
      "@typescript-eslint/no-extraneous-class": [
        "error",
        {
          allowConstructorOnly: true,
          allowEmpty: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
          allowBoolean: true,
        },
      ],
      "@typescript-eslint/unbound-method": [
        "error",
        {
          ignoreStatic: true,
        },
      ],
    },
  },
);

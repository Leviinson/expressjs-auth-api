import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
    {
        ignores: [
            "dist/**",
            "node_modules/**",
            "src/db/migrations/",
            "src/db/config.ts",
        ],
    },
    js.configs.recommended,
    {
        files: ["**/*.ts"],
        plugins: {
            "@typescript-eslint": typescript,
            import: importPlugin,
        },
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: "module",
            },
        },
        rules: {
            ...typescript.configs.recommended.rules,
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/no-empty-object-type": "off",
            "no-undef": "off",
            "import/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index",
                        "object",
                        "type",
                    ],
                    "newlines-between": "always",
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                    pathGroups: [
                        {
                            pattern: "@/**",
                            group: "internal",
                            position: "after",
                        },
                    ],
                    pathGroupsExcludedImportTypes: ["builtin"],
                },
            ],
        },
    },
    {
        files: ["**/*.js"],
        plugins: {
            import: importPlugin,
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
        },
        rules: {
            "import/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index",
                        "object",
                        "type",
                    ],
                    "newlines-between": "always",
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                    pathGroups: [
                        {
                            pattern: "@/**",
                            group: "internal",
                            position: "after",
                        },
                    ],
                    pathGroupsExcludedImportTypes: ["builtin"],
                },
            ],
        },
    },
]);

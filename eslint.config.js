import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";

const compat = new FlatCompat();

export default [
    {
        ignores: ["dist/**", "node_modules/**", "src/db/migrations/"],
    },
    js.configs.recommended,
    ...compat.extends("plugin:@typescript-eslint/recommended"),
    {
        plugins: {
            import: importPlugin,
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
            "@typescript-eslint/no-empty-object-type": "off",
        },
    },
    {
        files: ["**/*.ts", "**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
        },
    },
];

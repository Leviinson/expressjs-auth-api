import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    globalSetup: "./src/jest/globalSetup.ts",
    globalTeardown: "./src/jest/globalTeardown.ts",
    setupFilesAfterEnv: ["./src/jest/setupTests.ts"],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>/",
    }),
    testPathIgnorePatterns: ["./dist"],
};

export default config;

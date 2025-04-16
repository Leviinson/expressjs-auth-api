import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

import type { Config } from "jest";

// export default {
//     preset: "ts-jest",
//     testEnvironment: "node",
//     globalSetup: "./jest/globalSetup.ts",
//     globalTeardown: "./jest/globalTeardown.ts",
//     setupFilesAfterEnv: ["./jest/setupTests.ts"],
// };

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    globalSetup: "./src/jest/globalSetup.ts",
    globalTeardown: "./src/jest/globalTeardown.ts",
    setupFilesAfterEnv: ["./src/jest/setupTests.ts"],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>/",
    }),
};

export default config;

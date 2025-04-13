export default {
    preset: "ts-jest",
    testEnvironment: "node",
    globalSetup: "./jest/globalSetup.ts",
    globalTeardown: "./jest/globalTeardown.ts",
    setupFilesAfterEnv: ["./jest/setupTests.ts"],
};

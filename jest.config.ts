import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  moduleFileExtensions: ["js", "json", "ts"],
  verbose: true,
  testEnvironment: "node",
  collectCoverageFrom: [
    "!<!rootDir>/src/**/*.{ts}",
    "!<rootDir>/src/app.module.ts",
    "!<rootDir>/src/health/*.{ts}",
    "!<rootDir>/src/main.ts",
    "!<rootDir>/node_modules/",
    "!<rootDir>/**/__tests__/**",
    "!<rootDir>/**/*.d.ts",
  ],
  coverageDirectory: "../coverage",
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
};
export default config;

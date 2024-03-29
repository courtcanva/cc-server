import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: [
    "**/*.(t|j)s",
    "!auth/*.ts",
    "!health/*.ts",
    "!main.ts",
    "!admin/*.ts",
    "!common/*.ts",
    "!users/*.ts",
    "!tiles/*.ts",
    "!**/*.module.ts",
    "!<rootDir>/node_modules/",
    "!<rootDir>/**/__tests__/**",
    "!<rootDir>/**/*.d.ts",
  ],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/$1",
  },
};
export default config;

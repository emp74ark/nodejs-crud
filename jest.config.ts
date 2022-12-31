import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/'],
  roots: ['<rootDir>/src']
}
export default config
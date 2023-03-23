export default {
  coverageProvider: "v8",
  preset: "ts-jest",
  modulePathIgnorePatterns: ["mocks"],
  testMatch: ["**/__tests__/integration/**/*.[jt]s?(x)"],
};

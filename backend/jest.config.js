module.exports = {
    preset: 'ts-jest', // Use ts-jest preset for TypeScript support
    testEnvironment: 'node', // Set the test environment to Node
    transform: {
      '^.+\\.ts$': 'ts-jest', // Transform TypeScript files using ts-jest
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Supported file extensions
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore certain paths
  };
  
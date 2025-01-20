module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/test.ts'],  // Asegúrate de que este archivo existe en tu proyecto
    globals: {
      'ts-jest': {
        tsconfig: '<rootDir>/tsconfig.spec.json',  // Asegúrate de que este archivo exista
      },
    },
    transform: {
      '^.+\\.(ts|mjs|html|json)$': 'ts-jest',
    },
    testMatch: [
      '**/+(*.)+(spec|test).+(ts|js)?(x)',
    ],
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  };
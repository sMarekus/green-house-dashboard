module.exports = {
  preset: 'ts-jest',
  testEnvironment: '@happy-dom/jest-environment',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(axios|primereact)/.*)',
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(svg|jpg|jpeg|png|gif|webp|avif)$': '<rootDir>/src/__mocks__/fileMock.js',
    'primereact/resources/themes/saga-blue/theme.css': '<rootDir>/src/__mocks__/primereact.css.js',
    'primereact/resources/primereact.min.css': '<rootDir>/src/__mocks__/primereact.css.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};

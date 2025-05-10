module.exports = {
  preset: 'ts-jest', // Используем ts-jest для работы с TypeScript
  testEnvironment: 'node', // Указываем среду для тестов (node.js)
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // Маппинг для правильного разрешения путей
  },
  transform: {
    '^.+\\.ts$': 'ts-jest', // Преобразовываем TypeScript файлы с помощью ts-jest
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Указываем tsconfig для Jest
    },
  },
  moduleFileExtensions: ['ts', 'js'], // Указываем расширения файлов для Jest
};

import globals from "globals";


/** @type {import('eslint').Linter.Config[]} */
export default {
  languageOptions: { globals: globals.browser },
  rules: {
    // Синтаксические ошибки
    'no-unexpected-multiline': 'error', // Запрет неожиданных многострочных выражений
    'no-extra-semi': 'error', // Запрет лишних точек с запятой
    'no-unreachable': 'error', // Запрет недостижимого кода

    // Лучшие практики
    'no-eval': 'error', // Запрет использования eval
    'no-implied-eval': 'error', // Запрет неявного eval (например, в setTimeout)
    'no-unused-vars': 'error', // Запрет неиспользуемых переменных
    'no-undef': 'error', // Запрет использования необъявленных переменных
    'no-use-before-define': 'error', // Запрет использования переменных до их объявления
    'no-var': 'error', // Запрет использования var (используйте let/const)
    'prefer-const': 'error', // Требование использования const для переменных, которые не переопределяются

    // Стиль кода
    'semi': ['error', 'always'], // Требование точек с запятой
    'quotes': ['error', 'single'], // Требование одинарных кавычек
    'indent': ['error', 4], // Отступы в 4 пробела
    'comma-dangle': ['error', 'always-multiline'], // Висячие запятые для многострочных объектов/массивов
    'object-curly-spacing': ['error', 'always'], // Пробелы внутри фигурных скобок
    'array-bracket-spacing': ['error', 'never'], // Запрет пробелов внутри квадратных скобок
    'brace-style': ['error', '1tbs', { allowSingleLine: true }], // Стиль фигурных скобок (One True Brace Style)
    'keyword-spacing': ['error', { before: true, after: true }], // Пробелы вокруг ключевых слов
    'arrow-spacing': ['error', { before: true, after: true }], // Пробелы вокруг стрелочных функций
    'space-infix-ops': 'error', // Пробелы вокруг операторов
    'space-before-blocks': 'error', // Пробелы перед блоками
    'space-before-function-paren': ['error', 'never'], // Запрет пробелов перед скобками функций
    'no-trailing-spaces': 'error', // Запрет пробелов в конце строк
    'eol-last': ['error', 'always'], // Требование пустой строки в конце файла

    // Асинхронный код
    'no-async-promise-executor': 'error', // Запрет асинхронных исполнителей промисов
    'no-await-in-loop': 'error', // Запрет await внутри циклов (если это не нужно)

    // ООП
    'no-dupe-class-members': 'error', // Запрет дублирования методов в классах
    'no-this-before-super': 'error', // Запрет использования this до вызова super()

    // Импорты/экспорты
    'no-duplicate-imports': 'error', // Запрет дублирования импортов
  },
};

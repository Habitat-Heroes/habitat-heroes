module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    // 'plugin:react/recommended',
    // 'plugin:react/jsx-runtime',
    'airbnb',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    // 'react',
    // 'react-hooks',
    'import',
    'eslint-comments',
    'simple-import-sort',
  ],
  rules: {
    // =========== //
    // eslint base //
    // =========== //
    curly: ['error', 'all'],
    'linebreak-style': ['error', 'unix'],
    'no-mixed-operators': 'error',
    'no-console': 'error',
    'no-process-exit': 'error',
    'no-fallthrough': [
      'error',
      { commentPattern: '.*intentional fallthrough.*' },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],

    // ============================ //
    // eslint-plugin-eslint-comment //
    // ============================ //
    // Require a eslint-enable comment for every eslint-disable comment
    'eslint-comments/disable-enable-pair': [
      'error',
      {
        allowWholeFile: true,
      },
    ],
    // Disallow a eslint-enable comment for multiple eslint-disable comments
    'eslint-comments/no-aggregating-enable': 'error',
    // Disallow duplicate eslint-disable comments
    'eslint-comments/no-duplicate-disable': 'error',
    // Disallow eslint-disable comments without rule names
    'eslint-comments/no-unlimited-disable': 'error',
    // Disallow unused eslint-disable comments
    'eslint-comments/no-unused-disable': 'error',
    // Disallow unused eslint-enable comments
    'eslint-comments/no-unused-enable': 'error',
    // Disallow ESLint directive-comments
    'eslint-comments/no-use': [
      'error',
      {
        allow: [
          'eslint-disable',
          'eslint-disable-line',
          'eslint-disable-next-line',
          'eslint-enable',
        ],
      },
    ],

    // ==================== //
    // eslint-plugin-import //
    // ==================== //
    // Disallow non-import statements appearing before import statements
    'import/first': 'error',
    // Require a newline after the last import/require in a group
    'import/newline-after-import': 'error',
    // Forbid import of modules using absolute paths
    'import/no-absolute-path': 'error',
    // Disallow AMD require/define
    'import/no-amd': 'error',
    // Forbid the use of extraneous packages
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        peerDependencies: true,
        optionalDependencies: false,
      },
    ],
    // Forbid mutable exports
    'import/no-mutable-exports': 'error',
    // Forbid a module from importing itself
    'import/no-self-import': 'error',
    // Allow for non-default exports
    'import/prefer-default-export': 'off',

    // ================================ //
    // eslint-plugin-simple-import-sort //
    // ================================ //
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages. `react` related packages come first.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(assets|objects|reducers|scenes|utils)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` behind, and style imports last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$', '^.+\\.s?css$'],
        ],
      },
    ],

    // ===== //
    // React //
    // ===== //
    // 'react/jsx-boolean-value': ['error', 'always'],
    // 'react/jsx-sort-props': 'error',
    // // Checks effect dependencies
    // 'react-hooks/exhaustive-deps': 'error',
    // // Checks rules of Hooks
    // 'react-hooks/rules-of-hooks': 'error',
  },
};

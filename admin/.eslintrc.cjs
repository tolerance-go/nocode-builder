module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:cypress/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'sort-class-members'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'sort-class-members/sort-class-members': [
      2,
      {
        order: [
          '[static-properties]',
          '[static-methods]',
          '[properties]',
          'constructor',
          '[methods]',
        ],
        groups: {
          'static-properties': [{ type: 'property', static: true }],
          'static-methods': [{ type: 'method', static: true }],
          properties: [{ type: 'property', static: false }],
          methods: [{ type: 'method', static: false }],
        },
        accessorPairPositioning: 'getThenSet',
      },
    ],
  },
};

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
          '[public-static-properties]',
          '[protected-static-properties]',
          '[private-static-properties]',
          '[public-static-methods]',
          '[protected-static-methods]',
          '[private-static-methods]',
          '[public-properties]',
          '[protected-properties]',
          '[private-properties]',
          'constructor',
          '[public-methods]',
          '[protected-methods]',
          '[private-methods]',
        ],
        groups: {
          'public-static-properties': [
            { type: 'property', static: true, accessibility: 'public' },
          ],
          'protected-static-properties': [
            { type: 'property', static: true, accessibility: 'protected' },
          ],
          'private-static-properties': [
            { type: 'property', static: true, accessibility: 'private' },
          ],
          'public-static-methods': [
            { type: 'method', static: true, accessibility: 'public' },
          ],
          'protected-static-methods': [
            { type: 'method', static: true, accessibility: 'protected' },
          ],
          'private-static-methods': [
            { type: 'method', static: true, accessibility: 'private' },
          ],
          'public-properties': [
            { type: 'property', static: false, accessibility: 'public' },
          ],
          'protected-properties': [
            { type: 'property', static: false, accessibility: 'protected' },
          ],
          'private-properties': [
            { type: 'property', static: false, accessibility: 'private' },
          ],
          'public-methods': [
            { type: 'method', static: false, accessibility: 'public' },
          ],
          'protected-methods': [
            { type: 'method', static: false, accessibility: 'protected' },
          ],
          'private-methods': [
            { type: 'method', static: false, accessibility: 'private' },
          ],
        },
        accessorPairPositioning: 'getThenSet',
      },
    ],
  },
};

module.exports = {
  extends: ['airbnb-typescript', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    "prefer-arrow"
  ],
  rules: {
    'react/jsx-one-expression-per-line': ['error', { allow: 'literal' }],
    'react/jsx-curly-newline': [
      'error',
      {
        multiline: 'consistent',
        singleline: 'consistent',
      },
    ],
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: false },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'no-underscore-dangle': 'off',
    quotes: 'off',
    '@typescript-eslint/quotes': ['error'],
    'import/no-cycle': 'off',
    'react/no-array-index-key': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    "consistent-return": "off",
    "no-plusplus": "off",
    "no-param-reassign": "off",
    "no-restricted-syntax": "off",
    "no-prototype-builtins": "off",
    "no-restricted-globals": "off",
    "no-console": "off",
    "prefer-template": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "arrow-body-style": "off",
    "@typescript-eslint/indent": "off",
    "react/jsx-indent": "off",
    "indent": "off",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "no-await-in-loop": "off",
    "prefer-arrow/prefer-arrow-functions": [
      "warn",
      {
        "disallowPrototype": true,
        "singleReturnOnly": true,
        "classPropertiesAllowed": false
      }
   ],
   "import/order": [
    "error",
    {
      "groups": ["builtin", "external", "internal", ["parent", "sibling"] ],
      "pathGroups": [
        {
          "pattern": "react",
          "group": "external",
          "position": "before"
        }
      ],
      "pathGroupsExcludedImportTypes": ["react"],
      "newlines-between": "always",
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true
      }
    }
  ],
  },
};
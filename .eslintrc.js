module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'react-app'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        assert: 'either',
        depth: 3,
      },
    ],
    'operator-linebreak': ['error', 'after'],
    'comma-dangle': [
      'error',
      'always-multiline',
      {
        imports: 'never',
        exports: 'never',
        arrays: 'never',
        objects: 'never',
        functions: 'never',
      },
    ],
    'object-curly-newline': 0,
    'react/prop-types': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'implicit-arrow-linebreak': 0,
  },
};

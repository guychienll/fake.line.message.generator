module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
        },
        sourceType: 'module',
    },
    extends: [
        'next/core-web-vitals',
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    rules: {
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
    },
};

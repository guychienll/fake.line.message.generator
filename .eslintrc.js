module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
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
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            extends: [
                'next/core-web-vitals',
                'plugin:@typescript-eslint/recommended',
                'plugin:react/recommended',
            ],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
            rules: {
                '@next/next/no-img-element': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                'no-unused-vars': 'off',
                'react/prop-types': 'off',
                'react/react-in-jsx-scope': 'off',
            },
        },
    ],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
        },
        sourceType: 'module',
    },
};

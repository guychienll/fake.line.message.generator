const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            aspectRatio: {
                '90/160': '90 / 160',
            },
            fontFamily: {
                dynapuff: ['DynaPuff', 'sans-serif'],
            },
        },
    },
    darkMode: 'class',
    plugins: [nextui()],
};

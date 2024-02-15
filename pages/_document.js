import { Html, Head, Main, NextScript } from 'next/document';

import { NextUIProvider } from '@nextui-org/react';

export default function Document() {
    return (
        <Html lang="en">
            <title>Fake Line Message Generator</title>
            <Head>
                <meta
                    property="og:title"
                    content="Fake Line Message Generator"
                />
                <meta
                    name="description"
                    content="An Generator for Fake Line Messages"
                />
                <meta
                    property="og:description"
                    content="An Generator for Fake Line Messages"
                />
                <meta property="og:image" content="/line_logo.png" />
            </Head>
            <body>
                <NextUIProvider>
                    <Main />
                </NextUIProvider>
                <NextScript />
            </body>
        </Html>
    );
}

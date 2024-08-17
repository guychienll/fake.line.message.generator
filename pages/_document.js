import { Html, Head, Main, NextScript } from 'next/document';
import * as React from 'react';

import { NextUIProvider } from '@nextui-org/react';

export default function Document() {
    const title = 'Fake Line Message Generator';
    const description =
        'A Generator of Fake Line Messages / Chat. Provided for the purpose of internet marketing.';
    return (
        <Html lang="en">
            <title>{title}</title>
            <Head>
                <meta name="description" content={description} />

                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content="/line_logo.png" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://fake-line-message-generator.vercel.app/"
                />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@guychienll" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content="/line_logo.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet"
                />
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

import { DESCRIPTION } from '@/constants';
import { TITLE } from '@/constants';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="og:image" content="/line_logo.png" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://fake-line-message-generator.vercel.app/"
                />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@guychienll" />
                <meta name="twitter:title" content={TITLE} />
                <meta name="twitter:description" content={DESCRIPTION} />
                <meta name="twitter:image" content="/line_logo.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&display=swap"
                    rel="stylesheet"
                />
                <script
                    src="https://kit.fontawesome.com/badc861d67.js"
                    crossOrigin="anonymous"
                    async
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

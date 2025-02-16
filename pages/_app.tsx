import '@/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import 'devicon/devicon.min.css';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import config from '../next-i18next.config';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
            </Head>
            <NextUIProvider>
                <Component {...pageProps} />
            </NextUIProvider>
        </>
    );
}

export default appWithTranslation(MyApp, config);

import '@/styles/globals.css';
import zh_TW from '../lang/zh-TW.json';
import en_US from '../lang/en-US.json';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';

const messages = {
    en: en_US,
    'zh-TW': zh_TW,
};

function MyApp({ Component, pageProps }) {
    const { locale } = useRouter();

    return (
        <IntlProvider locale={locale} messages={messages}>
            <Component {...pageProps} />
        </IntlProvider>
    );
}

export default MyApp;

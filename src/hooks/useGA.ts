import { useEffect } from 'react';

interface UseGoogleAnalyticsProps {
    gaId: string;
    gtmId?: string | null;
}

const useGoogleAnalytics = (props: UseGoogleAnalyticsProps) => {
    const { gaId, gtmId = null } = props;

    useEffect(() => {
        if (gaId) {
            const gaScript = document.createElement('script');
            gaScript.async = true;
            gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
            document.head.appendChild(gaScript);

            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
                window.dataLayer.push(arguments);
            };
            window.gtag('js', new Date());
            window.gtag('config', gaId, { debug_mode: true });
        }

        if (!gtmId) {
            return;
        }

        const gtmScriptTag = document.createElement('script');
        gtmScriptTag.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer', '${gtmId}');`;

        const gtmNoScriptTag = document.createElement('noscript');
        gtmNoScriptTag.innerHTML = `
                <iframe
            src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          />
`;

        document.head.appendChild(gtmScriptTag);
        document.body.appendChild(gtmNoScriptTag);
    }, [gaId, gtmId]);
};

export default useGoogleAnalytics;

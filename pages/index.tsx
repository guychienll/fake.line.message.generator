import ConfigDashboard from '@/components/ConfigDashboard';
import ExportingPanel from '@/components/Exporting';
import { LineFooter } from '@/components/LineFooter';
import { LineHeader } from '@/components/LineHeader';
import { LineMessage } from '@/components/LineMessage';
import NavigationBar from '@/components/NavigationBar';
import useGoogleAnalytics from '@/hooks/useGA';
import { Card, CardBody } from '@nextui-org/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
    useGoogleAnalytics({ gaId: 'G-CMRT9XGJ3D' });

    return (
        <div className="h-dvh min-h-dvh">
            <NavigationBar />
            <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center p-10">
                <Card className="w-[300px] shadow-lg">
                    <ExportingPanel />
                    <CardBody
                        className="h-[100%] min-h-[550px] w-auto"
                        id="line"
                    >
                        <LineHeader />
                        <LineMessage />
                        <LineFooter />
                    </CardBody>
                    <ConfigDashboard />
                </Card>
            </div>
        </div>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

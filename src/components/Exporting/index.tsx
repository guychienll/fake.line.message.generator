import {
    Avatar,
    Button,
    CardHeader,
    Chip,
    useDisclosure,
} from '@nextui-org/react';
import { useTranslation } from 'next-i18next';
import { DISCLAIMER_CONFIRM_KEY } from '@/constants';
import { download } from '@/utils/canvas';
import DisclaimerModal from '@/components/DisclaimerModal';

function ExportingPanel() {
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    function checkDisclaimer() {
        const isConfirmDisclaimer = window.localStorage.getItem(
            DISCLAIMER_CONFIRM_KEY
        );
        if (!isConfirmDisclaimer) {
            onOpen();
            return false;
        }
        return true;
    }

    async function confirmDisclaimer() {
        window.localStorage.setItem(DISCLAIMER_CONFIRM_KEY, 'true');
        onClose();
        await onExport();
    }

    async function onExport() {
        if (!checkDisclaimer()) {
            return;
        }
        await download();
    }

    return (
        <CardHeader className="flex items-center justify-between p-4">
            <div className="flex items-center">
                <Avatar
                    ImgComponent={(props) => {
                        return <img {...props} />;
                    }}
                    color="success"
                    className="mr-3 size-10 ring-2 ring-success/30"
                    isBordered
                    radius="md"
                    src="/line_logo.png"
                />
                <div className="flex flex-col gap-0.5">
                    <div className="text-sm font-bold tracking-wide">LINE</div>
                    <Chip
                        className="h-5 text-[10px] font-medium text-[#ffffff]"
                        variant="solid"
                        color="success"
                        size="sm"
                        radius="sm"
                    >
                        {t('line_card_header_version')} 14.1.3
                    </Chip>
                </div>
            </div>
            <Button
                variant="ghost"
                color="success"
                className="transition-all duration-200 hover:bg-success/20 hover:!text-[#ffffff]"
                onClick={onExport}
                id="export-btn"
                endContent={<i className="fas fa-download text-sm" />}
            >
                {t('line_card_header_export')}
            </Button>
            <DisclaimerModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onConfirm={confirmDisclaimer}
            />
        </CardHeader>
    );
}

export default ExportingPanel;

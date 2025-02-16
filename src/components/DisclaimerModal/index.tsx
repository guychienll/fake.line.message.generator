import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react';
import { useTranslation } from 'next-i18next';

function DisclaimerModal({ isOpen, onOpenChange, onConfirm }) {
    const { t } = useTranslation();
    return (
        <Modal
            isDismissable={false}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    {t('site_disclaimer')}
                </ModalHeader>
                <ModalBody>
                    <p className="whitespace-pre-wrap leading-6">
                        {t('site_disclaimer_content')}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onPress={onConfirm}>
                        {t('site_disclaimer_confirm')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default DisclaimerModal;

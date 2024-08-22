import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Image as NextUiImage,
    Slider,
    Switch,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    CardFooter,
} from '@nextui-org/react';

import * as html2Img from 'html-to-image';
import * as moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Joyride from 'react-joyride';
import { v4 } from 'uuid';
import { create } from 'zustand';
import { LineFooter } from '../src/components/LineFooter';
import { LineHeader } from '../src/components/LineHeader';
import { LineMessage } from '../src/components/LineMessage';
import { MESSAGE_TYPE, MESSAGE_VARIANT } from '../src/constants';
import useGoogleAnalytics from '../src/hooks/useGA';
import { track } from '../src/utils/tracking';

export const useLineStore = create((set) => {
    return {
        player: {
            type: MESSAGE_TYPE.sender,
            name: '小新 (Shin)',
            avatar: '/hsin.jpg',
        },
        channel: {
            name: '春日部防衛隊 (KB)',
            unReadCount: 32,
        },
        messages: [
            {
                id: v4(),
                type: MESSAGE_TYPE.receiver,
                read: null,
                variant: MESSAGE_VARIANT.text,
                time: new Date('2022-06-18 08:00'),
                message: `小新，今天要出去玩嗎？\n Shin, do you want to go out to play today?`,
                data: {
                    player: {
                        type: MESSAGE_TYPE.receiver,
                        name: '正男 (Masao)',
                        avatar: '/nan.png',
                    },
                },
            },
            {
                id: v4(),
                type: MESSAGE_TYPE.sender,
                read: null,
                time: new Date('2022-06-18 08:02'),
                variant: MESSAGE_VARIANT.text,
                message: `好哇，我們公園見。\n OK, see you in the park.`,
                data: {
                    player: {
                        type: MESSAGE_TYPE.sender,
                        name: '小新 (Shin)',
                        avatar: '/hsin.jpg',
                    },
                },
            },
        ],
        setMessages: (msgs) => set(() => ({ messages: msgs })),
        setPlayer: (player) => set(() => ({ player: player })),
        setChannel: (channel) => set(() => ({ channel: channel })),
    };
});

const DISCLAIMER_CONFIRM_KEY = 'is-confirm-disclaimer';

export default function Home() {
    const router = useRouter();
    const intl = useIntl();
    const t = intl.messages[router.locale];
    const [canMount, setCanMount] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useGoogleAnalytics({ gaId: 'G-CMRT9XGJ3D' });
    useEffect(() => {
        setCanMount(true);
    }, []);

    const store = useLineStore((state) => state);
    const { player, setPlayer, channel, setChannel } = store;

    async function downloadImg() {
        const _html = document.getElementById('line');
        const messageContainer = _html.querySelector('#message-container');
        const temp = messageContainer.style.height;
        messageContainer.style.height = messageContainer.scrollHeight + 'px';
        const at = document.createElement('div');
        at.className = 'absolute bottom-1 right-1 text-bold text-[#000]';
        at.innerHTML = '@flmg';
        messageContainer.appendChild(at);

        const dataUri = await html2Img.toPng(_html, {
            canvasHeight: _html.clientHeight * 2.5,
            canvasWidth: _html.clientWidth * 2.5,
            quality: 1,
            pixelRatio: 1,
        });
        at.remove();
        messageContainer.style.height = temp;

        const image = new Image();
        image.src = dataUri;

        const url = image.src.replace(
            /^data:image\/[^;]/,
            'data:application/octet-stream'
        );

        const linkElem = document.createElement('a');
        linkElem.download = `flmg-download-${moment(new Date()).format(
            'YYYYMMDDHHmmss'
        )}.png`;
        linkElem.href = url;
        document.body.appendChild(linkElem);
        linkElem.click();
        linkElem.remove();

        track('event', 'export', {
            event_category: 'click',
            event_label: '圖片輸出',
        });
    }

    const handleDownloadImage = async () => {
        const isConfirmDisclaimer = window.localStorage.getItem(
            DISCLAIMER_CONFIRM_KEY
        );
        if (!isConfirmDisclaimer) {
            onOpen();
            return;
        }
        await downloadImg();
    };

    const onConfirmDisclaimer = async (onClose) => {
        window.localStorage.setItem(DISCLAIMER_CONFIRM_KEY, 'true');
        onClose();
        await handleDownloadImage();
    };

    const map = {
        en: 'English',
        'zh-TW': '繁體中文',
    };

    return (
        <div className="h-dvh min-h-dvh">
            <Modal
                isDismissable={false}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {t['site.disclaimer']}
                            </ModalHeader>
                            <ModalBody>
                                <p className="whitespace-pre-wrap leading-6">
                                    {t['site.disclaimer.content']}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    onPress={() => {
                                        onConfirmDisclaimer(onClose);
                                    }}
                                >
                                    {t['site.disclaimer.confirm']}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Navbar isBlurred={true}>
                <NavbarBrand>
                    <h1 className="font-bold text-inherit">
                        Fake Line Message Generator
                    </h1>
                </NavbarBrand>
                <NavbarContent justify="end">
                    <NavbarItem id="translation" className="flex gap-x-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered">
                                    {map[router.locale]}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                {[...router.locales].sort().map((locale) => {
                                    return (
                                        <DropdownItem
                                            key={locale}
                                            href={`/${locale}`}
                                            locale={locale}
                                        >
                                            {map[locale]}
                                        </DropdownItem>
                                    );
                                })}
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center py-10">
                <Card className="w-[300px] py-2">
                    <CardHeader className="flex justify-between">
                        <div className="flex">
                            <Avatar
                                color="success"
                                className="mr-3"
                                isBordered
                                radius="md"
                                src="/line_logo.png"
                            />
                            <div>
                                <div className="text-sm font-bold">LINE</div>
                                <Chip
                                    className="h-5 text-[10px] text-[#ffffff]"
                                    variant="solid"
                                    color="success"
                                >
                                    {t['line.card.header.version']} 14.1.3
                                </Chip>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            color="success"
                            className="hover:!text-[#ffffff]"
                            htmlType="button"
                            onClick={handleDownloadImage}
                            id="export-btn"
                        >
                            {t['line.card.header.export']}
                        </Button>
                    </CardHeader>

                    <CardBody>
                        <div className="h-[100%] w-auto" id="line">
                            <LineHeader />
                            <LineMessage />
                            <LineFooter />
                        </div>
                    </CardBody>
                    <CardFooter className="flex flex-col items-start gap-y-2">
                        <div className="flex w-full flex-col gap-y-3 px-2">
                            <div className="flex items-center">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="avatar"
                                        type="file"
                                        className="hidden"
                                        onInput={(e) => {
                                            const { files } = e.target;
                                            const [file] = files;
                                            const nextPlayer = {
                                                ...player,
                                                avatar: URL.createObjectURL(
                                                    file
                                                ),
                                            };
                                            setPlayer(nextPlayer);
                                        }}
                                    />
                                    <Avatar
                                        as="label"
                                        htmlFor="avatar"
                                        isBordered
                                        className="cursor-pointer text-[#ffffff]"
                                        color={
                                            player.type === MESSAGE_TYPE.sender
                                                ? 'success'
                                                : 'default'
                                        }
                                        src={player.avatar}
                                    />
                                    <div className="flex flex-col  gap-y-1">
                                        <input
                                            value={player.name}
                                            type="text"
                                            className="text-sm"
                                            onChange={(e) => {
                                                const nextPlayer = {
                                                    ...player,
                                                    name: e.target.value,
                                                };
                                                setPlayer(nextPlayer);
                                            }}
                                        />
                                        <Switch
                                            defaultSelected
                                            size="sm"
                                            color={
                                                player.type ===
                                                MESSAGE_TYPE.sender
                                                    ? 'success'
                                                    : 'default'
                                            }
                                            onClick={() => {
                                                const nextPlayer =
                                                    player.type ===
                                                    MESSAGE_TYPE.sender
                                                        ? {
                                                              ...player,
                                                              type: MESSAGE_TYPE.receiver,
                                                          }
                                                        : {
                                                              ...player,
                                                              type: MESSAGE_TYPE.sender,
                                                          };
                                                setPlayer(nextPlayer);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full flex-col">
                                <Slider
                                    className="mb-2"
                                    label={
                                        t[
                                            'line.message.header.unread-message-count'
                                        ]
                                    }
                                    size="sm"
                                    step={1}
                                    color="success"
                                    maxValue={100}
                                    minValue={0}
                                    hideValue
                                    value={channel.unReadCount}
                                    onChange={(val) => {
                                        const nextChannel = {
                                            ...channel,
                                            unReadCount: val,
                                        };
                                        setChannel(nextChannel);
                                    }}
                                />
                            </div>
                        </div>
                    </CardFooter>
                </Card>
                {canMount && (
                    <Joyride
                        run={true}
                        continuous
                        steps={[
                            {
                                target: '#translation',
                                content: (
                                    <div className="grid place-items-center">
                                        <NextUiImage
                                            src="/steps/step1.gif"
                                            alt="step1"
                                        />
                                    </div>
                                ),
                            },
                            {
                                target: '#line',
                                content: (
                                    <div className="grid place-items-center">
                                        <NextUiImage
                                            src="/steps/step2.gif"
                                            alt="step2"
                                        />
                                    </div>
                                ),
                            },
                            {
                                target: '#export-btn',
                                content: (
                                    <div className="grid place-items-center gap-y-3">
                                        <NextUiImage
                                            src="/steps/step3.gif"
                                            alt="step3"
                                        />
                                    </div>
                                ),
                            },
                        ]}
                        styles={{
                            options: {
                                arrowColor: '#ffffff',
                                backgroundColor: '#ffffff',
                                overlayColor: 'rgba(0,0, 0, 0.4)',
                                primaryColor: '#222',
                                textColor: '#222',
                            },
                        }}
                    />
                )}
            </div>
        </div>
    );
}

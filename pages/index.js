import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Slider,
    Switch,
} from '@nextui-org/react';
import * as html2Img from 'html-to-image';
import * as moment from 'moment';
import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import { LineFooter } from '../src/components/LineFooter';
import { LineHeader } from '../src/components/LineHeader';
import { LineMessage } from '../src/components/LineMessage';
import { MESSAGE_TYPE } from '../src/constants';
import useGoogleAnalytics from '../src/hooks/useGA';
import { create } from 'zustand';

export const useLineStore = create((set) => ({
    player: {
        type: MESSAGE_TYPE.sender,
        name: '小新',
        avatar: '/hsin.jpg',
    },
    channel: {
        name: '春日部防衛隊',
        unReadCount: 32,
    },
    messages: [
        {
            id: v4(),
            type: MESSAGE_TYPE.receiver,
            read: null,
            time: new Date('2022-06-18 08:00'),
            message: '小新，今天要出去玩嗎？',
            data: {
                player: {
                    type: MESSAGE_TYPE.receiver,
                    name: '正男',
                    avatar: '/nan.png',
                },
            },
        },
        {
            id: v4(),
            type: MESSAGE_TYPE.sender,
            read: null,
            time: new Date('2022-06-18 08:02'),
            message: '好哇，我們公園見。',
            data: {
                player: {
                    type: MESSAGE_TYPE.sender,
                    name: '小新',
                    avatar: '/hsin.jpg',
                },
            },
        },
    ],
    setMessages: (msgs) => set(() => ({ messages: msgs })),
    setPlayer: (player) => set(() => ({ player: player })),
    setChannel: (channel) => set(() => ({ channel: channel })),
}));
export default function Home() {
    useGoogleAnalytics({ gaId: 'G-CMRT9XGJ3D' });
    const store = useLineStore((state) => state);
    const { player, setPlayer, channel, setChannel } = store;
    const handleDownloadImage = async () => {
        const _html = document.getElementById('line');
        const dataUri = await html2Img.toPng(_html, {
            canvasHeight: _html.clientHeight * 2.5,
            canvasWidth: _html.clientWidth * 2.5,
            quality: 1,
            pixelRatio: 1,
        });

        const image = new window.Image();
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
    };

    return (
        <div className="min-h-dvg h-dvh">
            <div className="flex h-full items-center justify-center">
                <Card className="w-[300px] py-2">
                    <CardHeader className="flex justify-between">
                        <div className="flex">
                            <Avatar
                                color="success"
                                className="mr-3"
                                isBordered
                                radius="md"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/LINE_New_App_Icon_%282020-12%29.png/800px-LINE_New_App_Icon_%282020-12%29.png"
                            />
                            <div>
                                <div className="text-sm font-bold">LINE</div>
                                <Chip
                                    className="h-5 text-[10px] text-[#ffffff]"
                                    variant="solid"
                                    color="success"
                                >
                                    Version. 14.1.3
                                </Chip>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            color="success"
                            className="hover:!text-[#ffffff]"
                            htmlType="button"
                            onClick={handleDownloadImage}
                        >
                            匯出
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
                                            className="text-sm "
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
                                    label="未讀訊息數量"
                                    step={1}
                                    color="success"
                                    showTooltip
                                    maxValue={100}
                                    minValue={0}
                                    radius="full"
                                    className="max-w-md"
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
            </div>
        </div>
    );
}

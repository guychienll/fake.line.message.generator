import { MESSAGE_TYPE, MESSAGE_VARIANT } from '@/constants';
import { LineStore } from '@/types';
import { v4 } from 'uuid';
import { create } from 'zustand';

export const useLineStore = create<LineStore>((set) => ({
    player: {
        type: 'sender',
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
}));

export default useLineStore;

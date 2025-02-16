import { MESSAGE_TYPE, MESSAGE_VARIANT } from '@/constants';

type MessageType = keyof typeof MESSAGE_TYPE;
type MessageVariant = keyof typeof MESSAGE_VARIANT;

interface Message {
    id: string;
    type: MessageType;
    read: boolean | null;
    variant: MessageVariant;
    time: Date;
    message: string;
    data: {
        player: {
            type: MessageType;
            name: string;
            avatar: string;
        };
    };
}

interface Player {
    type: MessageType;
    name: string;
    avatar: string;
}

interface Channel {
    name: string;
    unReadCount: number;
}

interface LineStore {
    player: Player;
    channel: Channel;
    messages: Message[];
    setPlayer: (player: Player) => void;
    setChannel: (channel: Channel) => void;
    setMessages: (messages: Message[]) => void;
}

export type {
    LineStore,
    Message,
    MessageType,
    MessageVariant,
    Channel,
    Player,
};

export const MESSAGE_TYPE = {
    sender: 'sender',
    receiver: 'receiver',
    badge: 'badge',
};

export const MESSAGE_TYPE_DISPLAY = {
    [MESSAGE_TYPE.receiver]: {
        label: '接收者',
        value: MESSAGE_TYPE.receiver,
    },
    [MESSAGE_TYPE.sender]: {
        label: '寄送者',
        value: MESSAGE_TYPE.sender,
    },
    [MESSAGE_TYPE.badge]: {
        label: '小徽章',
        value: MESSAGE_TYPE.badge,
    },
};

export const DAYS = {
    0: {
        zh: '日',
    },
    1: {
        zh: '一',
    },
    2: {
        zh: '二',
    },
    3: {
        zh: '三',
    },
    4: {
        zh: '四',
    },
    5: {
        zh: '五',
    },
    6: {
        zh: '六',
    },
};

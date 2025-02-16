const MESSAGE_TYPE = {
    sender: 'sender',
    receiver: 'receiver',
} as const;

const MESSAGE_VARIANT = {
    image: 'image',
    text: 'text',
} as const;

const DISCLAIMER_CONFIRM_KEY = 'is-confirm-disclaimer';

const LOCALES = {
    en: 'English',
    'zh-TW': '繁體中文',
};

const SOCIAL_LINKS = [
    {
        href: 'https://github.com/guychienll/fake.line.message.generator/',
        icon: 'devicon-github-original',
    },

    {
        href: 'https://www.guychienll.dev/',
        icon: 'fa-solid fa-at',
    },
];

const TITLE = 'FLMG | Fake Line Message Generator';
const DESCRIPTION =
    'A Generator of Fake Line Messages / Chat. Provided for the purpose of internet marketing.';

export {
    DISCLAIMER_CONFIRM_KEY,
    LOCALES,
    MESSAGE_TYPE,
    MESSAGE_VARIANT,
    SOCIAL_LINKS,
    TITLE,
    DESCRIPTION,
};

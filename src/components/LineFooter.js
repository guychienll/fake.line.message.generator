import clsx from 'clsx';
import React, { useState } from 'react';
import { BiMicrophone } from 'react-icons/bi';
import { FiCamera, FiPlus } from 'react-icons/fi';
import { MdOutlineBrokenImage } from 'react-icons/md';
import { PiSmiley } from 'react-icons/pi';
import { v4 as uuid } from 'uuid';
import { useLineStore } from '../../pages';

export const LineFooter = () => {
    const store = useLineStore((state) => state);
    const { player, messages, setMessages } = store;
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const _msg = {
            id: uuid(),
            type: player.type,
            read: null,
            time: new Date(),
            message: message,
            data: {
                player: {
                    ...player,
                },
            },
        };
        const nextMessages = [...messages, _msg];
        setMessages(nextMessages);
        setMessage('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative flex h-[37px] items-center justify-between bg-[#ffffff] px-1"
        >
            <FiPlus size={20} />
            <FiCamera size={20} />
            <MdOutlineBrokenImage size={20} />
            <div>
                <PiSmiley
                    size={20}
                    className="absolute right-9 top-[50%] translate-y-[-50%]"
                />
                <input
                    className={clsx([
                        `w-full max-w-[150px]  overflow-hidden whitespace-nowrap rounded-[75px] 
                    bg-[#eeeeee] px-2 py-0.5 pr-6 text-sm placeholder:text-[#cccccc] focus:outline-none`,
                    ])}
                    placeholder="Aa"
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
            </div>
            <BiMicrophone size={20} />
        </form>
    );
};

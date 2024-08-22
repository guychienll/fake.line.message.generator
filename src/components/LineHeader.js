import React from 'react';
import { FiChevronLeft, FiPhone, FiSearch } from 'react-icons/fi';
import { GrMenu } from 'react-icons/gr';

import { useLineStore } from '../../pages';

export const LineHeader = () => {
    const store = useLineStore((state) => state);
    const { channel, setChannel } = store;
    return (
        <div className="flex h-[40px] w-[100%] items-center justify-between bg-[#8cabd9] px-1 font-bold">
            <div className="left flex items-center text-[#202733] text-[12px] whitespace-nowrap">
                <FiChevronLeft size={20} color="#202733" />
                {channel.unReadCount > 0 && (
                    <div className="mr-2">
                        {channel.unReadCount > 99
                            ? '99+'
                            : `${channel.unReadCount}`}
                    </div>
                )}
                <input
                    value={channel.name}
                    className="channel-name max-w-[135px] bg-transparent"
                    onChange={(e) => {
                        const nextChannel = {
                            ...channel,
                            name: `${e.target.value}`,
                        };
                        setChannel(nextChannel);
                    }}
                />
            </div>

            <div className="right flex w-[75px] items-center justify-between">
                <FiSearch size={17} />
                <FiPhone size={17} />
                <GrMenu size={17} />
            </div>
        </div>
    );
};

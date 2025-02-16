import { MESSAGE_TYPE } from '@/constants';
import useLineStore from '@/stores/line';
import { Avatar, CardFooter, Slider, Tab, Tabs } from '@nextui-org/react';
import { useTranslation } from 'next-i18next';

function ConfigDashboard() {
    const { t } = useTranslation();
    const store = useLineStore((state) => state);
    const { player, setPlayer, channel, setChannel } = store;

    return (
        <CardFooter className="flex flex-col items-start gap-y-2">
            <div className="flex w-full flex-col gap-y-3 px-2">
                <div className="flex items-center">
                    <div className="flex items-center gap-x-3">
                        <input
                            id="avatar"
                            type="file"
                            className="hidden"
                            onInput={(e) => {
                                const { files } = e.target as HTMLInputElement;
                                const [file] = files;
                                const nextPlayer = {
                                    ...player,
                                    avatar: URL.createObjectURL(file),
                                };
                                setPlayer(nextPlayer);
                            }}
                        />
                        <Avatar
                            as="label"
                            htmlFor="avatar"
                            isBordered
                            className="cursor-pointer text-[#ffffff]"
                            ImgComponent={(props) => {
                                return <img {...props} alt="avatar" />;
                            }}
                            color={
                                player.type === MESSAGE_TYPE.sender
                                    ? 'success'
                                    : 'default'
                            }
                            src={player.avatar}
                        />
                        <div className="flex flex-col gap-y-1">
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
                            <Tabs
                                size="sm"
                                color="success"
                                selectedKey={player.type}
                                onSelectionChange={(key) => {
                                    const nextPlayer = {
                                        ...player,
                                        type: key as (typeof MESSAGE_TYPE)[keyof typeof MESSAGE_TYPE],
                                    };
                                    setPlayer(nextPlayer);
                                }}
                            >
                                <Tab
                                    key={MESSAGE_TYPE.sender}
                                    title={
                                        <div
                                            className={
                                                player.type === MESSAGE_TYPE.sender
                                                    ? 'text-[#ffffff]'
                                                    : 'text-black'
                                            }
                                        >
                                            {t('line_config_dashboard_sender')}
                                        </div>
                                    }
                                />
                                <Tab
                                    key={MESSAGE_TYPE.receiver}
                                    title={
                                        <div
                                            className={
                                                player.type === MESSAGE_TYPE.receiver
                                                    ? 'text-[#ffffff]'
                                                    : 'text-black'
                                            }
                                        >
                                            {t('line_config_dashboard_receiver')}
                                        </div>
                                    }
                                />
                            </Tabs>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col">
                    <Slider
                        className="mb-2"
                        label={t('line_message_header_unread_message_count')}
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
                                unReadCount: val as number,
                            };
                            setChannel(nextChannel);
                        }}
                    />
                </div>
            </div>
        </CardFooter>
    );
}

export default ConfigDashboard;

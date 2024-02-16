import { Avatar, Button, Tooltip } from '@nextui-org/react';
import clsx from 'clsx';
import * as moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FaEye } from 'react-icons/fa';
import { IoTrashBinOutline } from 'react-icons/io5';
import { useIntl } from 'react-intl';
import { useLineStore } from '../../pages';
import { MESSAGE_TYPE } from '../constants';

export const LineMessage = () => {
    const store = useLineStore((state) => state);
    const [window, setWindow] = useState(false);
    const { messages, setMessages } = store;
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        setWindow(true);
    }, []);

    if (!window) {
        return null;
    }

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = (e) => {
        setIsDragging(false);

        const { source, destination } = e;

        if (!source?.droppableId || !destination?.droppableId) {
            return;
        }

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const nextMessages = [...messages];

        nextMessages[source.index].time =
            source.index >= destination.index
                ? moment(nextMessages[destination.index].time)
                      .add(-1, 'second')
                      .toDate()
                : moment(nextMessages[destination.index].time)
                      .add(1, 'second')
                      .toDate();

        setMessages(nextMessages);
    };

    return (
        <DragDropContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <Droppable droppableId="droppable-id">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={clsx([
                            'flex h-[420px] w-auto  flex-col  overflow-auto bg-[#8CABD9] p-1 scrollbar-hide',
                            {
                                'bg-orange-200': isDragging,
                                'opacity-70': isDragging,
                            },
                        ])}
                    >
                        {messages
                            .sort((a, b) => moment(a.time).diff(moment(b.time)))
                            .map((msg, idx) => (
                                <Draggable
                                    key={msg.id}
                                    draggableId={msg.id}
                                    index={idx}
                                >
                                    {(provided) => (
                                        <MessageBubble
                                            msg={msg}
                                            provided={provided}
                                        />
                                    )}
                                </Draggable>
                            ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

const MessageBubble = ({ msg, provided }) => {
    const router = useRouter();
    const intl = useIntl();
    const t = intl.messages[router.locale];
    const store = useLineStore((state) => state);

    const { messages, setMessages, setPlayer } = store;

    const deleteBtn = (
        <Button
            color="danger"
            isIconOnly
            onPress={() => {
                handleDeleteMsg(msg);
            }}
        >
            <IoTrashBinOutline />
        </Button>
    );

    const readBtn = (
        <Button
            color="secondary"
            isIconOnly
            onPress={() => {
                handleRead(msg);
            }}
        >
            <FaEye />
        </Button>
    );

    const handleDeleteMsg = (message) => {
        const nextMessages = messages.filter((_msg) => {
            if (message.id !== _msg.id) {
                return _msg;
            }
        });
        setMessages(nextMessages);
    };

    const handleRead = (message) => {
        const targetIdx = messages.findIndex((_msg) => _msg.id === message.id);
        const nextMessages = [...messages];
        nextMessages[targetIdx].read = !messages[targetIdx].read;
        setMessages(nextMessages);
    };

    if (msg.type === MESSAGE_TYPE.sender) {
        return (
            <div>
                {msg.type === MESSAGE_TYPE.sender && (
                    <Tooltip
                        placement="right"
                        className="px-2 py-2"
                        content={
                            <div className="flex flex-col gap-y-2">
                                {deleteBtn}
                                {readBtn}
                            </div>
                        }
                    >
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="mb-2 flex w-full cursor-pointer justify-end hover:opacity-80"
                            onClick={() => {
                                setPlayer(msg.data.player);
                            }}
                        >
                            <div className="mr-1 flex flex-col items-end gap-y-1 self-end text-[10px] tracking-wide text-[#46556b]">
                                <small>
                                    {msg.read
                                        ? t['line.message.body.read']
                                        : ''}
                                </small>
                                <small>
                                    {moment(msg.time).format('HH:mm')}
                                </small>
                            </div>

                            <div className="message relative w-full max-w-[180px] break-words rounded-[13px] bg-[#aed589] px-3 py-2 text-sm text-[#000]">
                                {msg.message}
                            </div>
                        </div>
                    </Tooltip>
                )}
            </div>
        );
    }

    return (
        <div>
            {msg.type === MESSAGE_TYPE.receiver && (
                <Tooltip
                    placement="left"
                    className="px-2 py-2"
                    content={<div>{deleteBtn}</div>}
                >
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="receiver mb-2 flex cursor-pointer self-start hover:opacity-80"
                        onClick={() => {
                            setPlayer(msg.data.player);
                        }}
                    >
                        <Avatar
                            width={30}
                            height={30}
                            alt="receiver-avatar"
                            size="sm"
                            className="mr-2"
                            src={msg.data.player.avatar || '/100x100.png'}
                        />
                        <div className="max-w-[180px]">
                            <div className="mb-0.5 text-xs">
                                {msg.data.player.name}
                            </div>
                            <div className="message relative w-full  break-words rounded-[13px] bg-[#ffffff] px-3 py-2 text-sm text-[#000]">
                                {msg.message}
                            </div>
                        </div>
                        <div className="ml-1 self-end  text-[10px] tracking-wide text-[#46556b]">
                            <small className="time">
                                {moment(msg.time).format('HH:mm')}
                            </small>
                        </div>
                    </div>
                </Tooltip>
            )}
        </div>
    );
};

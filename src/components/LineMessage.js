import { Avatar } from '@nextui-org/react';
import * as moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useLineStore } from '../../pages';
import { MESSAGE_TYPE } from '../constants';
import { Tooltip, Button } from '@nextui-org/react';
import { IoTrashBinOutline } from 'react-icons/io5';
import { FaEye } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

export const LineMessage = (props) => {
    const store = useLineStore((state) => state);
    const [window, setWindow] = useState(false);
    const { messages, setMessages, setPlayer } = store;
    const router = useRouter();
    const intl = useIntl();
    const t = intl.messages[router.locale];

    useEffect(() => {
        setWindow(true);
    }, []);

    if (!window) {
        return null;
    }

    return (
        <DragDropContext
            onDragEnd={(result) => {
                const { source, destination } = result;

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
            }}
        >
            <Droppable droppableId="droppable-id">
                {(provided) => {
                    return (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex h-[420px] w-auto  flex-col  overflow-auto bg-[#8CABD9] p-1 scrollbar-hide"
                        >
                            {messages
                                .sort((a, b) => {
                                    if (moment(a.time).isSame(moment(b.time))) {
                                        return 0;
                                    }
                                    if (
                                        moment(a.time).isBefore(moment(b.time))
                                    ) {
                                        return -1;
                                    }
                                    if (
                                        moment(a.time).isAfter(moment(b.time))
                                    ) {
                                        return 1;
                                    }
                                })
                                .map((msg, index) => {
                                    const { type, time, read, message, id } =
                                        msg;
                                    return (
                                        <Draggable
                                            key={msg.id}
                                            draggableId={id}
                                            index={index}
                                        >
                                            {(provided) => {
                                                return (
                                                    <Fragment>
                                                        {type ===
                                                            MESSAGE_TYPE.sender && (
                                                            <Tooltip
                                                                placement="right"
                                                                className="px-2 py-2"
                                                                content={
                                                                    <div className="flex flex-col gap-y-2">
                                                                        <Button
                                                                            color="danger"
                                                                            isIconOnly
                                                                            onPress={() => {
                                                                                const nextMessages =
                                                                                    messages.filter(
                                                                                        (
                                                                                            _msg
                                                                                        ) => {
                                                                                            if (
                                                                                                msg.id !==
                                                                                                _msg.id
                                                                                            ) {
                                                                                                return _msg;
                                                                                            }
                                                                                        }
                                                                                    );
                                                                                setMessages(
                                                                                    nextMessages
                                                                                );
                                                                            }}
                                                                        >
                                                                            <IoTrashBinOutline />
                                                                        </Button>
                                                                        <Button
                                                                            color="secondary"
                                                                            isIconOnly
                                                                            onPress={() => {
                                                                                const targetIdx =
                                                                                    messages.findIndex(
                                                                                        (
                                                                                            _msg
                                                                                        ) =>
                                                                                            _msg.id ===
                                                                                            msg.id
                                                                                    );
                                                                                const nextMessages =
                                                                                    [
                                                                                        ...messages,
                                                                                    ];
                                                                                nextMessages[
                                                                                    targetIdx
                                                                                ].read =
                                                                                    !messages[
                                                                                        targetIdx
                                                                                    ]
                                                                                        .read;
                                                                                setMessages(
                                                                                    nextMessages
                                                                                );
                                                                            }}
                                                                        >
                                                                            <FaEye />
                                                                        </Button>
                                                                    </div>
                                                                }
                                                            >
                                                                <div
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                    className="mb-2 flex w-full cursor-pointer justify-end hover:opacity-80"
                                                                    onClick={() => {
                                                                        setPlayer(
                                                                            msg
                                                                                .data
                                                                                .player
                                                                        );
                                                                    }}
                                                                >
                                                                    <div className="mr-1 flex flex-col items-end gap-y-1 self-end text-[10px] tracking-wide text-[#46556b]">
                                                                        <small>
                                                                            {read
                                                                                ? t[
                                                                                      'line.message.body.read'
                                                                                  ]
                                                                                : ''}
                                                                        </small>
                                                                        <small>
                                                                            {moment(
                                                                                time
                                                                            ).format(
                                                                                'HH:mm'
                                                                            )}
                                                                        </small>{' '}
                                                                    </div>

                                                                    <div className="message relative w-full max-w-[180px] break-words rounded-[13px] bg-[#aed589] px-3 py-2 text-sm text-[#000]">
                                                                        {
                                                                            message
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Tooltip>
                                                        )}
                                                        {type ===
                                                            MESSAGE_TYPE.receiver && (
                                                            <Tooltip
                                                                placement="left"
                                                                className="px-2 py-2"
                                                                content={
                                                                    <div>
                                                                        <Button
                                                                            color="danger"
                                                                            isIconOnly
                                                                            onPress={() => {
                                                                                const nextMessages =
                                                                                    messages.filter(
                                                                                        (
                                                                                            _msg
                                                                                        ) => {
                                                                                            if (
                                                                                                msg.id !==
                                                                                                _msg.id
                                                                                            ) {
                                                                                                return _msg;
                                                                                            }
                                                                                        }
                                                                                    );
                                                                                setMessages(
                                                                                    nextMessages
                                                                                );
                                                                            }}
                                                                        >
                                                                            <IoTrashBinOutline />
                                                                        </Button>
                                                                    </div>
                                                                }
                                                            >
                                                                <div
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                    className="receiver mb-2 flex cursor-pointer self-start hover:opacity-80"
                                                                    onClick={() => {
                                                                        setPlayer(
                                                                            msg
                                                                                .data
                                                                                .player
                                                                        );
                                                                    }}
                                                                >
                                                                    <Avatar
                                                                        width={
                                                                            30
                                                                        }
                                                                        height={
                                                                            30
                                                                        }
                                                                        alt="receiver-avatar"
                                                                        size="sm"
                                                                        className="mr-2"
                                                                        src={
                                                                            msg
                                                                                .data
                                                                                .player
                                                                                .avatar ||
                                                                            '/100x100.png'
                                                                        }
                                                                    />
                                                                    <div className="max-w-[180px]">
                                                                        <div className="mb-0.5 text-xs">
                                                                            {
                                                                                msg
                                                                                    .data
                                                                                    .player
                                                                                    .name
                                                                            }
                                                                        </div>
                                                                        <div className="message relative w-full  break-words rounded-[13px] bg-[#ffffff] px-3 py-2 text-sm text-[#000]">
                                                                            {
                                                                                message
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="ml-1 self-end  text-[10px] tracking-wide text-[#46556b]">
                                                                        <small className="time">
                                                                            {moment(
                                                                                time
                                                                            ).format(
                                                                                'HH:mm'
                                                                            )}
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </Tooltip>
                                                        )}
                                                    </Fragment>
                                                );
                                            }}
                                        </Draggable>
                                    );
                                })}
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
        </DragDropContext>
    );
};

import {
    Avatar,
    Button,
    Image,
    Tooltip,
    Modal,
    useDisclosure,
    ModalContent,
    ModalBody,
} from '@nextui-org/react';
import clsx from 'clsx';
import * as moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FaEye } from 'react-icons/fa';
import { IoTrashBinOutline } from 'react-icons/io5';
import { useIntl } from 'react-intl';
import { useLineStore } from '../../pages';
import { MESSAGE_TYPE, MESSAGE_VARIANT } from '../constants';
import { track } from '../utils/tracking';
import { isMobile } from 'react-device-detect';

export const LineMessage = () => {
    const store = useLineStore((state) => state);
    const [canMount, setIsCanMount] = useState(false);
    const { messages, setMessages } = store;
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        setIsCanMount(true);
    }, []);

    if (!canMount) {
        return null;
    }

    const handleDragStart = () => {
        setIsDragging(true);
        track('event', 'drag_message', {
            event_category: 'edit',
            event_label: '拖拉訊息',
        });
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
                        id="message-container"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={clsx([
                            'min-height-[420px] relative flex h-[420px] w-auto  flex-col overflow-auto bg-[#8CABD9] p-1 pb-6 scrollbar-hide',
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
                                    isDragDisabled={isMobile}
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
    const { isOpen, onOpenChange, onOpen } = useDisclosure();
    const { messages, setMessages, setPlayer } = store;

    const handleDeleteMsg = (message) => {
        const nextMessages = messages.filter((_msg) => {
            if (message.id !== _msg.id) {
                return _msg;
            }
        });
        setMessages(nextMessages);
        track('event', 'delete_message', {
            event_category: 'edit',
            event_label: '刪除訊息',
        });
    };

    const handleRead = (message) => {
        const targetIdx = messages.findIndex((_msg) => _msg.id === message.id);
        const nextMessages = [...messages];
        nextMessages[targetIdx].read = !messages[targetIdx].read;
        setMessages(nextMessages);
        track('event', 'read_message', {
            event_category: 'edit',
            event_label: '已讀訊息',
        });
    };

    const handleTimeChange = (e, message) => {
        const { value } = e.target;
        const formatDate = moment(value).format('YYYY-MM-DD HH:mm:ss');

        const targetIdx = messages.findIndex((_msg) => _msg.id === message.id);
        const nextMessages = [...messages];

        nextMessages[targetIdx].time = formatDate;
        setMessages(nextMessages);
        track('event', 'change_message_time', {
            event_category: 'edit',
            event_label: '更改訊息時間',
        });
    };

    const renderEditingContent = (type) => (
        <div className="flex flex-col gap-y-3">
            <div className="flex gap-x-2">
                <Button
                    color="danger"
                    isIconOnly
                    onPress={() => {
                        handleDeleteMsg(msg);
                    }}
                >
                    <IoTrashBinOutline />
                </Button>
                {type === MESSAGE_TYPE.sender ? (
                    <Button
                        color="secondary"
                        isIconOnly
                        onPress={() => {
                            handleRead(msg);
                        }}
                    >
                        <FaEye />
                    </Button>
                ) : null}
            </div>
            <input
                type="datetime-local"
                value={moment(msg.time).format('YYYY-MM-DD HH:mm:ss')}
                onChange={(e) => {
                    handleTimeChange(e, msg);
                }}
            />
        </div>
    );

    const modalElem = (
        <Modal
            size="sm"
            placement="top-center"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className="mx-6 py-4 px-2"
        >
            <ModalContent>
                <ModalBody>{renderEditingContent(msg.type)}</ModalBody>
            </ModalContent>
        </Modal>
    );

    if (msg.type === MESSAGE_TYPE.sender) {
        return (
            <div>
                {modalElem}
                {msg.type === MESSAGE_TYPE.sender && (
                    <Tooltip
                        placement="right"
                        className="px-2 py-2"
                        content={renderEditingContent(msg.type)}
                    >
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="mb-2 flex w-full cursor-pointer justify-end hover:opacity-80"
                            onClick={() => {
                                if (isMobile) onOpen();
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

                            {msg.variant === MESSAGE_VARIANT.text && (
                                <div className="message relative  max-w-[180px] break-words rounded-[13px] bg-[#aed589] px-3 py-2 text-sm text-[#000]">
                                    {msg.message}
                                </div>
                            )}
                            {msg.variant === MESSAGE_VARIANT.image && (
                                <Image
                                    src={msg.message}
                                    className="relative w-full max-w-[180px] rounded-[13px]  object-cover text-sm"
                                    alt="sender upload image"
                                />
                            )}
                        </div>
                    </Tooltip>
                )}
            </div>
        );
    }

    return (
        <div>
            {modalElem}
            {msg.type === MESSAGE_TYPE.receiver && (
                <Tooltip
                    placement="left"
                    className="px-2 py-2"
                    content={renderEditingContent(msg.type)}
                >
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="receiver mb-2 flex cursor-pointer self-start hover:opacity-80"
                        onClick={() => {
                            if (isMobile) onOpen();
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
                            {msg.variant === MESSAGE_VARIANT.text && (
                                <div className="relative w-full  break-words rounded-[13px] bg-[#ffffff] px-3 py-2 text-sm text-[#000]">
                                    {msg.message}
                                </div>
                            )}
                            {msg.variant === MESSAGE_VARIANT.image && (
                                <Image
                                    src={msg.message}
                                    className="relative w-full max-w-[180px] rounded-[13px]  object-cover text-sm "
                                    alt="receiver upload image"
                                />
                            )}
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

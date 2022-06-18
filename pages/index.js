import 'antd/dist/antd.min.css';
import React, { useState } from 'react';
import styled from 'styled-components';
import { LineHeader } from '../src/components/LineHeader';
import { LineMessage } from '../src/components/LineMessage';
import { LineFooter } from '../src/components/LineFooter';
import { MESSAGE_TYPE } from '../src/constants';
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import { v4 } from 'uuid';
import { MessageForm } from '../src/components/MessageForm';
import { ReceiverForm } from '../src/components/ReceiverForm';
import html2canvas from 'html2canvas';

const ConfigsForm = (props) => {
    const { instance = null, handleEditConfigs } = props;
    const [form] = Form.useForm();
    return (
        <Form
            onFinish={(values) => {
                handleEditConfigs(values);
            }}
            form={form}
            layout="vertical"
            initialValues={{
                unReadCount: instance?.unReadCount || 5,
                unSendMessage: instance?.unSendMessage || '',
            }}
        >
            <Form.Item name="unReadCount" label="未讀訊息數量">
                <InputNumber></InputNumber>
            </Form.Item>
            <Form.Item name="unSendMessage" label="欲發送訊息">
                <Input.TextArea></Input.TextArea>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    編輯
                </Button>
            </Form.Item>
        </Form>
    );
};
export default function Home() {
    const [configs, setConfigs] = useState({
        unReadCount: 5,
        unSendMessage: '',
    });
    const [receiver, setReceiver] = useState({
        name: 'receiver name',
        avatar: 'https://fakeimg.pl/100x100/',
    });
    const [messages, setMessages] = useState([
        {
            id: v4(),
            type: MESSAGE_TYPE.badge,
            read: null,
            time: new Date('2022-06-18'),
            message: 'Today',
        },
        {
            id: v4(),
            type: MESSAGE_TYPE.sender,
            read: true,
            time: new Date(),
            message: 'sender 1',
        },
        {
            id: v4(),
            type: MESSAGE_TYPE.receiver,
            read: null,
            time: new Date(),
            message: 'receiver 1',
        },
    ]);
    const [curEditingMessage, setCurEditingMessage] = useState({
        id: v4(),
        type: MESSAGE_TYPE.receiver,
        read: null,
        time: new Date(),
        message: '',
    });

    const resetMessageEditor = () => {
        setCurEditingMessage({
            id: v4(),
            type: MESSAGE_TYPE.receiver,
            read: null,
            time: new Date(),
            message: '',
        });
    };

    const handleEditMessage = (msg) => {
        const targetIndex = messages.findIndex((_m) => _m.id === msg.id);
        if (targetIndex > -1) {
            const _cloneMessages = [...messages];
            _cloneMessages.splice(targetIndex, 1, msg);
            setMessages(_cloneMessages);
        } else {
            setMessages((prev) => [...prev, msg]);
            resetMessageEditor();
        }
    };

    const handleEditReceiver = (_receiver) => {
        setReceiver((prev) => ({
            ...prev,
            ..._receiver,
        }));
    };

    const handleEditConfigs = (_configs) => {
        setConfigs((prev) => ({
            ...prev,
            ..._configs,
        }));
    };
    function downLoadImg() {
        var _html = document.getElementById('line'); // 獲取要下載的圖片
        html2canvas(_html, {
            width: _html.clientWidth,
            height: _html.clientHeight,
            allowTaint: false,
            useCORS: true, //允許跨域
        }).then((canvas) => {
            let src = canvas.toDataURL('image/png', 1.0);
            let image = new Image();
            image.src = src;
            let url = image.src.replace(
                /^data:image\/[^;]/,
                'data:application/octet-stream'
            ); //輸出型別
            let a = document.createElement('a'); //隨便建立一個元素
            a.download = `fake-line-message-gen.png`; // 設定下載的檔名，預設是'下載'
            a.href = url;
            document.body.appendChild(a);
            a.click();
            a.remove(); // 下載之後把建立的元素刪除
        });
    }
    return (
        <Container>
            <header>
                <h1>Fake Line Message Generator</h1>
            </header>
            <div className="content">
                <div className="preview">
                    <div className="line" id="line">
                        <LineHeader
                            unReadCount={configs.unReadCount}
                            receiver={receiver}
                        />
                        <LineMessage
                            receiver={receiver}
                            messages={messages}
                            setCurEditingMessage={setCurEditingMessage}
                        />
                        <LineFooter unSendMessage={configs.unSendMessage} />
                    </div>
                    <Button
                        style={{ margin: '10px 0' }}
                        htmlType="button"
                        onClick={() => {
                            downLoadImg();
                        }}
                    >
                        匯出圖片
                    </Button>
                </div>
                <div className="configs">
                    <Row justify="space-around">
                        <Col span={7}>
                            <ConfigsForm
                                instance={configs}
                                handleEditConfigs={handleEditConfigs}
                            />
                        </Col>
                        <Col span={7}>
                            <ReceiverForm
                                instance={receiver}
                                handleEditReceiver={handleEditReceiver}
                            />
                        </Col>
                        <Col span={5}>
                            <MessageForm
                                instance={curEditingMessage}
                                handleEditMessage={handleEditMessage}
                                messages={messages}
                                resetMessageEditor={resetMessageEditor}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    --header-height: 50px;
    --content-min-height: calc(100vh - var(--header-height));
    --content-max-width: 1200px;
    width: 100%;
    min-height: 100vh;
    background-color: #eee8da;
    & > header {
        width: 100%;
        height: var(--header-height);
        background-color: #668800;
        padding: 0 20px;
        display: flex;
        align-items: center;
        & > h1 {
            letter-spacing: 2px;
            padding: 0;
            margin: 0;
            font-weight: 500;
            font-size: 24px;
            color: #eee8da;
        }
    }
    & > .content {
        padding: 20px;
        min-height: var(--content-min-height);
        overflow: auto;
        display: flex;
        flex-direction: column;
        max-width: var(--content-max-width);
        margin: 0 auto;
        & > .configs {
            width: 100%;
            border-radius: 15px;
            padding: 20px;
            margin-top: 20px;
        }
        & > .preview {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            & > .line {
                width: 480px;
                height: calc(480px * (1840 / 1080));
                --line-header-height: 60px;
                --line-footer-height: 60px;
            }
        }
    }
`;

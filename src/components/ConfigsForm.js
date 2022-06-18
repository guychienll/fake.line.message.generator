import { Button, Form, Input, InputNumber } from 'antd';
import React from 'react';

export const ConfigsForm = (props) => {
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

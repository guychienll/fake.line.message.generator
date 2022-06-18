import { Button, Form, Input, Upload } from 'antd';
import React from 'react';

export const ReceiverForm = (props) => {
    const { instance = null, handleEditReceiver } = props;
    const [form] = Form.useForm();

    return (
        <Form
            onFinish={(values) => {
                handleEditReceiver(values);
            }}
            form={form}
            layout="vertical"
            initialValues={{
                name: instance?.name || '',
                avatar: instance?.avatar || '',
            }}
        >
            <Form.Item name="name" label="接收者名稱">
                <Input />
            </Form.Item>

            <Form.Item name="avatar" label="大頭照">
                <Input />
            </Form.Item>

            <Form.Item dependencies={['avatar']}>
                {({ getFieldsValue }) => {
                    return (
                        <>
                            <input
                                style={{ marginBottom: 10 }}
                                type={'file'}
                                onChange={(e) => {
                                    const { files } = e.target;
                                    const [file] = files;
                                    const s = URL.createObjectURL(file);
                                    form.setFieldsValue({
                                        avatar: s,
                                    });
                                }}
                            />
                            {getFieldsValue().avatar && (
                                <img
                                    style={{
                                        objectFit: 'cover',
                                        width: 100,
                                        height: 100,
                                    }}
                                    src={getFieldsValue().avatar}
                                    alt="receiver-avatar"
                                />
                            )}
                        </>
                    );
                }}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    編輯
                </Button>
            </Form.Item>
        </Form>
    );
};

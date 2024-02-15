import { Button, Input } from '@nextui-org/react';
import * as React from 'react';
import { useState } from 'react';

export const ConfigsForm = (props) => {
    const { instance = null, handleEditConfigs } = props;
    const [values, setValues] = useState({
        unReadCount: instance?.unReadCount || 5,
        unSendMessage: instance?.unSendMessage || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <form
            className="flex flex-col gap-y-4"
            onSubmit={(e) => {
                e.preventDefault();
                console.log(e);
                handleEditConfigs(values);
            }}
        >
            <Input
                name="unReadCount"
                label="未讀訊息數量"
                value={values.unReadCount}
                placeholder="請輸入未讀訊息數量"
                onChange={handleChange}
            />
            <Input
                name="unSendMessage"
                label="尚未送出訊息"
                value={values.unSendMessage}
                placeholder="請輸入尚未送出的訊息"
                onChange={handleChange}
            />
            <Button size="sm" color="primary" type="submit" variant="bordered">
                編輯
            </Button>
        </form>
    );
};

import {
    Button,
    Checkbox,
    Input,
    Select,
    SelectItem,
    Textarea,
} from '@nextui-org/react';
import * as moment from 'moment';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MESSAGE_TYPE, MESSAGE_TYPE_DISPLAY } from '../constants';

export const MessageForm = (props) => {
    const { instance = null, onSubmit } = props;

    const [values, setValues] = useState({
        id: instance?.id || uuid(),
        type: instance?.type || MESSAGE_TYPE.receiver,
        time: moment(instance?.time) || moment(new Date()),
        read: instance?.read || false,
        message: instance?.message || '',
    });

    useEffect(() => {
        setValues({
            id: instance?.id || uuid(),
            type: instance?.type || MESSAGE_TYPE.receiver,
            time: moment(instance?.time) || moment(new Date()),
            read: instance?.read || false,
            message: instance?.message || '',
        });
    }, [instance]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form
            className="flex flex-col gap-y-2"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(values);
            }}
        >
            <Select
                name="type"
                label="欄位種類"
                placeholder="請選擇欄位種類"
                selectedKeys={[values.type]}
                onChange={handleChange}
            >
                {Object.values(MESSAGE_TYPE_DISPLAY).map((opt) => {
                    return (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    );
                })}
            </Select>

            {values.type === MESSAGE_TYPE.sender && (
                <Checkbox
                    name="read"
                    isSelected={values.read}
                    onChange={(e) => {
                        setValues((prev) => ({
                            ...prev,
                            read: e.target.checked,
                        }));
                    }}
                >
                    已讀
                </Checkbox>
            )}

            <Input
                name="time"
                type="datetime-local"
                label="時間"
                placeholder="請選擇時間"
                value={values.time.format('YYYY-MM-DD HH:mm:ss')}
                onChange={(e) => {
                    const date = new Date(e.target.value);
                    setValues((prev) => ({
                        ...prev,
                        time: moment(date),
                    }));
                }}
            />

            <Textarea
                name="message"
                value={values.message}
                label="訊息"
                placeholder="請輸入訊息"
                onChange={handleChange}
            />

            <Button
                fullWidth
                size="sm"
                color="primary"
                type="submit"
                variant="bordered"
            >
                編輯
            </Button>
        </form>
    );
};

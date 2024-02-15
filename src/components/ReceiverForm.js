import React, { useState } from 'react';
import { Avatar, Input, Button } from '@nextui-org/react';

export const ReceiverForm = (props) => {
    const { instance = null, handleEditReceiver } = props;
    const [values, setValues] = useState({
        name: instance?.name || '',
        avatar: instance?.avatar || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = async (e) => {
        const { files, name } = e.target;
        const [file] = files;
        setValues((prev) => ({
            ...prev,
            [name]: URL.createObjectURL(file),
        }));
    };
    return (
        <form
            className="flex flex-col gap-y-4"
            onSubmit={(e) => {
                e.preventDefault();
                handleEditReceiver(values);
            }}
        >
            <Input
                name="name"
                label="接收者名稱"
                placeholder="請入數接收者名稱"
                onChange={handleChange}
            />

            <Input
                className="hidden"
                name="avatar"
                type="file"
                id="file"
                onInput={handleFileChange}
            />

            {values.avatar ? (
                <label htmlFor="file">
                    <Avatar
                        src={values.avatar}
                        alt="receiver avatar"
                        className="h-[100px] w-[100px] cursor-pointer"
                    />
                </label>
            ) : (
                <label htmlFor="file">
                    <Avatar
                        src="/100x100.png"
                        alt="receiver avatar"
                        className="h-[100px] w-[100px] cursor-pointer"
                    />
                </label>
            )}
            <Button size="sm" color="primary" type="submit" variant="bordered">
                編輯
            </Button>
        </form>
    );
};

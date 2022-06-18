import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import React, { useEffect } from "react";
import moment from "moment";
import { v4 } from "uuid";
import { MESSAGE_TYPE, MESSAGE_TYPE_DISPLAY } from "../constants";

export const MessageForm = (props) => {
  const {
    instance = null,
    handleEditMessage,
    messages,
    resetMessageEditor,
  } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...instance,
      time: moment(instance?.time),
    });
  }, [form, instance]);

  const onFinish = (values) => {
    handleEditMessage(values);
  };

  return (
    <Form
      onFinish={onFinish}
      form={form}
      layout="vertical"
      initialValues={{
        id: instance?.id || v4(),
        type: instance?.type || MESSAGE_TYPE.receiver,
        time: moment(instance?.time) || moment(new Date()),
        read: instance?.read || null,
        message: instance?.message || "",
      }}
    >
      <Form.Item style={{ display: "none" }} name="id">
        <Input />
      </Form.Item>
      <Form.Item name="type" label="欄位種類">
        <Select>
          {Object.values(MESSAGE_TYPE_DISPLAY).map((msgOpt, index) => (
            <Select.Option key={index} value={msgOpt.value}>
              {msgOpt.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item noStyle dependencies={["type"]}>
        {({ getFieldsValue }) => {
          const values = getFieldsValue();
          const { type } = values;
          return type === MESSAGE_TYPE.sender ? (
            <Form.Item valuePropName="checked" name="read" label="已讀">
              <Checkbox />
            </Form.Item>
          ) : null;
        }}
      </Form.Item>
      <Form.Item name="time" label="時間">
        <DatePicker showTime />
      </Form.Item>
      <Form.Item name="message" label="訊息">
        <Input.TextArea />
      </Form.Item>
      <Row gutter={12}>
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              編輯
            </Button>
          </Form.Item>
        </Col>
        {messages.findIndex((msg) => msg.id === instance.id) > -1 && (
          <Col>
            <Form.Item>
              <Button
                type="outline"
                htmlType="button"
                onClick={resetMessageEditor}
              >
                取消選定
              </Button>
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  );
};

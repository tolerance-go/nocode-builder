import type { FormProps } from "antd";
import { Checkbox, Form, Input } from "antd";
import React from "react";

type FieldType = {
  username?: string;
  password?: string;
  description?: string;
  search?: string;
  remember?: boolean;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const SettingsForm: React.FC = () => (
  <div className="p-2">
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      labelAlign="left"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input a description!" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item<FieldType>
        label="Search"
        name="search"
        rules={[{ required: true, message: "Please input your search query!" }]}
      >
        <Input.Search />
      </Form.Item>

      <Form.Item<FieldType>
        label="Remember"
        name="remember"
        valuePropName="checked"
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
    </Form>
  </div>
);

export default SettingsForm;

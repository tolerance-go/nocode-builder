import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, theme } from "antd";
import React from "react";

const LoginForm: React.FC = () => {
  const onFinish = (values: unknown) => {
    console.log("Received values of form: ", values);
  };

  const { token } = theme.useToken();

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="用户名"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <Flex vertical gap={token.sizeUnit * 2}>
          <Button block type="primary" htmlType="submit">
            登录
          </Button>
          <Button block>立即注册</Button>
          <Button block type="link">
            忘记密码
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Layout, theme } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const onFinish = (values: unknown) => {
    console.log("Received values of form: ", values);
  };

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
        <Button block type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="link"
          onClick={() => {
            navigate("/entry/register");
          }}
        >
          立即注册
        </Button>
      </Form.Item>
      <Form.Item>
        <Button block type="link">
          忘记密码
        </Button>
      </Form.Item>
    </Form>
  );
};

import { userControllerCreateUser } from "@/services/api/userControllerCreateUser";
import { RegisterFormValues } from "@/types/form";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, theme } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Register: React.FC = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const onFinish = (values: RegisterFormValues) => {
    console.log("Received values of form: ", values);
    userControllerCreateUser({})
  };

  return (
    <Form<RegisterFormValues> onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入你的用户名!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="用户名"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入你的密码!" }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "请确认你的密码!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("两次输入的密码不匹配!"));
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="确认密码"
        />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          立即注册
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="link"
          htmlType="submit"
          onClick={() => {
            navigate(-1);
          }}
        >
          返回登录
        </Button>
      </Form.Item>
    </Form>
  );
};

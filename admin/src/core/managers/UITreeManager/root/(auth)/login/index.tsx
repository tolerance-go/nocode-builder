import { api } from '@/globals';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginFormValues } from '../../../types';
import { handleLoginSuccess } from './hooks';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      const { accessToken } = await api.auth.login({
        username: values.username,
        password: values.password,
      });
      handleLoginSuccess(accessToken, navigate);
    } catch (error) {
      /* empty */
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<LoginFormValues> onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入你的用户名!' }]}
      >
        <Input
          autoFocus
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="用户名"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入你的密码!' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} block type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="link"
          onClick={() => {
            navigate('/register');
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
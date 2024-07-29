import { 测试标识 } from '@/common/constants';
import { api } from '@/globals';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { use全局事件系统 } from '../../../hooks';
import { LoginFormValues } from '../../../types';
import { handleLoginSuccess } from './hooks';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const 全局事件系统实例 = use全局事件系统();

  const [loading, setLoading] = useState(false);
  const onFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      const { accessToken } = await api.auth.login({
        username: values.username,
        password: values.password,
      });
      handleLoginSuccess(
        values.username,
        accessToken,
        navigate,
        全局事件系统实例,
      );
    } catch (error) {
      /* empty */
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<LoginFormValues> onFinish={onFinish} data-test-id={测试标识.登录表单}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入你的用户名!' }]}
      >
        <Input
          autoComplete="off"
          data-test-id={测试标识.登录用户名输入框}
          autoFocus
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="用户名"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入你的密码!' }]}
      >
        <Input
          autoComplete="off"
          data-test-id={测试标识.登录密码输入框}
          prefix={<LockOutlined />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Button
          data-test-id={测试标识.登录提交按钮}
          loading={loading}
          block
          type="primary"
          htmlType="submit"
        >
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

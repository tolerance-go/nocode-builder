import { LoginResponseDto } from '@/_gen/api';
import { useAppDispatch } from '@/modules/界面状态管理器模块';
import { api } from '@/globals';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { use界面状态管理者 } from '../../../hooks';
import { RegisterFormValues } from '../../../types';
import { handleLoginSuccess } from '../login/hooks';

export const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { slices } = use界面状态管理者();

  const navigate = useNavigate();

  const onFinish = async (values: RegisterFormValues) => {
    try {
      setLoading(true);
      const result = await api.auth.register({
        username: values.username,
        password: values.password,
        autoLogin: values.autoLogin,
      });

      if (values.autoLogin) {
        const { accessToken } = result as LoginResponseDto;

        handleLoginSuccess(accessToken, navigate, dispatch, slices);
      } else {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<RegisterFormValues>
      onFinish={onFinish}
      initialValues={{
        autoLogin: true,
      }}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '用户名不能为空' }]}
      >
        <Input
          autoComplete="off"
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
          prefix={<LockOutlined />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: '请确认你的密码!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不匹配!'));
            },
          }),
        ]}
      >
        <Input
          autoComplete="off"
          prefix={<LockOutlined />}
          type="password"
          placeholder="确认密码"
        />
      </Form.Item>
      <Form.Item name="autoLogin" valuePropName="checked">
        <Checkbox>自动登录</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button loading={loading} block type="primary" htmlType="submit">
          立即注册
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="link"
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

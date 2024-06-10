import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Form,
  FormProps,
  Input,
  Modal,
  Space,
} from "antd";
import React, { useState } from "react";

const CreateAppModal: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {React.cloneElement(children, {
        onClick: () => showModal(),
      })}
      <Modal
        title="创建应用"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Divider></Divider>
          <div>
            <Form.Item<FieldType>
              label="名称"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="URL"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              help="https://yarnb.budibase.app/app/bins-app"
            >
              <Input.Password />
            </Form.Item>
          </div>

          <Flex justify="end" className="pt-6">
            <Space size={15}>
              <Button onClick={() => handleCancel()}>取消</Button>
              <Button type="primary" htmlType="submit">
                创建
              </Button>
            </Space>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default CreateAppModal;

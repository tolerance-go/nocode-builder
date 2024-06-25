import store from "@/store";
import { Button, Form, FormProps, Input, Modal, Space } from "antd";
import React, { useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CreateAppModalProps {
  onOk?: () => void;
  onCancel?: () => void;
}

export interface CreateAppModalRef {
  showModal: () => void;
  closeModal: () => void;
}

const CreateAppModal = React.forwardRef<CreateAppModalRef, CreateAppModalProps>(
  (props, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const nav = useNavigate();

    useImperativeHandle(ref, () => ({
      showModal: () => setIsModalOpen(true),
      closeModal: () => setIsModalOpen(false),
    }));

    const handleOk = () => {
      setIsModalOpen(false);
      if (props.onOk) {
        props.onOk();
      }
    };

    const handleCancel = () => {
      setIsModalOpen(false);
      if (props.onCancel) {
        props.onCancel();
      }
    };

    type FieldType = {
      name?: string;
      password?: string;
      remember?: string;
    };

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
      const id = new Date().getTime();
      store.apps.actions.addApp({
        id,
        menuTitle: values.name!,
        terminalType: "mobile"
      });
      handleCancel();
      nav(`/apps/${id}/data`);
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
      errorInfo
    ) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <Modal
        title="创建应用"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        afterClose={() => {
          form.resetFields();
        }}
      >
        <Form
          form={form}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <div className="pt-4 pb-8">
            <Form.Item<FieldType>
              label="名称"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
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
              <Input />
            </Form.Item>
          </div>

          <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button  onClick={() => handleCancel()}>取消</Button>
            <Button  type="primary" htmlType="submit">
              创建
            </Button>
          </Space>
        </Form>
      </Modal>
    );
  }
);

export default CreateAppModal;

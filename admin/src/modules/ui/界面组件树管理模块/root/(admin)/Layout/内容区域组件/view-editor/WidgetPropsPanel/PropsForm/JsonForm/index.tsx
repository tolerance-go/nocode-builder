import {
  JsonFormProps,
  JsonFormItemConfig,
} from '@/modules/ui/部件组件管理模块/types';
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Select,
  Switch,
  theme,
} from 'antd';
import React from 'react';

export const JsonForm: React.FC<JsonFormProps> = ({
  config,
  formData,
  onSubmit,
  onValuesChange,
}) => {
  const [form] = Form.useForm();

  const renderFormItem = (item: JsonFormItemConfig) => {
    switch (item.type) {
      case 'input':
        return (
          <Input placeholder={item.placeholder} maxLength={item.maxLength} />
        );
      case 'select':
        return (
          <Select placeholder={item.placeholder}>
            {item.options.map((option) => (
              <Select.Option key={String(option.value)} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        );
      case 'switch':
        return (
          <Switch
            checkedChildren={item.checkedChildren}
            unCheckedChildren={item.unCheckedChildren}
          />
        );
      default:
        return null;
    }
  };

  const handleFinish = (values: Record<string, unknown>) => {
    onSubmit?.(values);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.compactAlgorithm, theme.darkAlgorithm],
      }}
    >
      <Form
        form={form}
        variant="filled"
        labelAlign="left"
        requiredMark={false}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        initialValues={formData}
        onFinish={handleFinish}
        onValuesChange={onValuesChange}
        autoComplete="off"
      >
        {config.map((item) => (
          <Form.Item
            key={item.name}
            name={item.name}
            label={item.label}
            rules={item.rules}
            valuePropName={item.type === 'switch' ? 'checked' : 'value'}
          >
            {renderFormItem(item)}
          </Form.Item>
        ))}
        {onSubmit && (
          <Form.Item>
            <Button
              data-testid="json-form_submit-btn"
              type="primary"
              htmlType="submit"
            >
              提交
            </Button>
          </Form.Item>
        )}
      </Form>
    </ConfigProvider>
  );
};

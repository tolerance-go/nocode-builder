import React from "react";
import {
  Form,
  Input,
  Select,
  Checkbox,
  DatePicker,
  InputNumber,
  Switch,
} from "antd";
import { FormInstance } from "antd/lib/form";

const { Option } = Select;

interface BaseSettingConfig {
  label: string;
  name: string;
}

interface TextSettingConfig extends BaseSettingConfig {
  type: "text";
  defaultValue?: string;
}

interface SelectSettingConfig extends BaseSettingConfig {
  type: "select";
  defaultValue?: string;
  options: string[];
}

interface CheckboxSettingConfig extends BaseSettingConfig {
  type: "checkbox";
  defaultValue?: boolean;
}

interface DateSettingConfig extends BaseSettingConfig {
  type: "date";
  defaultValue?: Date;
}

interface NumberSettingConfig extends BaseSettingConfig {
  type: "number";
  defaultValue?: number;
}

interface SwitchSettingConfig extends BaseSettingConfig {
  type: "switch";
  defaultValue?: boolean;
}

export type SettingConfig =
  | TextSettingConfig
  | SelectSettingConfig
  | CheckboxSettingConfig
  | DateSettingConfig
  | NumberSettingConfig
  | SwitchSettingConfig;

interface SettingsFormProps {
  settings: SettingConfig[];
  form?: FormInstance;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ settings, form }) => {
  const renderFormItem = (setting: SettingConfig) => {
    switch (setting.type) {
      case "text":
        return <Input defaultValue={setting.defaultValue} />;
      case "select":
        return (
          <Select defaultValue={setting.defaultValue}>
            {setting.options.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        );
      case "checkbox":
        return <Checkbox defaultChecked={setting.defaultValue} />;
      case "date":
        return <DatePicker defaultValue={setting.defaultValue} />;
      case "number":
        return <InputNumber defaultValue={setting.defaultValue} />;
      case "switch":
        return <Switch defaultChecked={setting.defaultValue} />;
      default:
        return null;
    }
  };

  return (
    <Form form={form} layout="vertical">
      {settings.map((setting) => (
        <Form.Item key={setting.name} label={setting.label} name={setting.name}>
          {renderFormItem(setting)}
        </Form.Item>
      ))}
    </Form>
  );
};

export default SettingsForm;

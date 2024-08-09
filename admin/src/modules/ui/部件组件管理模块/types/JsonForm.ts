import { FormRule } from 'antd';

interface BaseFormItemConfig {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  rules?: FormRule[];
}

interface InputFormItemConfig extends BaseFormItemConfig {
  type: 'input';
  maxLength?: number;
}

interface SelectFormItemConfig extends BaseFormItemConfig {
  type: 'select';
  options: Option[];
}

interface SwitchFormItemConfig extends BaseFormItemConfig {
  type: 'switch';
  checkedChildren?: string; // 开启时显示的内容
  unCheckedChildren?: string; // 关闭时显示的内容
}

export type JsonFormItemConfig =
  | InputFormItemConfig
  | SelectFormItemConfig
  | SwitchFormItemConfig;

export type JsonFormConfig = JsonFormItemConfig[];

interface Option {
  label: string;
  value: unknown;
}

export interface JsonFormProps {
  config: JsonFormConfig;
  formData?: Record<string, unknown>;
  onSubmit?: (values: Record<string, unknown>) => void;
  onValuesChange?: (
    changedValues: Record<string, unknown>,
    allValues: Record<string, unknown>,
  ) => void;
}

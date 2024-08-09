import { JsonFormConfig, JsonValue } from 'src/types';
import Ajv, { JSONSchemaType, ValidationError } from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';

// 创建 AJV 实例
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv);

export type NameKey = string;

interface ButtonProps {
  text?: string; // 将 text 设置为可选
}

const buttonDefaultProps: Record<NameKey, JsonValue> = {
  text: 'Button',
} satisfies ButtonProps;

const buttonSchema: JSONSchemaType<ButtonProps> = {
  type: 'object',
  properties: {
    text: { type: 'string', nullable: true },
  },
  required: [], // 不再指定 text 为必填项
  additionalProperties: false,
  errorMessage: {
    properties: {
      text: '文本属性必须是字符串类型',
    },
    additionalProperties: '不允许额外的属性',
  },
};

const buttonFormConfig: JsonFormConfig = [
  {
    name: 'text',
    label: '文本',
    type: 'input',
  },
];

// 定义组件类型
interface Component<Props> {
  defaultProps: Record<NameKey, JsonValue>;
  schema: JSONSchemaType<Props>;
  formConfig: JsonFormConfig;
}

interface Antd {
  Button: Component<ButtonProps>;
}

export { JSONSchemaType };

export const validateComponentProps = <T, D>(
  schema: JSONSchemaType<T>,
  data: D,
): T => {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    throw new ValidationError(validate.errors ?? []);
  }
  return data as T;
};

export const antdProps: Antd = {
  Button: {
    defaultProps: buttonDefaultProps,
    schema: buttonSchema,
    formConfig: buttonFormConfig,
  },
};

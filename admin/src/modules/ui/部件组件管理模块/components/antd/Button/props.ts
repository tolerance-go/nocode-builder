import { JSONSchemaType } from 'ajv';
import { NameKey } from '../../../types/component';
import { JsonValue, JsonFormConfig } from '../../../types';

export interface ButtonPropsType {
  text?: string; // 将 text 设置为可选
}

export const buttonDefaultProps: Record<NameKey, JsonValue> = {
  text: 'Button',
} satisfies ButtonPropsType;

export const buttonSchema: JSONSchemaType<ButtonPropsType> = {
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

export const buttonFormConfig: JsonFormConfig = [
  {
    name: 'text',
    label: '文本',
    type: 'input',
  },
];

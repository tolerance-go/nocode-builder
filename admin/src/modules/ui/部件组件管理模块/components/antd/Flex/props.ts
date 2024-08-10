import { JSONSchemaType } from 'ajv';
import { NameKey } from '../../../types/component';
import { JsonValue, JsonFormConfig } from '../../../types';

export interface FlexPropsType {
  vertical?: boolean; // 可选的布尔属性，指示是否垂直排列
}

export const flexDefaultProps: Record<NameKey, JsonValue> =
  {} satisfies FlexPropsType;

export const flexSchema: JSONSchemaType<FlexPropsType> = {
  type: 'object',
  properties: {
    vertical: { type: 'boolean', nullable: true }, // 可选的布尔属性
  },
  required: [], // 没有必填项
  additionalProperties: false, // 不允许额外属性
  errorMessage: {
    properties: {
      vertical: '垂直属性必须是布尔类型',
    },
    additionalProperties: '不允许额外的属性',
  },
};

export const flexFormConfig: JsonFormConfig = [
  {
    name: 'vertical',
    label: '垂直排列',
    type: 'switch', // 表示这是一个开关（布尔值）配置项
  },
];

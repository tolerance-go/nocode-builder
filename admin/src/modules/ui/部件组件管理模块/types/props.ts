import { JSONSchemaType } from 'ajv';
import { JsonFormConfig, JsonValue } from '.';

export type NameKey = string;

// 定义组件类型
export interface Component<Props> {
  defaultProps: Record<NameKey, JsonValue>;
  schema: JSONSchemaType<Props>;
  formConfig: JsonFormConfig;
}

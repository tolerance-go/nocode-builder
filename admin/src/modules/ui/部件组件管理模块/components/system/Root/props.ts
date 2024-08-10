import { JSONSchemaType } from 'ajv';
import { NameKey } from '../../../types/component';
import { JsonValue, JsonFormConfig } from '../../../types';

export interface RootPropsType {}

export const rootDefaultProps: Record<NameKey, JsonValue> =
  {} satisfies RootPropsType;

export const rootSchema: JSONSchemaType<RootPropsType> = {
  type: 'object',
};

export const rootFormConfig: JsonFormConfig = [];

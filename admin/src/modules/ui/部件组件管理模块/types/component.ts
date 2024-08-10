import { JSONSchemaType } from 'ajv';
import {
  EditModeProps,
  JsonFormConfig,
  JsonValue,
  PreviewModeProps,
  StagePreviewModeProps,
  WidgetCompApis,
} from '.';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export type NameKey = string;

export type WidgetComponent<T extends WidgetCompApis> =
  ForwardRefExoticComponent<
    (
      | Omit<PreviewModeProps, 'ref'>
      | Omit<EditModeProps, 'ref'>
      | Omit<StagePreviewModeProps, 'ref'>
    ) &
      RefAttributes<T>
  >;

// 定义组件类型
export interface ComponentConfigs<PropsValues, Slots> {
  name: string;
  defaultProps: Record<NameKey, JsonValue>;
  schema: JSONSchemaType<PropsValues>;
  formConfig: JsonFormConfig;
  slots: Slots;
  component: WidgetComponent<WidgetCompApis>;
}

export interface LibConfigs {
  name: string;
  components: ComponentConfigs<
    Record<string, JsonValue | undefined>,
    Record<string, string>
  >[];
}

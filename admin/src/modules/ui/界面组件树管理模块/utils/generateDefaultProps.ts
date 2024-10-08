import { WidgetPropResponseDto } from '@/_gen/api';
import { WidgetPropValueTypeEnum } from '@/_gen/models';
import { JsonValue } from '@/common/types';

export const generateDefaultProps = (
  props: Array<
    Pick<
      WidgetPropResponseDto,
      | 'key'
      | 'valueType'
      | 'boolValue'
      | 'numberValue'
      | 'stringValue'
      | 'jsonValue'
    >
  >,
): Record<string, JsonValue | undefined> => {
  return props.reduce(
    (prev, cur) => {
      let value;

      if (cur.valueType === WidgetPropValueTypeEnum.Boolean) {
        value = cur.boolValue;
      } else if (cur.valueType === WidgetPropValueTypeEnum.Number) {
        value = cur.numberValue;
      } else if (cur.valueType === WidgetPropValueTypeEnum.String) {
        value = cur.stringValue;
      } else if (cur.valueType === WidgetPropValueTypeEnum.Json) {
        value = cur.jsonValue as JsonValue | undefined;
      } else {
        throw new Error(`Unknown value type: ${cur.valueType}`);
      }

      return {
        ...prev,
        [cur.key]: value,
      };
    },
    {} as Record<string, JsonValue | undefined>,
  );
};

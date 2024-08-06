import { WidgetDisplayEnum } from '@/_gen/models';

export const widgetDisplayEnumToCssValue = (
  displayEnum: WidgetDisplayEnum,
): string => {
  switch (displayEnum) {
    case WidgetDisplayEnum.Block:
      return 'block';
    case WidgetDisplayEnum.InlineBlock:
      return 'inline-block';
    case WidgetDisplayEnum.Flex:
      return 'flex';
    case WidgetDisplayEnum.InlineFlex:
      return 'inline-flex';
    case WidgetDisplayEnum.Grid:
      return 'grid';
    case WidgetDisplayEnum.InlineGrid:
      return 'inline-grid';
    case WidgetDisplayEnum.Table:
      return 'table';
    default:
      throw new Error(`Unknown WidgetDisplayEnum value: ${displayEnum}`);
  }
};

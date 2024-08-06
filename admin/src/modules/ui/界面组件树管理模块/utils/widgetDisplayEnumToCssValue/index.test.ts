import { describe, it, expect } from 'vitest';
import { WidgetDisplayEnum } from '@/_gen/models';
import { widgetDisplayEnumToCssValue } from '.';

describe('widgetDisplayEnumToCssValue', () => {
  it('应正确转换 Block 枚举值', () => {
    expect(widgetDisplayEnumToCssValue(WidgetDisplayEnum.Block)).toBe('block');
  });

  it('应正确转换 InlineBlock 枚举值', () => {
    expect(widgetDisplayEnumToCssValue(WidgetDisplayEnum.InlineBlock)).toBe(
      'inline-block',
    );
  });

  it('应正确转换 Flex 枚举值', () => {
    expect(widgetDisplayEnumToCssValue(WidgetDisplayEnum.Flex)).toBe('flex');
  });

  it('应正确转换 InlineFlex 枚举值', () => {
    expect(widgetDisplayEnumToCssValue(WidgetDisplayEnum.InlineFlex)).toBe(
      'inline-flex',
    );
  });

  it('应正确转换 Grid 枚举值', () => {
    expect(widgetDisplayEnumToCssValue(WidgetDisplayEnum.Grid)).toBe('grid');
  });

  it('应正确转换 InlineGrid 枚举值', () => {
    expect(widgetDisplayEnumToCssValue(WidgetDisplayEnum.InlineGrid)).toBe(
      'inline-grid',
    );
  });

  it('应正确转换 Table 枚举值', () => {
    expect(widgetDisplayEnumToCssValue(WidgetDisplayEnum.Table)).toBe('table');
  });

  it('应在传入未知枚举值时抛出错误', () => {
    expect(() =>
      widgetDisplayEnumToCssValue('Unknown' as WidgetDisplayEnum),
    ).toThrowError('Unknown WidgetDisplayEnum value: Unknown');
  });
});

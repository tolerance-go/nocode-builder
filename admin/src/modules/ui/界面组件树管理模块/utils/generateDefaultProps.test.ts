import { WidgetPropResponseDto } from '@/_gen/api';
import { WidgetPropValueTypeEnum } from '@/_gen/models';
import { describe, expect, it } from 'vitest';
import { generateDefaultProps } from './generateDefaultProps';
import { JsonObject } from '@/common/types';

describe('generateDefaultProps', () => {
  it('应正确生成布尔类型的属性', () => {
    const props: Array<
      Pick<WidgetPropResponseDto, 'key' | 'valueType' | 'boolValue'>
    > = [
      {
        key: 'isVisible',
        valueType: WidgetPropValueTypeEnum.Boolean,
        boolValue: true,
      },
    ];

    const result = generateDefaultProps(props);
    expect(result).toEqual({ isVisible: true });
  });

  it('应正确生成数字类型的属性', () => {
    const props: Array<
      Pick<WidgetPropResponseDto, 'key' | 'valueType' | 'numberValue'>
    > = [
      {
        key: 'width',
        valueType: WidgetPropValueTypeEnum.Number,
        numberValue: 100,
      },
    ];

    const result = generateDefaultProps(props);
    expect(result).toEqual({ width: 100 });
  });

  it('应正确生成字符串类型的属性', () => {
    const props: Array<
      Pick<WidgetPropResponseDto, 'key' | 'valueType' | 'stringValue'>
    > = [
      {
        key: 'text',
        valueType: WidgetPropValueTypeEnum.String,
        stringValue: '按钮',
      },
    ];

    const result = generateDefaultProps(props);
    expect(result).toEqual({ text: '按钮' });
  });

  it('应正确生成 JSON 类型的属性', () => {
    const props: Array<
      Pick<WidgetPropResponseDto, 'key' | 'valueType' | 'jsonValue'>
    > = [
      {
        key: 'data',
        valueType: WidgetPropValueTypeEnum.Json,
        jsonValue: { foo: 'bar' } as JsonObject,
      },
    ];

    const result = generateDefaultProps(props);
    expect(result).toEqual({ data: { foo: 'bar' } });
  });

  it('应在未知类型时抛出错误', () => {
    const props: Array<Pick<WidgetPropResponseDto, 'key' | 'valueType'>> = [
      { key: 'unknown', valueType: 'UnknownType' as WidgetPropValueTypeEnum },
    ];

    expect(() => generateDefaultProps(props)).toThrowError(
      'Unknown value type: UnknownType',
    );
  });

  it('应正确处理混合类型的属性', () => {
    const props: Array<
      Pick<
        WidgetPropResponseDto,
        | 'key'
        | 'valueType'
        | 'boolValue'
        | 'numberValue'
        | 'stringValue'
        | 'jsonValue'
      >
    > = [
      {
        key: 'isVisible',
        valueType: WidgetPropValueTypeEnum.Boolean,
        boolValue: true,
      },
      {
        key: 'width',
        valueType: WidgetPropValueTypeEnum.Number,
        numberValue: 100,
      },
      {
        key: 'text',
        valueType: WidgetPropValueTypeEnum.String,
        stringValue: '按钮',
      },
      {
        key: 'data',
        valueType: WidgetPropValueTypeEnum.Json,
        jsonValue: { foo: 'bar' } as JsonObject,
      },
    ];

    const result = generateDefaultProps(props);
    expect(result).toEqual({
      isVisible: true,
      width: 100,
      text: '按钮',
      data: { foo: 'bar' },
    });
  });
});

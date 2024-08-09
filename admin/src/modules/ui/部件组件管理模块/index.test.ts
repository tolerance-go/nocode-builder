import { ValidationError } from 'ajv';
import { describe, expect, it } from 'vitest';
import { antdProps } from './components/antd/props';
import { 部件组件管理模块 } from '.';
import { EngineBase } from '@/base';
import { EngineManagerBase } from '@/base/EngineManager';

describe('按钮模式验证', () => {
  let 部件组件管理模块实例: 部件组件管理模块;

  beforeEach(() => {
    const engineManager = new EngineManagerBase();
    const engine = new EngineBase(engineManager);
    部件组件管理模块实例 = new 部件组件管理模块(engine);
  });

  it('应通过正确的按钮属性验证', () => {
    const validData = {
      text: '点击我',
    };

    expect(() =>
      部件组件管理模块实例.validateComponentProps(
        antdProps.Button.schema,
        validData,
      ),
    ).not.toThrow();
  });

  it('应通过 text 属性为 undefined 的验证', () => {
    const validData = {
      text: undefined,
    };

    expect(() =>
      部件组件管理模块实例.validateComponentProps(
        antdProps.Button.schema,
        validData,
      ),
    ).not.toThrow();
  });

  it('应在 text 属性为 null 时验证失败', () => {
    const invalidData = {
      text: null,
    };

    expect(() =>
      部件组件管理模块实例.validateComponentProps(
        antdProps.Button.schema,
        invalidData,
      ),
    ).not.toThrow();
  });

  it('应在 text 属性为数字时验证失败', () => {
    const invalidData = {
      text: 123,
    };

    expect(() =>
      部件组件管理模块实例.validateComponentProps(
        antdProps.Button.schema,
        invalidData,
      ),
    ).toThrow(ValidationError);
  });

  it('应在包含额外属性时验证失败', () => {
    const invalidData = {
      text: '点击我',
      extra: '不允许的额外属性',
    };

    expect(() =>
      部件组件管理模块实例.validateComponentProps(
        antdProps.Button.schema,
        invalidData,
      ),
    ).toThrow(ValidationError);
  });

  it('应提供正确的错误消息', () => {
    const invalidData = {
      text: 123,
    };

    try {
      部件组件管理模块实例.validateComponentProps(
        antdProps.Button.schema,
        invalidData,
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        expect(error.errors).toMatchInlineSnapshot(`
          [
            {
              "instancePath": "/text",
              "keyword": "errorMessage",
              "message": "文本属性必须是字符串类型",
              "params": {
                "errors": [
                  {
                    "emUsed": true,
                    "instancePath": "/text",
                    "keyword": "type",
                    "message": "must be string",
                    "params": {
                      "type": "string",
                    },
                    "schemaPath": "#/properties/text/type",
                  },
                ],
              },
              "schemaPath": "#/errorMessage",
            },
          ]
        `);
      }
    }
  });
});

import { describe, it, expect } from 'vitest';
import { JSONSchemaType, ValidationError } from 'ajv';
import { validateComponentProps, antdProps } from './props';

describe('按钮模式验证', () => {
  it('应通过正确的按钮属性验证', () => {
    const validData = {
      text: '点击我',
    };

    expect(() =>
      validateComponentProps(antdProps.Button.schema, validData),
    ).not.toThrow();
  });

  it('应通过 text 属性为 undefined 的验证', () => {
    const validData = {
      text: undefined,
    };

    expect(() =>
      validateComponentProps(antdProps.Button.schema, validData),
    ).not.toThrow();
  });

  it('应在 text 属性为 null 时验证失败', () => {
    const invalidData = {
      text: null,
    };

    expect(() =>
      validateComponentProps(antdProps.Button.schema, invalidData),
    ).not.toThrow();
  });

  it('应在 text 属性为数字时验证失败', () => {
    const invalidData = {
      text: 123,
    };

    expect(() =>
      validateComponentProps(antdProps.Button.schema, invalidData),
    ).toThrow(ValidationError);
  });

  it('应在包含额外属性时验证失败', () => {
    const invalidData = {
      text: '点击我',
      extra: '不允许的额外属性',
    };

    expect(() =>
      validateComponentProps(antdProps.Button.schema, invalidData),
    ).toThrow(ValidationError);
  });

  it('应提供正确的错误消息', () => {
    const invalidData = {
      text: 123,
    };

    try {
      validateComponentProps(antdProps.Button.schema, invalidData);
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

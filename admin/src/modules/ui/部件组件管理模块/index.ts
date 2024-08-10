import { EngineBase, ModuleBase } from '@/base';
import { JsonFormConfig } from './types';

import Ajv, { JSONSchemaType, ValidationError } from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import { antdConfigs } from './components/antd';
import { systemConfigs } from './components/system';

export class 部件组件管理模块 extends ModuleBase {
  private static instance: 部件组件管理模块;

  public static getInstance(engine: EngineBase): 部件组件管理模块 {
    if (!部件组件管理模块.instance) {
      部件组件管理模块.instance = new 部件组件管理模块(engine);
    }

    return 部件组件管理模块.instance;
  }

  libs = [antdConfigs, systemConfigs];

  private ajv: Ajv;

  constructor(engine: EngineBase) {
    super(engine);

    // 创建 AJV 实例
    const ajv = new Ajv({ allErrors: true });
    addFormats(ajv);
    addErrors(ajv);

    this.ajv = ajv;
  }

  public validateComponentProps<T, D>(schema: JSONSchemaType<T>, data: D): T {
    const validate = this.ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
      throw new ValidationError(validate.errors ?? []);
    }
    return data as T;
  }

  public isComponentRegistered(lib: string, name: string): boolean {
    return this.findWidgetConfigs(lib, name) !== undefined;
  }

  public getWidgetComponent(lib: string, name: string) {
    return this.getWidgetConfigs(lib, name).component;
  }

  public getWidgetFormConfig(lib: string, name: string): JsonFormConfig {
    return this.getWidgetConfigs(lib, name).formConfig;
  }

  public getWidgetPropsSchema(lib: string, name: string) {
    return this.getWidgetConfigs(lib, name).schema;
  }

  public getComponentDefaultProps(lib: string, name: string) {
    return this.getWidgetConfigs(lib, name).defaultProps;
  }

  public getWidgetConfigs(lib: string, name: string) {
    const configs = this.findWidgetConfigs(lib, name);

    if (configs) {
      return configs;
    }

    throw new Error(`Component ${name} from library ${lib} not found`);
  }

  private findWidgetConfigs(lib: string, name: string) {
    const library = this.libs.find((l) => l.name === lib);

    if (library) {
      const component = library.components.find((c) => c.name === name);

      if (component) {
        return component;
      }
    }
  }
}

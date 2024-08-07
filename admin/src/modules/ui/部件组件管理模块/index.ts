import { EngineBase, ModuleBase } from '@/base';
import {
  RootComponentName,
  SystemWidgetLibName,
} from '@/common/constants/components';
import { antdProps, JsonFormConfig, JSONSchemaType } from '@unocode/common';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { Button as AntdButton, Flex as AntdFlex } from './components/antd';
import { Root } from './components/Root';
import { EditModeProps, PreviewModeProps } from './types';

export type HTMLComponent<T extends HTMLElement> = ForwardRefExoticComponent<
  (Omit<PreviewModeProps, 'ref'> | Omit<EditModeProps, 'ref'>) &
    RefAttributes<T>
>;

type Component =
  | HTMLComponent<HTMLButtonElement>
  | HTMLComponent<HTMLDivElement>;

export class 部件组件管理模块 extends ModuleBase {
  private static instance: 部件组件管理模块;

  public static getInstance(engine: EngineBase): 部件组件管理模块 {
    if (!部件组件管理模块.instance) {
      部件组件管理模块.instance = new 部件组件管理模块(engine);
    }

    return 部件组件管理模块.instance;
  }

  private componentRegistry: Map<string, Map<string, Component>>;
  private propsFormConfigRegistry: Map<string, Map<string, JsonFormConfig>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private propsSchemaRegistry: Map<string, Map<string, JSONSchemaType<any>>>;

  constructor(engine: EngineBase) {
    super(engine);
    this.componentRegistry = new Map();
    this.propsFormConfigRegistry = new Map();
    this.propsSchemaRegistry = new Map();
  }

  public getWidgetComponent(lib: string, name: string): Component {
    const library = this.componentRegistry.get(lib);
    const component = library ? library.get(name) : undefined;
    if (!component) {
      throw new Error(`Component ${name} from library ${lib} not found`);
    }
    return component;
  }

  public getWidgetFormConfig(
    lib: string,
    name: string,
  ): JsonFormConfig | undefined {
    const library = this.propsFormConfigRegistry.get(lib);
    return library ? library.get(name) : undefined;
  }

  public getWidgetPropsSchema(
    lib: string,
    name: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): JSONSchemaType<any> {
    const library = this.propsSchemaRegistry.get(lib);
    if (library) {
      const schema = library.get(name);
      if (schema) {
        return schema;
      }
    }
    throw new Error(`Props schema ${name} from library ${lib} not found`);
  }

  public isComponentRegistered(lib: string, name: string): boolean {
    const library = this.componentRegistry.get(lib);
    return library ? library.has(name) : false;
  }

  public isFormConfigRegistered(lib: string, name: string): boolean {
    const library = this.propsFormConfigRegistry.get(lib);
    return library ? library.has(name) : false;
  }

  public isPropsSchemaRegistered(lib: string, name: string): boolean {
    const library = this.propsSchemaRegistry.get(lib);
    return library ? library.has(name) : false;
  }

  protected async onSetup(): Promise<void> {
    this.registerComponentToWidget(
      SystemWidgetLibName,
      RootComponentName,
      Root,
    );
    this.registerComponentToWidget('antd', 'Button', AntdButton);
    this.registerFormConfigToWidget(
      'antd',
      'Button',
      antdProps.Button.formConfig,
    );
    this.registerPropsSchemaToWidget('antd', 'Button', antdProps.Button.schema);

    this.registerComponentToWidget('antd', 'Flex', AntdFlex);
  }

  private registerComponentToWidget(
    lib: string,
    name: string,
    component: Component,
  ): void {
    if (!this.componentRegistry.has(lib)) {
      this.componentRegistry.set(lib, new Map());
    }

    const library = this.componentRegistry.get(lib);
    if (library) {
      library.set(name, component);
    }
  }

  private registerFormConfigToWidget(
    lib: string,
    name: string,
    formConfig: JsonFormConfig,
  ): void {
    if (!this.propsFormConfigRegistry.has(lib)) {
      this.propsFormConfigRegistry.set(lib, new Map());
    }

    const library = this.propsFormConfigRegistry.get(lib);
    if (library) {
      library.set(name, formConfig);
    }
  }

  private registerPropsSchemaToWidget(
    lib: string,
    name: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema: JSONSchemaType<any>,
  ): void {
    if (!this.propsSchemaRegistry.has(lib)) {
      this.propsSchemaRegistry.set(lib, new Map());
    }

    const library = this.propsSchemaRegistry.get(lib);
    if (library) {
      library.set(name, schema);
    }
  }
}

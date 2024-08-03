import { EngineBase, ModuleBase } from '@/base';
import { Button as AntdButton, Flex as AntdFlex } from './components/antd';
import { FC } from 'react';
import { WidgetComponentProps } from './types';

export class 部件组件管理模块 extends ModuleBase {
  private static instance: 部件组件管理模块;

  public static getInstance(engine: EngineBase): 部件组件管理模块 {
    if (!部件组件管理模块.instance) {
      部件组件管理模块.instance = new 部件组件管理模块(engine);
    }

    return 部件组件管理模块.instance;
  }

  private componentRegistry: Map<string, Map<string, FC<WidgetComponentProps>>>;

  constructor(engine: EngineBase) {
    super(engine);
    this.componentRegistry = new Map();
  }

  public getWidgetComponent(
    lib: string,
    name: string,
  ): FC<WidgetComponentProps> {
    const library = this.componentRegistry.get(lib);
    const component = library ? library.get(name) : undefined;
    if (!component) {
      throw new Error(`Component ${name} from library ${lib} not found`);
    }
    return component;
  }

  protected async onSetup(): Promise<void> {
    this.registerComponentToWidget('antd', 'Button', AntdButton);
    this.registerComponentToWidget('antd', 'Flex', AntdFlex);
  }

  private registerComponentToWidget(
    lib: string,
    name: string,
    component: FC<WidgetComponentProps>,
  ): void {
    if (!this.componentRegistry.has(lib)) {
      this.componentRegistry.set(lib, new Map());
    }

    const library = this.componentRegistry.get(lib);
    if (library) {
      library.set(name, component);
    }
  }
}

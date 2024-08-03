import { EngineBase, ModuleBase } from '@/base';
import { 界面状态仓库模块 } from '../ui/界面状态仓库模块';

export class 浏览器环境程序接口模块 extends ModuleBase {
  private static instance: 浏览器环境程序接口模块;

  public static getInstance(engine: EngineBase): 浏览器环境程序接口模块 {
    if (!浏览器环境程序接口模块.instance) {
      浏览器环境程序接口模块.instance = new 浏览器环境程序接口模块(engine);
    }

    if (import.meta.env.DEV || window.Cypress) {
      window['浏览器环境程序接口模块'] = 浏览器环境程序接口模块.instance;
    }

    return 浏览器环境程序接口模块.instance;
  }

  constructor(engine: EngineBase) {
    super(engine);
  }

  向舞台添加组件(libName: string, componentName: string) {}

  protected async onSetup(): Promise<void> {}

  protected requireModules(): void {
    super.requireModules(界面状态仓库模块.getInstance(this.engine));
  }
}

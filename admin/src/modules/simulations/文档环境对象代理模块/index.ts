import { 事件中心系统 } from '../../事件中心系统';
import { EngineBase, ModuleBase } from '@/base';

export class 文档环境对象代理模块 extends ModuleBase {
  private static instance: 文档环境对象代理模块;

  public static getInstance(
    engine: EngineBase,
    document: Document,
  ): 文档环境对象代理模块 {
    if (!文档环境对象代理模块.instance) {
      文档环境对象代理模块.instance = new 文档环境对象代理模块(
        engine,
        document,
      );
    }

    return 文档环境对象代理模块.instance;
  }

  private document: Document;

  public constructor(engine: EngineBase, document: Document) {
    super(engine);
    this.document = document;
  }

  protected requireModules() {
    const 全局事件系统实例 = 事件中心系统.getInstance(this.engine);
    super.requireModules(全局事件系统实例);
  }

  protected async onStart(): Promise<void> {
    this.addPageLoadCompleteEventListener();
  }

  private addPageLoadCompleteEventListener() {
    const 全局事件系统实例 = this.getDependModule(事件中心系统);
    if (document.readyState === 'loading') {
      // 添加事件监听器，当页面完全加载时触发
      this.document.addEventListener('DOMContentLoaded', () => {
        全局事件系统实例.emit('文档环境/pageLoadComplete', undefined);
      });
    } else {
      全局事件系统实例.emit('文档环境/pageLoadComplete', undefined);
    }
  }
}

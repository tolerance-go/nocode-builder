import { 全局事件系统 } from '../全局事件系统';
import { EngineBase, ModuleBase } from '@/base';

export class 文档环境模块 extends ModuleBase {
  private document: Document;

  public constructor(engine: EngineBase, document: Document) {
    super(engine);
    this.document = document;
  }

  protected requireModules() {
    const 全局事件系统实例 = this.engine.getModuleOrCreate(全局事件系统);
    super.requireModules(全局事件系统实例);
  }

  protected async onStart(): Promise<void> {
    this.addPageLoadCompleteEventListener();
  }

  private addPageLoadCompleteEventListener() {
    const 全局事件系统实例 = this.getDependModule(全局事件系统);
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

import { 全局事件系统 } from '../全局事件系统';
import { EngineBase, ModuleBase } from '@/base';

export class 文档环境模块 extends ModuleBase {
  private document: Document;

  public constructor(engine: EngineBase, document: Document) {
    super(engine);
    this.document = document;
  }

  protected requireModules() {
    const item = this.engine.getModuleOrCreate(全局事件系统);
    item.b = 1;
    debugger;
    super.requireModules(item);
  }

  protected async onStart(): Promise<void> {
    this.addPageLoadCompleteEventListener();
  }

  private addPageLoadCompleteEventListener() {
    const item = this.getDependModule(全局事件系统);
    item.c = 1;
    debugger;
    if (document.readyState === 'loading') {
      // 添加事件监听器，当页面完全加载时触发
      this.document.addEventListener('DOMContentLoaded', () => {
        item.emit('文档环境/pageLoadComplete', undefined);
      });
    } else {
      item.emit('文档环境/pageLoadComplete', undefined);
    }
  }
}

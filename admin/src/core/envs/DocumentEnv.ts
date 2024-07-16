import { EnvObjectBase } from '../base';
import { 全局事件系统 } from '../systems';

export class 文档环境 extends EnvObjectBase {
  private _document?: Document;

  public constructor(document: Document) {
    super();
    this._document = document;
  }

  requires(全局事件系统实例: 全局事件系统): this {
    return super.requires(全局事件系统实例);
  }

  public get document() {
    if (!this._document) {
      throw new Error('document 非法。');
    }
    return this._document;
  }

  protected async onSetup(): Promise<void> {
    this.addPageLoadCompleteEventListener();
  }

  private addPageLoadCompleteEventListener() {
    if (document.readyState === 'loading') {
      // 添加事件监听器，当页面完全加载时触发
      this.document.addEventListener('DOMContentLoaded', () => {
        this.requireActor(全局事件系统).emit(
          '文档环境/pageLoadComplete',
          undefined,
        );
      });
    } else {
      this.requireActor(全局事件系统).emit(
        '文档环境/pageLoadComplete',
        undefined,
      );
    }
  }
}

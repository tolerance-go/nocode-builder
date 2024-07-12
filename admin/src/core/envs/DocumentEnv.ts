import { EnvObject } from '@/types';
import Emittery from 'emittery';

interface DocumentEnvEvents {
  pageLoadComplete: undefined;
}

export class DocumentEnv implements EnvObject {
  public emitter: Emittery<DocumentEnvEvents>;
  private _document?: Document;

  public constructor(document: Document) {
    this.emitter = new Emittery<DocumentEnvEvents>();
    this._document = document;
  }

  public get document() {
    if (!this._document) {
      throw new Error('document 非法。');
    }
    return this._document;
  }

  public async activate() {
    this.addPageLoadCompleteEventListener();
  }

  private addPageLoadCompleteEventListener() {
    if (document.readyState === 'loading') {
      // 添加事件监听器，当页面完全加载时触发
      this.document.addEventListener('DOMContentLoaded', () => {
        this.emitter.emit('pageLoadComplete');
      });
    } else {
      this.emitter.emit('pageLoadComplete');
    }
  }
}

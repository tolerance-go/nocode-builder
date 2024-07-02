import Emittery from 'emittery';

interface DocumentEnvEvents {
  pageLoadComplete: undefined;
}

export class DocumentEnv {
  private static instance: DocumentEnv | undefined;

  public static getInstance(): DocumentEnv {
    if (!this.instance) {
      this.instance = new DocumentEnv();
    }
    return this.instance;
  }

  public emitter: Emittery<DocumentEnvEvents>;
  private _document?: Document;

  public get document() {
    if (!this._document) {
      throw new Error('document 非法。');
    }
    return this._document;
  }

  constructor() {
    this.emitter = new Emittery<DocumentEnvEvents>();
  }

  public initialize(document: Document) {
    this._document = document;
    this.addEventListeners();
  }

  private addEventListeners() {
    // 添加事件监听器，当页面完全加载时触发
    this.document.addEventListener('DOMContentLoaded', () => {
      this.emitter.emit('pageLoadComplete');
    });
  }
}

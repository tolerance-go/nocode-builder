import Emittery from 'emittery';

interface DocumentEnvEvents {
  pageLoadComplete: undefined;
}

export class DocumentEnv {
  public emitter: Emittery<DocumentEnvEvents>;
  private document: Document;

  constructor(document: Document) {
    this.emitter = new Emittery<DocumentEnvEvents>();
    this.document = document;
    this.init();
  }

  private init() {
    // 添加事件监听器，当页面完全加载时触发
    this.document.addEventListener('DOMContentLoaded', () => {
      this.emitter.emit('pageLoadComplete');
    });
  }
}

// // 使用示例
// const documentEnv = new DocumentEnv(document);

// documentEnv.emitter.on('pageLoadComplete', () => {
//   console.log('Page has loaded and is ready for React rendering.');
// });

// // 在需要时可以移除监听器
// const listener = () => {
//   console.log('This listener will be removed.');
// };

// documentEnv.emitter.on('pageLoadComplete', listener);
// documentEnv.emitter.off('pageLoadComplete', listener);

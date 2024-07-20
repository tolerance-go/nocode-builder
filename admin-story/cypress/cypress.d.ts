// cypress.d.ts
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * 工具指令
       */
      拖拽到(
        target: Chainable<JQuery<HTMLElement>>,
        position: {
          vertical?: 'top' | 'bottom' | 'middle';
          horizontal?: 'left' | 'right' | 'center';
        },
        options?: {
          notDrop?: boolean;
        },
      ): Chainable<void>;
      页面路径应该为(pathname: string): Chainable<string>;
      拦截请求(
        options: {
          method: 'post' | 'get' | 'delete' | 'put';
          path: string;
        },
        body: Parameters<typeof cy.intercept>[2],
      ): Chainable<void>;
      /**
       * 业务操作
       */
      登录(username: string, password: string): Chainable<void>;
      获取项目树容器(): Chainable<JQuery<HTMLElement>>;
      获取项目树节点标题元素(title: string): Chainable<JQuery<HTMLElement>>;
      获取项目树节点通过标题(title: string): Chainable<JQuery<HTMLElement>>;
      获取项目树标题输入框(): Chainable<JQuery<HTMLElement>>;
      获取添加项目组的按钮(): Chainable<JQuery<HTMLElement>>;
      获取添加项目的按钮(): Chainable<JQuery<HTMLElement>>;
      添加项目树视图项目(): Chainable<void>;
      添加项目树蓝图项目(): Chainable<void>;
      添加项目树数据表项目(): Chainable<void>;
      范围批量选中节点(fromTitle: string, toTitle: string): Chainable<void>;
      组合批量选中节点(titles: string[]): Chainable<void>;

      // 业务断言
      当前访问应该为主页(): Chainable<string>;
      /**
       * 标识选择
       */
      获取测试标识(id: string): Chainable<JQuery<HTMLElement>>;
      获取测试类(className: string): Chainable<JQuery<HTMLElement>>;
      /**
       * antd 选择器
       */
      获取antd树列表内部容器(): Chainable<JQuery<HTMLElement>>;
      获取antd通知框描述(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

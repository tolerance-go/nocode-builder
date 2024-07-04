// cypress.d.ts
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;

      // 添加项目文件
      addProjectFile(typeName: string): Chainable<void>;

      // 添加项目组文件夹
      addProjectGroupFolder(typeName: string): Chainable<void>;

      // 选中项目菜单项目
      selectProjectMenu(title: string): Chainable<void>;

      // antd 组件选择器
      'antdSelectors.ant-tree-list-holder-inner'(): Chainable<
        JQuery<HTMLElement>
      >;
    }
  }
}

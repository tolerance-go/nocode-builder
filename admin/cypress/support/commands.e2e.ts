import { 使用场景 } from '@cypress/support/scenarioUtils';
import { apiUrls } from '@cypress/support/_gen/apiUrls';

使用场景('指令调用', ({ 假如 }) => {
  假如('批量选中节点，应该模拟用户键盘操作批量选中多个节点', ({ 当, 那么 }) => {
    cy.intercept(
      apiUrls.SyncController_applyProjectDiff.method,
      apiUrls.SyncController_applyProjectDiff.path,
      {
        statusCode: 200,
      },
    );

    当('用户已经登录', () => {
      cy.登录('yb', '123456');
    });
    当('用户访问主页', () => {
      cy.visit('/');
    });
    当(
      '用户在根节点创建了一个文件夹和多个文件，文件夹标题为 folder，文件标题分别为 file1, file2, file3',
      () => {
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('file1{enter}');
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('file2{enter}');
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('file3{enter}');
      },
    );
    那么(
      '项目树中应该包含一个文件夹 folder 和三个文件 file1, file2, file3',
      () => {
        cy.获取antd树列表内部容器().should('contain.text', 'file1');
        cy.获取antd树列表内部容器().should('contain.text', 'file2');
        cy.获取antd树列表内部容器().should('contain.text', 'file3');
      },
    );
    当('用户批量选中文件 file1, file2, file3', () => {
      cy.范围批量选中节点('file1', 'file3');
    });
    那么('file1, file2, file3 应该都被选中', () => {
      cy.获取项目树节点通过标题('file1').should(
        'have.class',
        'ant-tree-treenode-selected',
      );
      cy.获取项目树节点通过标题('file2').should(
        'have.class',
        'ant-tree-treenode-selected',
      );
      cy.获取项目树节点通过标题('file3').should(
        'have.class',
        'ant-tree-treenode-selected',
      );
    });
  });
});

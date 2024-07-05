import { TEST_IDS } from '@cypress/shared/constants';
import {
  getTreeNodeParent,
  getTreeNodeChildren,
} from '@cypress/support/antdUtils';
import { 使用场景 } from '@cypress/support/scenarioUtils';

使用场景('项目树操作流程', ({ 假如 }) => {
  假如('用户准备创建项目分组', ({ 当, 那么, 并且 }) => {
    当('用户登录', () => {
      cy.登录('yb', '123456');
    });
    并且('进入主页', () => {
      cy.visit('/');
    });
    那么('用户应该能看到创建项目分组按钮', () => {
      cy.get(
        `[data-test-id="${TEST_IDS.CREATE_PROJECT_GROUP_NODE_BTN}"]`,
      ).should('be.visible');
    });
    当('用户点击创建项目分组按钮', () => {
      cy.get(
        `[data-test-id="${TEST_IDS.CREATE_PROJECT_GROUP_NODE_BTN}"]`,
      ).click();
    });
    那么('用户应该能看到项目树中的输入框', () => {
      cy.获取项目树标题输入框().should('be.visible');
    });
    并且('可以在输入框中输入分组名称', () => {
      cy.获取项目树标题输入框().type('Test Group');
      cy.获取项目树标题输入框().should('have.value', 'Test Group');
    });
    当('用户输入分组名称后并按下回车键', () => {
      cy.获取项目树标题输入框().clear();
      cy.获取项目树标题输入框().type('Test Group{enter}');
    });
    那么('用户应该能看到分组名称在项目树中', () => {
      cy.get('[data-test-class="project-tree-title"]')
        .should('have.length', 1)
        .and('contain.text', 'Test Group');
    });
  });

  假如('用户正在编辑刚创建的项目分组名称', ({ 当, 那么 }) => {
    cy.登录('yb', '123456');
    cy.visit('/');
    cy.get(
      `[data-test-id="${TEST_IDS.CREATE_PROJECT_GROUP_NODE_BTN}"]`,
    ).click();
    cy.获取项目树标题输入框().as('input');

    当('用户输入内容后，又全部撤销', () => {
      cy.get('@input').type('s{backspace}');
    });
    那么('输入框应该显示错误状态', () => {
      cy.get('@input').should('have.class', 'ant-input-status-error');
    });
    当('用户输入无效字符', () => {
      cy.get('@input').clear();
      cy.get('@input').type('Invalid@Name!');
    });
    那么('输入框应该显示错误状态', () => {
      cy.get('@input').should('have.class', 'ant-input-status-error');
    });
    当('用户按下回车键', () => {
      cy.get('@input').type('{enter}');
    });
    那么('应该创建失败，输入框不应该消失', () => {
      cy.get('@input').should('exist');
    });
    当('输入框失去焦点', () => {
      cy.get('@input').blur();
    });
    那么('输入框应该消失', () => {
      cy.get('@input').should('not.exist');
    });
  });

  假如('用户选中唯一的项目节点后，准备创建项目分组', ({ 当, 那么, 并且 }) => {
    cy.登录('yb', '123456');
    cy.visit('/');
    cy.get(`[data-test-id="${TEST_IDS.CREATE_PROJECT_NODE_BTN}"]`).click();
    cy.获取项目树标题输入框().as('input');
    cy.get('@input').type('text{enter}');

    当('用户选中项目节点', () => {
      cy['获取项目树节点标题元素']('text').click();
    });
    并且('项目树中只有一个项目节点', () => {
      cy['获取antd树列表内部容器']().should('have.length', 1);
    });
    并且('点击创建项目分组按钮', () => {
      cy.get(
        `[data-test-id="${TEST_IDS.CREATE_PROJECT_GROUP_NODE_BTN}"]`,
      ).click();
    });
    那么('输入框应该在根节点下一级的第一个位置显示', () => {
      cy.获取项目树标题输入框()
        .parents('.ant-tree-treenode')
        .then(($inputTreeNode) => {
          cy['获取antd树列表内部容器']()
            .should('have.length', 1)
            .children()
            .first()
            .then(($child) => {
              expect($inputTreeNode[0]).equal($child[0]);
            });
        });
    });
  });

  假如(
    '用户选中存在上一级的项目文件节点后，准备创建项目分组',
    ({ 当, 并且, 那么 }) => {
      cy.登录('yb', '123456');
      cy.visit('/');
      cy.获取添加项目组的按钮().click();
      cy.获取项目树标题输入框().type('project group{enter}');
      cy.获取项目树节点标题元素('project group').click();
      cy.获取添加项目的按钮().click();
      cy.获取项目树标题输入框().type('project{enter}');

      当('用户选中项目节点', () => {
        cy.获取项目树节点标题元素('project').click();
      });

      并且('选中的项目节点存在上一级', () => {
        cy.获取项目树节点标题元素('project')
          .parents('.ant-tree-treenode')
          .then(($projectTreeNode) => {
            const $parent = getTreeNodeParent($projectTreeNode);
            expect($parent.length).equal(1);
          });
      });

      并且('点击创建项目分组按钮', () => {
        cy.获取添加项目组的按钮().click();
      });

      那么('输入框应该在选中节点的上一级的第一个位置显示', () => {
        cy.获取项目树标题输入框()
          .parents('.ant-tree-treenode')
          .then(($inputTreeNode) => {
            const $parent = getTreeNodeParent($inputTreeNode);
            const $children = getTreeNodeChildren($parent);

            expect($inputTreeNode[0]).equal($children.first()[0]);
          });
      });
    },
  );

  假如('用户未选中任何节点，准备创建项目分组', ({ 当, 并且, 那么 }) => {
    cy.登录('yb', '123456');
    cy.visit('/');

    当('项目树中没有任何节点', () => {
      cy.获取antd树列表内部容器().children().should('have.length', 0);
    });
    并且('用户点击创建项目分组按钮', () => {
      cy.获取添加项目组的按钮().click();
    });
    那么('输入框应该在根节点的下一级的一个位置显示', () => {
      cy.获取antd树列表内部容器()
        .children()
        .should('have.length', 1)
        .first()
        .find(`#${TEST_IDS.项目树标题输入框}`)
        .should('be.visible');
    });
  });
});

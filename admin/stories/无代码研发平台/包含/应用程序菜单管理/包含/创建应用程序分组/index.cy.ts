import { TEST_IDS } from '@cypress/shared/constants';

const getNodeIndents = (element: HTMLElement) => {
  const indents = element.querySelector('.ant-tree-indent');
  if (!indents) {
    throw new Error('未找到 ant-tree-indent 元素');
  }
  const indexUnits = indents.querySelectorAll('.ant-tree-indent-unit');

  return indexUnits;
};

// 获得 treeNode 的所有子节点
const getTreeNodeChildren = ($treeNode: JQuery<HTMLElement>) => {
  const currentNodeIndexUnits = getNodeIndents($treeNode[0]);
  const $children = $treeNode.nextAll().filter((index, element) => {
    const indents = getNodeIndents(element);
    return indents.length === currentNodeIndexUnits.length + 1;
  });

  return $children;
};

// 获得 treeNode 的父节点
const getTreeNodeParent = ($treeNode: JQuery<HTMLElement>) => {
  const currentNodeIndexUnits = getNodeIndents($treeNode[0]);

  const $parent = $treeNode.prevAll().filter((index, element) => {
    const indents = getNodeIndents(element);
    return indents.length === currentNodeIndexUnits.length - 1;
  });

  return $parent;
};

describe('应用程序管理', () => {
  beforeEach(() => {
    cy.login('yb', '123456');
    cy.visit('/');
  });

  it('1-用户应能看到“创建分组”按钮', () => {
    cy.get(`[data-test-id="${TEST_IDS.CREATE_GROUP_BTN}"]`).should(
      'be.visible',
    );
  });

  it('2-用户应能在输入框中输入分组名称', () => {
    cy.get(`[data-test-id="${TEST_IDS.CREATE_GROUP_BTN}"]`).click();
    cy.get('input#project-tree-title-input').should('be.visible');
    cy.get('input#project-tree-title-input').type('Test Group');
    cy.get('input#project-tree-title-input').should('have.value', 'Test Group');
  });

  it('3-系统应保存分组信息', () => {
    cy.get(`[data-test-id="${TEST_IDS.CREATE_GROUP_BTN}"]`).click();
    cy.get('input#project-tree-title-input').type('Test Group{enter}');

    // 找到 data-test-class 属性是 project-tree-title 的所有节点
    cy.get('[data-test-class="project-tree-title"]')
      .should('have.length', 1)
      .and('contain.text', 'Test Group');

    // 保存创建的分组名称到Cypress上下文对象
    cy.wrap('Test Group').as('createdGroupName');
  });

  // it('4-新创建的分组应显示在分组列表中', function () {
  //   // 使用先前保存的分组名称
  //   cy.get('@createdGroupName').then((createdGroupName) => {
  //     cy.intercept('GET', `${BASE_API}/groups`, {
  //       statusCode: 200,
  //       body: [{ id: 1, name: createdGroupName }],
  //     }).as('getGroupsRequest');

  //     cy.reload();
  //     cy.wait('@getGroupsRequest');
  //     cy.get('.group-list').should('contain', createdGroupName);
  //   });
  // });

  it('5-分组名称不能为空的验证', () => {
    cy.get(`[data-test-id="${TEST_IDS.CREATE_GROUP_BTN}"]`).click();
    cy.get('input#project-tree-title-input').should('be.visible');

    // 用户输入内容后，又全部撤销
    cy.get('input#project-tree-title-input').type('Test Group');
    cy.get('input#project-tree-title-input').clear();

    // 验证错误消息和输入框状态
    cy.get('input#project-tree-title-input').should(
      'have.class',
      'ant-input-status-error',
    );
  });

  it('6-分组名称不能包含无效字符', () => {
    cy.get(`[data-test-id="${TEST_IDS.CREATE_GROUP_BTN}"]`).click();
    cy.get('input#project-tree-title-input').should('be.visible');

    cy.get('input#project-tree-title-input').type('Invalid@Name!');

    // 验证错误消息和输入框状态
    cy.get('input#project-tree-title-input').should(
      'have.class',
      'ant-input-status-error',
    );
  });

  it('7-新建分组名称包含无效字符并按下回车的验证', () => {
    cy.get(`[data-test-id="${TEST_IDS.CREATE_GROUP_BTN}"]`).click();
    cy.get('input#project-tree-title-input').should('be.visible');

    // 用户输入包含无效字符的分组名称并按下回车键
    cy.get('input#project-tree-title-input').type('Invalid@Name!{enter}');

    // 验证输入框应该消失
    cy.get('input#project-tree-title-input').should('not.exist');

    cy.get('[data-test-class="project-tree-title"]').should('have.length', 0);
  });

  // it('8-保存分组过程中发生网络错误', () => {
  //   cy.get(`[data-test-id="${TEST_IDS.CREATE_GROUP_BTN}"]`).click();
  //   cy.get('input#group-name').type('Test Group');
  //   cy.intercept('POST', `${BASE_API}/groups`, {
  //     forceNetworkError: true,
  //   }).as('saveGroupRequest');

  //   cy.get('button#save-group').click();
  //   cy.wait('@saveGroupRequest');
  //   cy.get('.error-message').should('contain', '网络错误，请稍后重试');
  //   cy.get('.modal#create-group-btn-modal').should('be.visible');
  // });

  it('9-输入过程中失去焦点且输入内容为空', () => {
    cy.get(`[data-test-id="${TEST_IDS.CREATE_GROUP_BTN}"]`).click();
    cy.get('input#project-tree-title-input').blur();
    cy.get('input#project-tree-title-input').should('not.exist');
  });

  it('10-选中文件后创建分组', () => {
    cy.addProjectFile('Test File');
    cy.selectProjectMenu('Test File');
    cy.get(`[data-test-id="${TEST_IDS.CREATE_GROUP_BTN}"]`).click();

    // 获取新建分组输入框
    cy.get('input#project-tree-title-input').as('newGroupInput');

    // 找到输入框的父级 ant-tree-treenode
    cy.get('@newGroupInput').parents('.ant-tree-treenode').as('treeNode');

    cy.get('@treeNode').then(($treeNode) => {
      const $parent = getTreeNodeParent($treeNode);

      if ($parent.length === 0) {
        cy['antdSelectors.ant-tree-list-holder-inner']()
          .should('have.length', 1)
          .children()
          .first()
          .then(($child) => {
            expect($treeNode[0]).equal($child[0]);
          });
      } else {
        const $children = getTreeNodeChildren($parent);

        expect($treeNode[0]).equal($children.first()[0]);
      }
    });
  });

  it('11-选中文件夹后创建分组', () => {
    cy.addProjectGroupFolder('Test Group');
    cy.get('[data-test-class="project-tree-title"]')
      .contains('Test Group')
      .as('nodeTitle');
    cy.get('@nodeTitle').click();

    cy.get('@nodeTitle').parents('.ant-tree-treenode').as('groupTreeNode');

    cy.get(`[data-test-id="${TEST_IDS.CREATE_GROUP_BTN}"]`).click();
    cy.get('input#project-tree-title-input').as('newGroupInput');
    cy.get('@newGroupInput')
      .parents('.ant-tree-treenode')
      .should('have.length', 1)
      .as('treeNode');

    cy.get('@groupTreeNode').then(($groupTreeNode) => {
      const $children = getTreeNodeChildren($groupTreeNode);

      const $treeTitleInput = $children
        .first()
        .find('#project-tree-title-input');

      expect($treeTitleInput.length).equal(1);
    });
  });

  it('12-未选中任何项目时创建分组', () => {
    cy['antdSelectors.ant-tree-list-holder-inner']()
      .should('have.length', 1)
      .as('treeListHolder');

    cy.get('@treeListHolder').children().should('have.length', 0);

    cy.get(`[data-test-id="${TEST_IDS.CREATE_GROUP_BTN}"]`).click();

    cy.get('@treeListHolder')
      .children()
      .should('have.length', 1)
      .first()
      .find(`#project-tree-title-input`)
      .should('be.visible');
  });
});

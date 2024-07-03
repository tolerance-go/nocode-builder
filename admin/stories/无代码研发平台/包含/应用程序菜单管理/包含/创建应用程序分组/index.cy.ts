describe('应用程序管理', () => {
  beforeEach(() => {
    cy.login('yb', '123456');
    cy.visit('/');
  });

  it('1-用户应能看到“创建分组”按钮', () => {
    cy.get('button#create-group').should('be.visible');
  });

  it('2-用户应能在输入框中输入分组名称', () => {
    cy.get('button#create-group').click();
    cy.get('input#project-tree-title-input').should('be.visible');
    cy.get('input#project-tree-title-input').type('Test Group');
    cy.get('input#project-tree-title-input').should('have.value', 'Test Group');
  });

  it('3-系统应保存分组信息', () => {
    cy.get('button#create-group').click();
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
    cy.get('button#create-group').click();
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
    cy.get('button#create-group').click();
    cy.get('input#project-tree-title-input').should('be.visible');

    cy.get('input#project-tree-title-input').type('Invalid@Name!');

    // 验证错误消息和输入框状态
    cy.get('input#project-tree-title-input').should(
      'have.class',
      'ant-input-status-error',
    );
  });

  it('7-新建分组名称包含无效字符并按下回车的验证', () => {
    cy.get('button#create-group').click();
    cy.get('input#project-tree-title-input').should('be.visible');

    // 用户输入包含无效字符的分组名称并按下回车键
    cy.get('input#project-tree-title-input').type('Invalid@Name!{enter}');

    // 验证输入框应该消失
    cy.get('input#project-tree-title-input').should('not.exist');

    cy.get('[data-test-class="project-tree-title"]').should('have.length', 0);
  });

  // it('8-保存分组过程中发生网络错误', () => {
  //   cy.get('button#create-group').click();
  //   cy.get('input#group-name').type('Test Group');
  //   cy.intercept('POST', `${BASE_API}/groups`, {
  //     forceNetworkError: true,
  //   }).as('saveGroupRequest');

  //   cy.get('button#save-group').click();
  //   cy.wait('@saveGroupRequest');
  //   cy.get('.error-message').should('contain', '网络错误，请稍后重试');
  //   cy.get('.modal#create-group-modal').should('be.visible');
  // });

  it('9-输入过程中失去焦点且输入内容为空', () => {
    cy.get('button#create-group').click();
    cy.get('input#project-tree-title-input').blur();
    cy.get('input#project-tree-title-input').should('not.exist');
  });

  // it.only('10-添加分组文件夹排序', () => {
  //   cy.get('button#create-group').click();
  //   cy.get('input#group-name').type('Sorted Group');
  //   cy.intercept('POST', `${BASE_API}/groups`, {
  //     statusCode: 201,
  //     body: { message: '分组创建成功' },
  //   }).as('saveGroupRequest');

  //   cy.get('button#save-group').click();
  //   cy.wait('@saveGroupRequest');
  //   cy.get('.notification-success').should('contain', '分组创建成功');
  //   cy.get('.modal#create-group-modal').should('not.exist');

  //   cy.intercept('GET', `${BASE_API}/groups`, {
  //     statusCode: 200,
  //     body: [
  //       { id: 1, name: 'Sorted Group', type: 'folder', parent: null },
  //       { id: 2, name: 'Existing Folder', type: 'folder', parent: null },
  //     ],
  //   }).as('getGroupsRequest');

  //   cy.reload();
  //   cy.wait('@getGroupsRequest');
  //   cy.get('.group-list').should('contain', 'Sorted Group');
  //   cy.get('.group-list').within(() => {
  //     cy.get('.group-item').first().should('contain', 'Sorted Group');
  //   });
  // });
});

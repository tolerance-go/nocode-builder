import { 使用场景 } from '@cypress/support/scenarioUtils';

使用场景('项目树编辑流程', ({ 假如 }) => {
  假如.only('用户选中节点，应该可以通过快捷键删除', ({ 当, 并且, 那么 }) => {
    当('用户已经登录', () => {
      cy.登录('yb', '123456');
    });

    当('用户访问主页', () => {
      cy.visit('/');
    });

    当('用户选中存在的项目节点', () => {
      cy.获取添加项目的按钮().click();
      cy.获取项目树标题输入框().type('项目节点{enter}');
      cy.获取项目树节点通过标题('项目节点').should(
        'have.class',
        'ant-tree-treenode-selected',
      );
    });

    并且('按下 delete 键', () => {
      cy.get('body').trigger('keydown', {
        keyCode: 46,
        which: 46,
        key: 'Delete',
      });
    });

    那么('节点应该被删除', () => {
      cy.获取antd树列表内部容器().should('be.empty');
    });
  });

  假如('用户编辑节点标题的时候，应该可以按键退出', ({ 当, 并且, 那么 }) => {
    当('用户已经登录', () => {
      cy.登录('yb', '123456');
    });

    当('用户访问主页', () => {
      cy.visit('/');
    });

    当('用户正在编辑项目节点标题', () => {
      cy.获取添加项目的按钮().click();
      cy.获取项目树标题输入框().type('项目节点{enter}');
      cy.获取项目树节点通过标题('项目节点').should(
        'have.class',
        'ant-tree-treenode-selected',
      );
      cy.get('body').trigger('keydown', {
        keyCode: 113,
        which: 113,
        key: 'F2',
      });
      cy.获取项目树标题输入框().should('be.visible');
    });

    并且('按下 esc 键', () => {
      cy.get('body').trigger('keydown', {
        keyCode: 27,
        which: 27,
        key: 'Escape',
      });
    });

    那么('标题编辑框应该消失', () => {
      cy.获取项目树标题输入框().should('not.exist');
    });
  });

  假如(
    '用户快捷编辑文件，输入非法字符想保存，应该正确提示状态',
    ({ 当, 并且, 那么 }) => {
      当('用户已经登录', () => {
        cy.登录('yb', '123456');
      });

      当('用户访问主页', () => {
        cy.visit('/');
      });

      当('用户选中存在的项目节点', () => {
        cy.获取添加项目的按钮().click();
        cy.获取项目树标题输入框().type('项目节点{enter}');
        cy.获取项目树节点通过标题('项目节点').should(
          'have.class',
          'ant-tree-treenode-selected',
        );
      });

      当('用户按下 f2', () => {
        cy.get('body').trigger('keydown', {
          keyCode: 113,
          which: 113,
          key: 'F2',
        });
      });

      并且('输入了非法字符', () => {
        cy.获取项目树标题输入框().type('{selectall}$');
      });

      并且('按下了 enter 键', () => {
        cy.获取项目树标题输入框().type('{enter}');
      });

      那么('输入框应该保留', () => {
        cy.获取项目树标题输入框().should('be.visible');
      });
    },
  );

  假如(
    '用户快捷编辑文件，输入不合法字符，又取消输入，应该回到过去状态',
    ({ 当, 并且, 那么 }) => {
      当('用户已经登录', () => {
        cy.登录('yb', '123456');
      });

      当('用户访问主页', () => {
        cy.visit('/');
      });

      当('用户选中存在的项目节点', () => {
        cy.获取添加项目的按钮().click();
        cy.获取项目树标题输入框().type('项目节点{enter}');
        cy.获取项目树节点通过标题('项目节点').should(
          'have.class',
          'ant-tree-treenode-selected',
        );
      });

      当('用户按下 f2', () => {
        cy.get('body').trigger('keydown', {
          keyCode: 113,
          which: 113,
          key: 'F2',
        });
      });

      并且('输入了非法字符', () => {
        cy.获取项目树标题输入框().type('{selectall}$');
      });

      并且('失去焦点', () => {
        cy.获取项目树标题输入框().blur();
      });

      那么('节点标题输入框应该消失', () => {
        cy.获取项目树标题输入框().should('not.exist');
      });

      并且('之前选中的项目节点标题恢复到编辑之前的内容', () => {
        cy.获取项目树节点通过标题('项目节点').should(
          'have.class',
          'ant-tree-treenode-selected',
        );
        cy.获取项目树节点通过标题('项目节点').should('have.text', '项目节点');
      });
    },
  );

  假如(
    '用户在选中节点的状态下，编辑又取消，应该正确显示节点高亮',
    ({ 当, 那么 }) => {
      当('用户已经登录', () => {
        cy.登录('yb', '123456');
      });

      当('用户访问主页', () => {
        cy.visit('/');
      });

      当('用户选中存在的项目节点', () => {
        cy.获取添加项目的按钮().click();
        cy.获取项目树标题输入框().type('项目节点{enter}');
        cy.获取项目树节点通过标题('项目节点').should(
          'have.class',
          'ant-tree-treenode-selected',
        );
      });

      当('用户点击新增项目按钮', () => {
        cy.获取添加项目的按钮().click();
      });

      那么('之前选中的项目节点应该处于“之前选中”的状态', () => {
        cy.获取项目树节点通过标题('项目节点')
          .should('not.have.class', 'ant-tree-treenode-selected')
          .find('span.prev-selected')
          .should('exist');
      });

      当('用户取消输入', () => {
        cy.获取项目树标题输入框().blur();
      });

      那么('之前选中的项目节点应该重新被选中，而非“之前选中”的状态', () => {
        cy.获取项目树节点通过标题('项目节点')
          .should('have.class', 'ant-tree-treenode-selected')
          .find('span.prev-selected')
          .should('not.exist');
      });
    },
  );

  假如(
    '用户对选中的节点，按下编辑快捷键，应该可以开始编辑',
    ({ 当, 并且, 那么 }) => {
      当('用户已经登录', () => {
        cy.登录('yb', '123456');
      });
      当('用户访问主页', () => {
        cy.visit('/');
      });
      当('用户选中存在的项目节点', () => {
        cy.获取添加项目的按钮().click();
        cy.获取项目树标题输入框().type('项目节点{enter}');
      });
      并且('按下 f2 快捷键', () => {
        cy.get('body').trigger('keydown', {
          keyCode: 113,
          which: 113,
          key: 'F2',
        });
      });

      那么('用户可以看到编辑框出现', () => {
        cy.获取项目树标题输入框().should('be.visible');
      });
      并且('编辑框的内容和原始标题一致', () => {
        cy.获取项目树标题输入框().should('have.value', '项目节点');
      });
      并且('可以正常输入保存', () => {
        cy.获取项目树标题输入框().type(
          '{selectall}{backspace}新项目节点{enter}',
        );
        cy.获取项目树节点标题元素('新项目节点').should('exist');
      });

      当('用户选中存在的项目组节点', () => {
        cy.获取添加项目组的按钮().click();
        cy.获取项目树标题输入框().type('项目组节点{enter}');
      });
      并且('按下 f2', () => {
        cy.get('body').trigger('keydown', {
          keyCode: 113,
          which: 113,
          key: 'F2',
        });
      });
      那么('用户可以看到编辑框出现', () => {
        cy.获取项目树标题输入框().should('be.visible');
      });
      并且('编辑框的内容和原始标题一致', () => {
        cy.获取项目树标题输入框().should('have.value', '项目组节点');
      });
      并且('可以正常输入保存', () => {
        cy.获取项目树标题输入框().type(
          '{selectall}{backspace}新项目组节点{enter}',
        );
        cy.获取项目树节点标题元素('新项目组节点').should('exist');
      });
    },
  );

  假如(
    '用户快捷编辑有标题的节点，那么输入框默认应该全部选中',
    ({ 当, 并且, 那么 }) => {
      当('用户已经登录', () => {
        cy.登录('yb', '123456');
      });
      当('用户访问主页', () => {
        cy.visit('/');
      });
      当('用户选中存在的项目节点', () => {
        cy.获取添加项目的按钮().click();
        cy.获取项目树标题输入框().type('项目节点{enter}');
      });
      并且('项目节点标题不为空', () => {
        cy.获取项目树节点标题元素('项目节点').should('not.be.empty');
      });
      并且('按下 f2', () => {
        cy.get('body').trigger('keydown', {
          keyCode: 113,
          which: 113,
          key: 'F2',
        });
      });
      那么('用户可以看到编辑框出现', () => {
        cy.获取项目树标题输入框().should('be.visible');
      });
      并且('输入框的内容应该是默认全选的状态', () => {
        cy.获取项目树标题输入框().should('have.prop', 'selectionStart', 0);
        cy.获取项目树标题输入框().should(
          'have.prop',
          'selectionEnd',
          '项目节点'.length,
        );
      });
    },
  );
});

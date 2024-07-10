import { 测试类 } from '@cypress/shared/constants';
import { 使用场景 } from '@cypress/support/scenarioUtils';

使用场景('项目树编辑流程', ({ 假如 }) => {
  假如('用户新建又退出项目，选中节点应该恢复', ({ 当, 并且, 那么 }) => {
    当('用户已经登录', () => {
      cy.登录('yb', '123456');
    });

    当('用户访问主页', () => {
      cy.visit('/');
    });
    当('用户创建了项目树中一个项目节点并选中', () => {
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('项目节点{enter}');
      cy.获取项目树节点通过标题('项目节点').click();
      cy.获取项目树节点通过标题('项目节点').should(
        'have.class',
        'ant-tree-treenode-selected',
      );
    });
    并且('继续创建视图项目', () => {
      cy.添加项目树视图项目();
    });
    那么('应该暂时隐藏选中', () => {
      cy.获取项目树节点通过标题('项目节点').should(
        'not.have.class',
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
    那么('应该恢复之前的选中', () => {
      cy.获取项目树节点通过标题('项目节点').click();
      cy.获取项目树节点通过标题('项目节点').should(
        'have.class',
        'ant-tree-treenode-selected',
      );
    });
    当('用户继续选中', () => {
      cy.获取项目树节点通过标题('项目节点').click();
      cy.获取项目树节点通过标题('项目节点').should(
        'have.class',
        'ant-tree-treenode-selected',
      );
    });
    并且('继续创建视图项目', () => {
      cy.添加项目树视图项目();
    });
    那么('应该暂时隐藏选中', () => {
      cy.获取项目树节点通过标题('项目节点').should(
        'not.have.class',
        'ant-tree-treenode-selected',
      );
    });
    并且('点击项目树外部的区域', () => {
      cy.get('body').click('right');
    });
    那么('应该恢复之前的选中', () => {
      cy.获取项目树节点通过标题('项目节点').click();
      cy.获取项目树节点通过标题('项目节点').should(
        'have.class',
        'ant-tree-treenode-selected',
      );
    });
  });

  假如('用户新建又退出项目组，选中节点应该恢复', ({ 当, 并且, 那么 }) => {
    当('用户已经登录', () => {
      cy.登录('yb', '123456');
    });

    当('用户访问主页', () => {
      cy.visit('/');
    });
    当('用户创建了项目树中一个项目组节点并选中', () => {
      cy.获取添加项目组的按钮().click();
      cy.获取项目树标题输入框().type('项目组节点{enter}');
      cy.获取项目树节点通过标题('项目组节点').click();
      cy.获取项目树节点通过标题('项目组节点').should(
        'have.class',
        'ant-tree-treenode-selected',
      );
    });
    并且('继续创建视图项目', () => {
      cy.获取添加项目组的按钮().click();
    });
    那么('应该暂时隐藏选中', () => {
      cy.获取项目树节点通过标题('项目组节点').should(
        'not.have.class',
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
    那么('应该恢复之前的选中', () => {
      cy.获取项目树节点通过标题('项目组节点').click();
      cy.获取项目树节点通过标题('项目组节点').should(
        'have.class',
        'ant-tree-treenode-selected',
      );
    });
    当('用户继续选中', () => {
      cy.获取项目树节点通过标题('项目组节点').click();
      cy.获取项目树节点通过标题('项目组节点').should(
        'have.class',
        'ant-tree-treenode-selected',
      );
    });
    并且('继续创建视图项目', () => {
      cy.获取添加项目组的按钮().click();
    });
    那么('应该暂时隐藏选中', () => {
      cy.获取项目树节点通过标题('项目组节点').should(
        'not.have.class',
        'ant-tree-treenode-selected',
      );
    });
    并且('点击项目树外部的区域', () => {
      cy.get('body').click('right');
    });
    那么('应该恢复之前的选中', () => {
      cy.获取项目树节点通过标题('项目组节点').click();
      cy.获取项目树节点通过标题('项目组节点').should(
        'have.class',
        'ant-tree-treenode-selected',
      );
    });
  });
  假如(
    '用户创建并选中了项目节点，点击项目树外部的区域，应该取消所有选中',
    ({ 当, 并且, 那么 }) => {
      当('用户已经登录', () => {
        cy.登录('yb', '123456');
      });

      当('用户访问主页', () => {
        cy.visit('/');
      });

      当('用户创建了项目树中一个项目节点并选中', () => {
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('项目节点{enter}');
        cy.获取项目树节点通过标题('项目节点').click();
        cy.获取项目树节点通过标题('项目节点').should(
          'have.class',
          'ant-tree-treenode-selected',
        );
      });

      并且('点击项目树外部的区域', () => {
        cy.get('body').click('right');
      });

      那么('所有选中的项目节点应该取消选中', () => {
        cy.获取项目树节点通过标题('项目节点').should(
          'not.have.class',
          'ant-tree-treenode-selected',
        );
      });
    },
  );

  假如(
    '用户选中多个文件夹，按下 del 键，应该删除选中项',
    ({ 当, 并且, 那么 }) => {
      当('用户已经登录', () => {
        cy.登录('yb', '123456');
      });

      当('用户访问主页', () => {
        cy.visit('/');
      });

      当('用户选中多个文件夹', () => {
        cy.添加项目树视图项目();

        cy.获取项目树标题输入框().type('文件夹0{enter}');
        cy.添加项目树视图项目();

        cy.获取项目树标题输入框().type('文件夹1{enter}');
        cy.添加项目树视图项目();

        cy.获取项目树标题输入框().type('文件夹2{enter}');
        cy.获取项目树节点通过标题('文件夹1').click({ ctrlKey: true });
        cy.获取项目树节点通过标题('文件夹2').click({ ctrlKey: true });
        cy.获取项目树节点通过标题('文件夹1').should(
          'have.class',
          'ant-tree-treenode-selected',
        );
        cy.获取项目树节点通过标题('文件夹2').should(
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

      那么('选中的文件夹应该被删除', () => {
        cy.获取项目树节点通过标题('文件夹0').should('exist');
        cy.获取测试类(测试类.项目树节点标题).should('have.length', 1);
      });
    },
  );
  假如(
    '用户正在创建节点并编辑标题中，快捷退出，应该恢复之前的选中',
    ({ 当, 并且, 那么 }) => {
      当('用户已经登录', () => {
        cy.登录('yb', '123456');
      });
      当('用户访问主页', () => {
        cy.visit('/');
      });
      当('用户创建了项目树中一个项目节点', () => {
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('项目节点{enter}');
      });
      并且('选中该节点', () => {
        cy.获取项目树节点通过标题('项目节点').click();
        cy.获取项目树节点通过标题('项目节点').should(
          'have.class',
          'ant-tree-treenode-selected',
        );
      });
      当('用户点击了创建项目按钮', () => {
        cy.添加项目树视图项目();
      });
      那么('应该看到输入框', () => {
        cy.获取项目树标题输入框().should('be.visible');
      });
      并且('按下了 esc 键', () => {
        cy.get('body').trigger('keydown', {
          keyCode: 27,
          which: 27,
          key: 'Escape',
        });
      });
      那么('输入框应该消失', () => {
        cy.获取项目树标题输入框().should('not.exist');
      });
      那么('之前选中的节点应该重新恢复选中状态', () => {
        cy.获取项目树节点通过标题('项目节点').should(
          'have.class',
          'ant-tree-treenode-selected',
        );
      });
    },
  );

  假如('用户正在编辑标题，不应该响应删除', ({ 当, 并且, 那么 }) => {
    当('用户已经登录', () => {
      cy.登录('yb', '123456');
    });

    当('用户访问主页', () => {
      cy.visit('/');
    });

    当('用户选中存在的项目节点并开始编辑标题', () => {
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('项目节点{enter}');
      cy.获取项目树节点通过标题('项目节点').click();
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

    并且('按下 delete 键', () => {
      cy.get('body').trigger('keydown', {
        keyCode: 46,
        which: 46,
        key: 'Delete',
      });
    });

    那么('项目节点应该仍然存在并继续编辑', () => {
      cy.获取项目树标题输入框().should('be.visible');
    });
  });

  假如(
    '用户正在编辑临时创建节点，取消操作，应该正确删除',
    ({ 当, 并且, 那么 }) => {
      当('用户已经登录', () => {
        cy.登录('yb', '123456');
      });

      当('用户访问主页', () => {
        cy.visit('/');
      });

      当('项目树中不存在节点', () => {
        cy.获取antd树列表内部容器().should('be.empty');
      });

      并且('用户点击创建项目按钮', () => {
        cy.添加项目树视图项目();
      });

      并且('用户按下 esc 键', () => {
        cy.get('body').trigger('keydown', {
          keyCode: 27,
          which: 27,
          key: 'Escape',
        });
      });

      那么('项目树中恢复为空', () => {
        cy.获取antd树列表内部容器().should('be.empty');
      });
    },
  );

  假如('用户选中项目，应该可以通过快捷键删除', ({ 当, 并且, 那么 }) => {
    当('用户已经登录', () => {
      cy.登录('yb', '123456');
    });

    当('用户访问主页', () => {
      cy.visit('/');
    });

    当('用户选中存在的项目节点', () => {
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('项目节点{enter}');
      cy.获取项目树节点通过标题('项目节点').click();
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

    那么('项目节点应该被删除', () => {
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
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('项目节点{enter}');
      cy.获取项目树节点通过标题('项目节点').click();
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
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('项目节点{enter}');
        cy.获取项目树节点通过标题('项目节点').click();
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
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('项目节点{enter}');
        cy.获取项目树节点通过标题('项目节点').click();
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
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('项目节点{enter}');
        cy.获取项目树节点通过标题('项目节点').click();
        cy.获取项目树节点通过标题('项目节点').should(
          'have.class',
          'ant-tree-treenode-selected',
        );
      });

      当('用户点击新增项目按钮', () => {
        cy.添加项目树视图项目();
      });

      那么('之前选中的项目节点应该处于“之前选中”的状态', () => {
        cy.获取项目树节点通过标题('项目节点')
          .should('not.have.class', 'ant-tree-treenode-selected')
          .find(`[data-test-class*="${测试类.编辑临时创建节点之前选中的节点}"]`)
          .should('exist');
      });

      当('用户取消输入', () => {
        cy.获取项目树标题输入框().blur();
      });

      那么('之前选中的项目节点应该重新被选中，而非“之前选中”的状态', () => {
        cy.获取项目树节点通过标题('项目节点')
          .should('have.class', 'ant-tree-treenode-selected')
          .find(`[data-test-class*="${测试类.编辑临时创建节点之前选中的节点}"]`)
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
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('项目节点{enter}');
        cy.获取项目树节点通过标题('项目节点').click();
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
        cy.添加项目树视图项目();

        cy.获取项目树标题输入框().type('项目组节点{enter}');
        cy.获取项目树节点通过标题('项目组节点').click();
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
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('项目节点{enter}');
        cy.获取项目树节点通过标题('项目节点').click();
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

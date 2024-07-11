import { 测试类, 测试标识 } from '@cypress/shared/constants';
import {
  getTreeNodeParent,
  getTreeNodeChildren,
} from '@cypress/support/antdUtils';
import { 使用场景 } from '@cypress/support/scenarioUtils';

使用场景('项目树管理流程', ({ 假如 }) => {
  假如(
    '用户刚创建成功一个新节点，那么该节点应该进入激活状态而非选中状态',
    ({ 当, 并且, 那么 }) => {
      当('用户登录', () => {
        cy.登录('yb', '123456');
      });

      并且('进入主页', () => {
        cy.visit('/');
      });

      当('用户创建一个项目节点', () => {
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('项目节点{enter}');
      });

      那么('项目节点应该被激活', () => {
        cy.获取项目树节点通过标题('项目节点')
          .find(`[data-test-class="${测试类.项目树节点标题}"]`)
          .should('have.class', 'active');
      });

      并且('项目节点不应该被选中', () => {
        cy.获取项目树节点通过标题('项目节点').should(
          'not.have.class',
          'ant-tree-treenode-selected',
        );
      });
    },
  );

  假如('用户刚创建或者点击节点，那么应该进入激活状态', ({ 当, 并且, 那么 }) => {
    当('用户登录', () => {
      cy.登录('yb', '123456');
    });

    并且('进入主页', () => {
      cy.visit('/');
    });

    当('用户创建一个项目节点', () => {
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('项目节点{enter}');
    });

    那么('项目节点应该被激活', () => {
      cy.获取项目树节点通过标题('项目节点')
        .find(`[data-test-class="${测试类.项目树节点标题}"]`)
        .should('have.class', 'active');
    });

    当('用户选中项目树容器', () => {
      cy.获取测试标识(测试标识.项目树容器).click('bottom');
    });

    那么('项目节点应该失去激活状态', () => {
      cy.获取项目树节点通过标题('项目节点')
        .find(`[data-test-class="${测试类.项目树节点标题}"]`)
        .should('not.have.class', 'active');
    });

    当('用户点击项目节点', () => {
      cy.获取项目树节点通过标题('项目节点').click();
    });

    那么('项目节点应该再次进入激活状态', () => {
      cy.获取项目树节点通过标题('项目节点')
        .find(`[data-test-class="${测试类.项目树节点标题}"]`)
        .should('have.class', 'active');
    });
  });

  假如('用户按正确流程创建项目分组，应该可以成功创建', ({ 当, 那么, 并且 }) => {
    当('用户登录', () => {
      cy.登录('yb', '123456');
    });
    并且('进入主页', () => {
      cy.visit('/');
    });
    那么('用户应该能看到创建项目分组按钮', () => {
      cy.获取添加项目组的按钮().should('be.visible');
    });
    当('用户点击创建项目分组按钮', () => {
      cy.获取添加项目组的按钮().click();
    });
    那么('用户应该能看到项目树中的输入框', () => {
      cy.获取项目树标题输入框().should('be.visible');
    });
    并且('可以在输入框中输入分组名称', () => {
      cy.获取项目树标题输入框().type('Test Group');
      cy.获取项目树标题输入框().should('have.value', 'Test Group');
    });
    当('用户输入分组名称后并按下回车键', () => {
      cy.获取项目树标题输入框().type('{enter}');
    });
    那么('用户应该能看到分组名称在项目树中', () => {
      cy.获取测试类(测试类.项目树节点标题)
        .should('have.length', 1)
        .and('contain.text', 'Test Group');
    });
  });

  假如(
    '用户正在编辑输入框的时候，应该正确处理输入异常',
    ({ 当, 那么, 并且 }) => {
      当('用户登录', () => {
        cy.登录('yb', '123456');
      });
      并且('进入主页', () => {
        cy.visit('/');
      });
      当('用户创建项目组节点', () => {
        cy.获取测试标识(测试标识.创建项目组节点的按钮).click();
      });
      当('用户输入内容后，又全部撤销', () => {
        cy.获取项目树标题输入框().type('s{backspace}');
      });
      那么('输入框应该显示错误状态', () => {
        cy.获取项目树标题输入框().should(
          'have.class',
          'ant-input-status-error',
        );
      });
      当('用户输入无效字符', () => {
        cy.获取项目树标题输入框().type('{selectall}{backspace}Invalid*');
      });
      那么('输入框应该显示错误状态', () => {
        cy.获取项目树标题输入框().should(
          'have.class',
          'ant-input-status-error',
        );
      });
      当('用户按下回车键', () => {
        cy.获取项目树标题输入框().type('{enter}');
      });
      那么('应该创建失败，输入框不应该消失', () => {
        cy.获取项目树标题输入框().should('exist');
      });
      当('输入框失去焦点', () => {
        cy.获取项目树标题输入框().blur();
      });
      那么('输入框应该消失', () => {
        cy.获取项目树标题输入框().should('not.exist');
      });
    },
  );

  假如(
    '用户选中唯一的项目节点后，准备创建项目分组，应该正确处理插入位置',
    ({ 当, 那么, 并且 }) => {
      当('用户登录', () => {
        cy.登录('yb', '123456');
      });
      当('用户访问主页', () => {
        cy.visit('/');
      });
      当('用户创建一个项目节点', () => {
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('text{enter}');
      });
      当('用户选中项目节点', () => {
        cy['获取项目树节点标题元素']('text').click();
      });
      并且('项目树中只有一个项目节点', () => {
        cy['获取antd树列表内部容器']().should('have.length', 1);
      });
      并且('点击创建项目分组按钮', () => {
        cy.获取测试标识(测试标识.创建项目组节点的按钮).click();
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
    },
  );

  假如(
    '用户选中存在上一级的项目文件节点后，准备创建项目分组，应该正确处理插入位置',
    ({ 当, 并且, 那么 }) => {
      cy.登录('yb', '123456');
      cy.visit('/');
      cy.获取添加项目组的按钮().click();
      cy.获取项目树标题输入框().type('project group{enter}');
      cy.获取项目树节点标题元素('project group').click();
      cy.添加项目树视图项目();
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

  假如(
    '用户未选中任何节点，准备创建项目分组，应该正确处理插入位置',
    ({ 当, 并且, 那么 }) => {
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
          .find(`#${测试标识.项目树标题输入框}`)
          .should('be.visible');
      });
    },
  );

  假如('用户创建了项目，然后取消，应该可以再次创建', ({ 当, 那么 }) => {
    当('登录', () => {
      cy.登录('yb', '123456');
    });
    当('在主页', () => {
      cy.visit('/');
    });

    当('用户点击创建项目', () => {
      cy.添加项目树视图项目();
    });
    那么('用户应该能看到项目树中的输入框', () => {
      cy.获取项目树标题输入框().should('be.visible');
    });
    当('用输入失去焦点', () => {
      cy.获取项目树标题输入框().blur();
    });
    那么('节点树应该没有任何节点', () => {
      cy.获取antd树列表内部容器().children().should('have.length', 0);
    });
    当('用户再次点击创建项目', () => {
      cy.添加项目树视图项目();
    });
    那么('用户应该能看到项目树中的输入框', () => {
      cy.获取项目树标题输入框().should('be.visible');
    });
    当('用输入失去焦点', () => {
      cy.获取项目树标题输入框().blur();
    });
    那么('节点树应该没有任何节点', () => {
      cy.获取antd树列表内部容器().children().should('have.length', 0);
    });
  });

  假如('用户创建了项目组，然后取消，应该可以再次创建', ({ 当, 那么 }) => {
    当('登录', () => {
      cy.登录('yb', '123456');
    });
    当('在主页', () => {
      cy.visit('/');
    });

    当('用户点击创建项目组', () => {
      cy.获取添加项目组的按钮().click();
    });
    那么('用户应该能看到项目树中的输入框', () => {
      cy.获取项目树标题输入框().should('be.visible');
    });
    当('用输入失去焦点', () => {
      cy.获取项目树标题输入框().blur();
    });
    那么('节点树应该没有任何节点', () => {
      cy.获取antd树列表内部容器().children().should('have.length', 0);
    });
    当('用户再次点击创建项目组', () => {
      cy.获取添加项目组的按钮().click();
    });
    那么('用户应该能看到项目树中的输入框', () => {
      cy.获取项目树标题输入框().should('be.visible');
    });
    当('用输入失去焦点', () => {
      cy.获取项目树标题输入框().blur();
    });
    那么('节点树应该没有任何节点', () => {
      cy.获取antd树列表内部容器().children().should('have.length', 0);
    });
  });

  假如('用户创建项目后，应该默认选中', ({ 当, 并且, 那么 }) => {
    当('登录', () => {
      cy.登录('yb', '123456');
    });
    当('在主页', () => {
      cy.visit('/');
    });

    当('用户点击创建项目', () => {
      cy.添加项目树视图项目();
    });
    那么('用户应该能看到项目树中的输入框', () => {
      cy.获取项目树标题输入框().should('be.visible');
    });
    当('用户输入合法内容和按下回车键，并点击', () => {
      cy.获取项目树标题输入框().type('title{enter}');
      cy.获取项目树节点标题元素('title').click();
    });
    那么('用户应该能看到分组名称在项目树中', () => {
      cy.获取项目树节点标题元素('title').should('be.visible');
    });
    并且('节点应该是选中状态', () => {
      cy.获取项目树节点标题元素('title')
        .parents('.ant-tree-treenode')
        .should('have.class', 'ant-tree-treenode-selected');
    });
  });

  假如('用户双击选中项目节点，应该取消选中', ({ 当, 并且, 那么 }) => {
    当('用户已登录', () => {
      cy.登录('yb', '123456');
    });
    当('用户在主页', () => {
      cy.visit('/');
    });

    当('用户点击创建项目', () => {
      cy.添加项目树视图项目();
    });

    并且('用户输入合法内容和按下回车键，然后点击', () => {
      cy.获取项目树标题输入框().type('title{enter}');
      cy.获取项目树节点通过标题('title').click();
    });

    那么('用户应该能看到项目名称在项目树中并且选中', () => {
      cy.获取项目树节点通过标题('title')
        .should('exist')
        .should('have.class', 'ant-tree-treenode-selected');
    });

    当('用户双击选中节点', () => {
      cy.获取项目树节点通过标题('title').dblclick();
    });

    那么('用户应该能看到项目名称在项目树中并且未选中', () => {
      cy.获取项目树节点通过标题('title')
        .should('exist')
        .should('not.have.class', 'ant-tree-treenode-selected');
    });
  });

  假如('用户创建项目失败，应该没有选中', ({ 当, 并且, 那么 }) => {
    当('登录', () => {
      cy.登录('yb', '123456');
    });
    当('在主页', () => {
      cy.visit('/');
    });
    当('存在一个没有被选中的项目节点', () => {
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('title{enter}');
      cy.获取项目树节点标题元素('title').dblclick();
    });

    当('用户点击创建项目按钮', () => {
      cy.添加项目树视图项目();
    });
    并且('用户输入非法内容', () => {
      cy.获取项目树标题输入框().type('$');
    });
    并且('失去焦点', () => {
      cy.获取项目树标题输入框().blur();
    });
    那么('用户应该能看到输入框消失', () => {
      cy.获取项目树标题输入框().should('not.exist');
    });
    并且('没有节点被选中', () => {
      cy.get('.ant-tree-treenode')
        .filter((_index, $treeNode) => {
          return $treeNode.classList.contains('ant-tree-treenode-selected');
        })
        .should('have.length', 0);
    });
  });

  假如(
    '用户选中了一个节点，然后准备创建项目，但是取消后，应该回到之前的选中状态',
    ({ 当, 并且, 那么 }) => {
      当('用户已经登录', () => {
        cy.登录('yb', '123456');
      });
      当('用户在主页访问', () => {
        cy.visit('/');
      });
      当('项目树存在一个项目组文件夹节点', () => {
        cy.获取添加项目组的按钮().click();
        cy.获取项目树标题输入框().type('group{enter}');

        cy.获取antd树列表内部容器()
          .children()
          .should('have.length', 1)
          .first()
          .should('have.class', 'ant-tree-treenode')
          .find('.ant-tree-iconEle')
          .children('.anticon-folder')
          .should('have.length', 1);
      });
      当('用户已经选中项目组文件夹节点', () => {
        cy.获取项目树节点通过标题('group').click();
        cy.获取项目树节点通过标题('group').should(
          'have.class',
          'ant-tree-treenode-selected',
        );
      });
      并且('点击了创建项目按钮', () => {
        cy.添加项目树视图项目();
      });
      并且('输入了非法标题', () => {
        cy.获取项目树标题输入框().type('*');
      });
      并且('失去了输入焦点', () => {
        cy.获取项目树标题输入框().blur();
      });
      那么('用户应该能看到输入框消失', () => {
        cy.获取项目树标题输入框().should('not.exist');
      });
      并且('之前选中的节点自动被选中', () => {
        cy.获取项目树节点通过标题('group').should(
          'have.class',
          'ant-tree-treenode-selected',
        );
      });
    },
  );
});

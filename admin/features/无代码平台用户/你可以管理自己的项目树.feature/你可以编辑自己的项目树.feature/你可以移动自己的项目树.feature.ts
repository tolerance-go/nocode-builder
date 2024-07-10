import { 测试标识, 测试类 } from '@cypress/shared/constants';
import { getTreeNodeParent } from '@cypress/support/antdUtils';
import { 使用场景 } from '@cypress/support/scenarioUtils';

使用场景('项目树移动流程', ({ 假如 }) => {
  假如(
    '用户批量移动选中的节点，那么鼠标附近应该出现提示数量',
    ({ 当, 那么 }) => {
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
          cy.获取添加项目组的按钮().click();
          cy.获取项目树标题输入框().type('file4{enter}');
          cy.获取添加项目组的按钮().click();
          cy.获取项目树标题输入框().type('folder{enter}');
        },
      );
      那么(
        '项目树中应该包含一个文件夹 folder 和三个文件 file1, file2, file3, file4',
        () => {
          cy.获取antd树列表内部容器().should('contain.text', 'folder');
          cy.获取antd树列表内部容器().should('contain.text', 'file1');
          cy.获取antd树列表内部容器().should('contain.text', 'file2');
          cy.获取antd树列表内部容器().should('contain.text', 'file3');
          cy.获取antd树列表内部容器().should('contain.text', 'file4');
        },
      );
      当('用户组合批量选中文件 file1, file2, file3 并拖动到 folder 中', () => {
        cy.组合批量选中节点(['file1', 'file2', 'file3']);
        cy.获取项目树节点通过标题('file1').拖拽到(
          cy.获取项目树节点通过标题('folder'),
          {
            vertical: 'bottom',
            horizontal: 'right',
          },
          {
            notDrop: true,
          },
        );
      });
      那么('鼠标附近应该出现提示数量为 3', () => {
        cy.获取测试标识(测试标识.拖拽跟随鼠标的容器).should(
          'contain.text',
          '3',
        );
      });
    },
  );

  假如('用户移动单节点，那么鼠标附近应该出现标题提示', ({ 当, 那么 }) => {
    当('用户已经登录', () => {
      cy.登录('yb', '123456');
    });
    当('用户访问主页', () => {
      cy.visit('/');
    });
    当(
      '用户在根节点创建了一个文件夹和多个文件，文件夹标题为 folder，文件标题分别为 file1',
      () => {
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('file1{enter}');
        cy.获取添加项目组的按钮().click();
        cy.获取项目树标题输入框().type('folder{enter}');
      },
    );
    那么('项目树中应该包含一个文件夹 folder 和三个文件 file1', () => {
      cy.获取antd树列表内部容器().should('contain.text', 'folder');
      cy.获取antd树列表内部容器().should('contain.text', 'file1');
    });
    当('用户拖动文件 file1 到文件夹 folder 中', () => {
      cy.获取项目树节点通过标题('file1').拖拽到(
        cy.获取项目树节点通过标题('folder'),
        {
          vertical: 'bottom',
          horizontal: 'right',
        },
        {
          notDrop: true,
        },
      );
    });
    那么('鼠标附近应该出现标题提示为 file1', () => {
      cy.获取测试标识(测试标识.拖拽跟随鼠标的容器).should(
        'contain.text',
        'file1',
      );
    });
  });
  假如(
    '用使用 ctrl + 鼠标左键批量选中多个节点，拖动到文件夹，应该可以全部正确移动',
    ({ 当, 那么 }) => {
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
          cy.获取添加项目组的按钮().click();
          cy.获取项目树标题输入框().type('file4{enter}');
          cy.获取添加项目组的按钮().click();
          cy.获取项目树标题输入框().type('folder{enter}');
        },
      );
      那么(
        '项目树中应该包含一个文件夹 folder 和三个文件 file1, file2, file3, file4',
        () => {
          cy.获取antd树列表内部容器().should('contain.text', 'folder');
          cy.获取antd树列表内部容器().should('contain.text', 'file1');
          cy.获取antd树列表内部容器().should('contain.text', 'file2');
          cy.获取antd树列表内部容器().should('contain.text', 'file3');
          cy.获取antd树列表内部容器().should('contain.text', 'file4');
        },
      );
      当('用户组合批量选中文件 file2, file4 并拖动到 folder 中', () => {
        cy.组合批量选中节点(['file2', 'file4']);
        cy.获取项目树节点通过标题('file2').拖拽到(
          cy.获取项目树节点通过标题('folder'),
          {
            vertical: 'bottom',
            horizontal: 'right',
          },
        );
      });
      那么('文件夹 folder 自动打开并包含文件 file2, file4', () => {
        cy.获取项目树节点通过标题('folder').should(
          'have.class',
          'ant-tree-treenode-switcher-open',
        );
        cy.获取项目树节点通过标题('file2').should('be.visible');
        cy.获取项目树节点通过标题('file2')
          .parent('.ant-tree-treenode-motion')
          .should('not.exist');
        cy.获取项目树节点通过标题('file4').should('be.visible');
        cy.获取项目树节点通过标题('file4')
          .parent('.ant-tree-treenode-motion')
          .should('not.exist');
      });
      那么('文件 file2, file4 应该被正确移动到文件夹 folder 中', () => {
        ['file2', 'file4'].forEach((file) => {
          cy.获取项目树节点通过标题(file).then(($file) => {
            const $parent = getTreeNodeParent($file);
            expect(
              $parent
                .find(`[data-test-class*="${测试类.项目树节点标题}"]`)
                .text(),
            ).equal('folder');
          });
        });
      });
    },
  );

  假如(
    '用户批量选中同级文件，拖动到文件夹中，应该可以全部正确移动',
    ({ 当, 那么 }) => {
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
          cy.获取添加项目组的按钮().click();
          cy.获取项目树标题输入框().type('folder{enter}');
        },
      );
      那么(
        '项目树中应该包含一个文件夹 folder 和三个文件 file1, file2, file3',
        () => {
          cy.获取antd树列表内部容器().should('contain.text', 'folder');
          cy.获取antd树列表内部容器().should('contain.text', 'file1');
          cy.获取antd树列表内部容器().should('contain.text', 'file2');
          cy.获取antd树列表内部容器().should('contain.text', 'file3');
        },
      );
      当('用户批量选中文件 file1, file2, file3 并拖动到 folder 中', () => {
        cy.范围批量选中节点('file1', 'file3');
        cy.获取项目树节点通过标题('file1').拖拽到(
          cy.获取项目树节点通过标题('folder'),
          {
            vertical: 'bottom',
            horizontal: 'right',
          },
        );
      });
      那么('文件夹 folder 自动打开并包含文件 file1, file2, file3', () => {
        cy.获取项目树节点通过标题('folder').should(
          'have.class',
          'ant-tree-treenode-switcher-open',
        );
        cy.获取项目树节点通过标题('file1').should('be.visible');
        cy.获取项目树节点通过标题('file1')
          .parent('.ant-tree-treenode-motion')
          .should('not.exist');
        cy.获取项目树节点通过标题('file2').should('be.visible');
        cy.获取项目树节点通过标题('file2')
          .parent('.ant-tree-treenode-motion')
          .should('not.exist');
        cy.获取项目树节点通过标题('file3').should('be.visible');
        cy.获取项目树节点通过标题('file3')
          .parent('.ant-tree-treenode-motion')
          .should('not.exist');
      });
      那么('文件 file1, file2, file3 应该被正确移动到文件夹 folder 中', () => {
        ['file1', 'file2', 'file3'].forEach((file) => {
          cy.获取项目树节点通过标题(file).then(($file) => {
            const $parent = getTreeNodeParent($file);
            expect(
              $parent
                .find(`[data-test-class*="${测试类.项目树节点标题}"]`)
                .text(),
            ).equal('folder');
          });
        });
      });
    },
  );

  假如('用户拖拽文件，应该可以进行排序', ({ 当, 那么 }) => {
    当('用户已经登录', () => {
      cy.登录('yb', '123456');
    });
    当('用户访问主页', () => {
      cy.visit('/');
    });
    当(
      '用户在跟节点创建了2个项目文件节点，第一个标题为 a，第二个标题为 b',
      () => {
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('b{enter}');
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('a{enter}');
      },
    );
    那么('第一个标题为 a，第二个标题为 b', () => {
      cy.获取antd树列表内部容器().children().eq(0).should('contain.text', 'a');
      cy.获取antd树列表内部容器().children().eq(1).should('contain.text', 'b');
    });
    当('用户拖拽 b 到 a 的前面', () => {
      cy.获取项目树节点通过标题('b').拖拽到(cy.获取项目树节点通过标题('a'), {
        vertical: 'top',
      });
    });
    那么('第一个标题为 b，第二个标题为 a', () => {
      cy.获取antd树列表内部容器().children().eq(0).should('contain.text', 'b');
      cy.获取antd树列表内部容器().children().eq(1).should('contain.text', 'a');
    });
    当('用户拖拽 b 到 a 的后面', () => {
      cy.获取项目树节点通过标题('b').拖拽到(cy.获取项目树节点通过标题('a'), {
        vertical: 'bottom',
      });
    });
    那么('第一个标题为 a，第二个标题为 b', () => {
      cy.获取antd树列表内部容器().children().eq(0).should('contain.text', 'a');
      cy.获取antd树列表内部容器().children().eq(1).should('contain.text', 'b');
    });
  });

  假如('用户拖拽文件到文件夹中，应该可以移动位置', ({ 当, 那么 }) => {
    当('用户已经登录', () => {
      cy.登录('yb', '123456');
    });
    当('用户访问主页', () => {
      cy.visit('/');
    });
    当(
      '用户在跟节点创建了一个文件夹和一个文件，文件夹标题为 folder，文件标题为 file',
      () => {
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('file{enter}');
        cy.获取添加项目组的按钮().click();
        cy.获取项目树标题输入框().type('folder{enter}');
      },
    );
    那么('项目树中应该包含一个文件夹 folder 和一个文件 file', () => {
      cy.获取antd树列表内部容器().should('contain.text', 'folder');
      cy.获取antd树列表内部容器().should('contain.text', 'file');
    });
    当('用户拖拽 file 到 folder 中', () => {
      cy.获取项目树节点通过标题('file').拖拽到(
        cy.获取项目树节点通过标题('folder'),
        {
          vertical: 'bottom',
          horizontal: 'right',
        },
      );
    });
    那么('文件夹自动打开，文件显示，并且等待展开文件动画完成', () => {
      cy.获取项目树节点通过标题('folder').should(
        'have.class',
        'ant-tree-treenode-switcher-open',
      );
      cy.获取项目树节点通过标题('file').should('be.visible');
      cy.获取项目树节点通过标题('file')
        .parent('.ant-tree-treenode-motion')
        .should('not.exist');
    });
    那么('文件 file 应该被插入到文件夹 folder 中', () => {
      cy.获取项目树节点通过标题('file').then(($file) => {
        const $parent = getTreeNodeParent($file);
        expect(
          $parent.find(`[data-test-class="${测试类.项目树节点标题}"]`).text(),
        ).equal('folder');
      });
    });
  });

  假如(
    '用户拖拽项目文件，文件应该无法拖放到文件夹的前面放置',
    ({ 当, 那么 }) => {
      当('用户已经登录', () => {
        cy.登录('yb', '123456');
      });
      当('用户访问主页', () => {
        cy.visit('/');
      });
      当(
        '用户在跟节点创建了一个文件夹和一个文件，文件夹标题为 folder，文件标题为 file',
        () => {
          cy.添加项目树视图项目();
          cy.获取项目树标题输入框().type('file{enter}');
          cy.获取添加项目组的按钮().click();
          cy.获取项目树标题输入框().type('folder{enter}');
        },
      );
      那么(
        '项目树中应该包含一个文件夹 folder 和一个文件 file，并且文件 file 应该在文件夹 folder 前面',
        () => {
          cy.获取antd树列表内部容器()
            .children()
            .eq(0)
            .should('contain.text', 'folder');
          cy.获取antd树列表内部容器()
            .children()
            .eq(1)
            .should('contain.text', 'file');
        },
      );
      当('用户尝试将 file 拖放到 folder 的前面', () => {
        cy.获取项目树节点通过标题('file').拖拽到(
          cy.获取项目树节点通过标题('folder'),
          {
            vertical: 'top',
          },
        );
      });
      那么('文件 file 应该仍然保持在原位置', () => {
        cy.获取antd树列表内部容器()
          .children()
          .eq(0)
          .should('contain.text', 'folder');
        cy.获取antd树列表内部容器()
          .children()
          .eq(1)
          .should('contain.text', 'file');
      });
    },
  );

  假如(
    '用户拖动项目文件节点到项目组文件夹，应该自动打开这个文件夹',
    ({ 当, 那么, 并且 }) => {
      当('用户已经登录', () => {
        cy.登录('yb', '123456');
      });
      当('用户访问主页', () => {
        cy.visit('/');
      });
      当(
        '用户在跟节点创建了一个文件夹和一个文件，文件夹标题为 folder，文件标题为 file',
        () => {
          cy.添加项目树视图项目();
          cy.获取项目树标题输入框().type('file{enter}');
          cy.获取添加项目组的按钮().click();
          cy.获取项目树标题输入框().type('folder{enter}');
        },
      );
      那么('项目树中应该包含一个文件夹 folder 和一个文件 file', () => {
        cy.获取antd树列表内部容器().should('contain.text', 'folder');
        cy.获取antd树列表内部容器().should('contain.text', 'file');
      });
      并且('文件夹 folder 初始状态应该是关闭的', () => {
        cy.获取项目树节点通过标题('folder').should(
          'not.have.class',
          'ant-tree-treenode-switcher-open',
        );
      });
      当('用户拖拽 file 到 folder 中', () => {
        cy.获取项目树节点通过标题('file').拖拽到(
          cy.获取项目树节点通过标题('folder'),
          {
            vertical: 'bottom',
            horizontal: 'right',
          },
        );
      });
      那么('文件夹自动打开', () => {
        cy.获取项目树节点通过标题('folder').should(
          'have.class',
          'ant-tree-treenode-switcher-open',
        );
      });
    },
  );

  假如('用户拖拽文件夹，应该可以进行排序', ({ 当, 那么 }) => {
    当('用户已经登录', () => {
      cy.登录('yb', '123456');
    });
    当('用户访问主页', () => {
      cy.visit('/');
    });
    当(
      '用户在跟节点创建了2个文件夹，第一个标题为 folder1，第二个标题为 folder2',
      () => {
        cy.获取添加项目组的按钮().click();
        cy.获取项目树标题输入框().type('folder2');
        cy.获取测试标识(测试标识.项目树容器).click();
        cy.获取添加项目组的按钮().click();
        cy.获取项目树标题输入框().type('folder1');
        cy.获取测试标识(测试标识.项目树容器).click();
      },
    );
    那么('第一个标题为 folder1，第二个标题为 folder2', () => {
      cy.获取antd树列表内部容器()
        .children()
        .eq(0)
        .should('contain.text', 'folder1');
      cy.获取antd树列表内部容器()
        .children()
        .eq(1)
        .should('contain.text', 'folder2');
    });
    当('用户拖拽 folder2 到 folder1 的前面', () => {
      cy.获取项目树节点通过标题('folder2').拖拽到(
        cy.获取项目树节点通过标题('folder1'),
        {
          vertical: 'top',
        },
      );
    });
    那么('第一个标题为 folder2，第二个标题为 folder1', () => {
      cy.获取antd树列表内部容器()
        .children()
        .eq(0)
        .should('contain.text', 'folder2');
      cy.获取antd树列表内部容器()
        .children()
        .eq(1)
        .should('contain.text', 'folder1');
    });
    当('用户拖拽 folder2 到 folder1 的后面', () => {
      cy.获取项目树节点通过标题('folder2').拖拽到(
        cy.获取项目树节点通过标题('folder1'),
        {
          vertical: 'bottom',
          horizontal: 'left',
        },
      );
    });
    那么('第一个标题为 folder1，第二个标题为 folder2', () => {
      cy.获取antd树列表内部容器()
        .children()
        .eq(0)
        .should('contain.text', 'folder1');
      cy.获取antd树列表内部容器()
        .children()
        .eq(1)
        .should('contain.text', 'folder2');
    });
  });
});

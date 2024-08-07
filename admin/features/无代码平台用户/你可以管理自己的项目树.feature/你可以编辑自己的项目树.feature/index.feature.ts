import { 组件测试标识, 组件测试类名 } from '@/common/constants';
import { apiUrls } from '@cypress/support/_gen/apiUrls';
import {
  getTreeNodeChildren,
  getTreeNodeParent,
  使用场景,
} from '@cypress/support/utils';

使用场景('项目树编辑流程', ({ 假如 }) => {
  beforeEach(() => {
    cy.拦截请求(apiUrls.SyncController_applyProjectDiff, {
      statusCode: 200,
    });
  });

  假如('用户移动一个节点到文件夹下，应该可以回撤和重做', ({ 当, 那么 }) => {
    当('用户登录并访问主页', () => {
      cy.登录('yb', '123456');
      cy.visit('/');
    });

    当('用户成功创建一个项目节点和一个文件夹节点', () => {
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('项目节点{enter}');

      cy.获取添加项目组的按钮().click();
      cy.获取项目树标题输入框().type('文件夹节点{enter}');

      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '文件夹节点',
              childGroups: [],
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              projects: [],
              createdAt: '',
              updatedAt: '',
            },
          ]),
        );
      });
    });

    当('用户将项目节点移动到文件夹节点下', () => {
      cy.获取项目树节点通过标题('项目节点').拖拽到(
        cy.获取项目树节点通过标题('文件夹节点'),
        {
          vertical: 'bottom',
          horizontal: 'right',
        },
      );
      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              projectGroup: {
                id: 1,
                name: '文件夹节点',
                childGroups: [],
                ownerId: 2,
                owner: {
                  id: 2,
                  name: 'yb',
                  password: '',
                  projects: [],
                  createdAt: '',
                  updatedAt: '',
                  projectGroups: [],
                },
                projects: [],
                createdAt: '',
                updatedAt: '',
              },
              projectGroupId: 1,
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '文件夹节点',
              childGroups: [],
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              projects: [],
              createdAt: '',
              updatedAt: '',
            },
          ]),
        );
      });
    });

    那么('项目节点应该位于文件夹节点下', () => {
      cy.获取项目树节点通过标题('文件夹节点').should(
        'have.class',
        'ant-tree-treenode-switcher-open',
      );
      cy.获取项目树节点通过标题('项目节点').should('be.visible');
      cy.获取项目树节点通过标题('项目节点')
        .parent('.ant-tree-treenode-motion')
        .should('not.exist');

      cy.获取项目树节点通过标题('项目节点').then(($file) => {
        const $parent = getTreeNodeParent($file);
        expect(
          $parent
            .find(`[data-test-class*="${组件测试类名.项目树节点标题}"]`)
            .text(),
        ).equal('文件夹节点');
      });
    });

    当('用户按下 ctrl + z 撤销操作', () => {
      cy.get('body').type('{ctrl}z');
    });

    那么('项目节点应该恢复到原来的位置', () => {
      cy.获取项目树节点通过标题('文件夹节点').then(($folder) => {
        const $children = getTreeNodeChildren($folder);
        expect($children.length).equal(0);
      });
      cy.获取antd树列表内部容器().children().should('have.length', 2);

      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '文件夹节点',
              childGroups: [],
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              projects: [],
              createdAt: '',
              updatedAt: '',
            },
          ]),
        );
      });
    });

    当('用户按下 ctrl + shift + z 重做操作', () => {
      cy.get('body').type('{ctrl}{shift}z');
    });

    那么('项目节点应该再次位于文件夹节点下', () => {
      cy.获取项目树节点通过标题('文件夹节点').should(
        'have.class',
        'ant-tree-treenode-switcher-open',
      );
      cy.获取项目树节点通过标题('项目节点').should('be.visible');
      cy.获取项目树节点通过标题('项目节点')
        .parent('.ant-tree-treenode-motion')
        .should('not.exist');

      cy.获取项目树节点通过标题('项目节点').then(($file) => {
        const $parent = getTreeNodeParent($file);
        expect(
          $parent
            .find(`[data-test-class*="${组件测试类名.项目树节点标题}"]`)
            .text(),
        ).equal('文件夹节点');
      });

      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              projectGroup: {
                id: 1,
                name: '文件夹节点',
                childGroups: [],
                ownerId: 2,
                owner: {
                  id: 2,
                  name: 'yb',
                  password: '',
                  projects: [],
                  createdAt: '',
                  updatedAt: '',
                  projectGroups: [],
                },
                projects: [],
                createdAt: '',
                updatedAt: '',
              },
              projectGroupId: 1,
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '文件夹节点',
              childGroups: [],
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              projects: [],
              createdAt: '',
              updatedAt: '',
            },
          ]),
        );
      });
    });
  });

  假如('用户删除节点标题后，应该可以回撤和重做', ({ 当, 那么 }) => {
    当('用户登录并访问主页', () => {
      cy.登录('yb', '123456');
      cy.visit('/');
    });

    当('用户成功创建一个项目节点', () => {
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('项目节点{enter}');

      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    当('用户删除节点', () => {
      cy.获取项目树节点通过标题('项目节点').click();
      cy.get('body').type('{del}');
      cy.获取antd树列表内部容器().children().should('have.length', 0);

      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    当('用户按下 ctrl + z', () => {
      cy.get('body').type('{ctrl}z');

      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    那么('节点标题应该回到之前的状态', () => {
      cy.获取项目树节点标题元素('项目节点').should('exist');
    });

    当('用户按下 ctrl + shift + z', () => {
      cy.get('body').type('{ctrl}{shift}z');

      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    那么('节点标题应该还原', () => {
      cy.获取antd树列表内部容器().children().should('have.length', 0);
    });
  });

  假如('用户编辑节点标题后，又按快捷键撤销，应该回到之前', ({ 当, 那么 }) => {
    当('用户登录并访问主页', () => {
      cy.登录('yb', '123456');
      cy.visit('/');
    });

    当('用户成功创建一个项目节点', () => {
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('项目节点{enter}');

      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    当('用户编辑节点标题', () => {
      cy.获取项目树节点通过标题('项目节点').click();
      cy.get('body').trigger('keydown', {
        keyCode: 113,
        which: 113,
        key: 'F2',
      });
      cy.获取项目树标题输入框().type('{selectall}{backspace}新项目节点{enter}');

      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '新项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    当('用户按下 ctrl + z', () => {
      cy.get('body').type('{ctrl}z');
      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    那么('节点标题应该回到之前的状态', () => {
      cy.获取项目树节点标题元素('项目节点').should('have.text', '项目节点');
    });

    当('用户按下 ctrl + shift + z', () => {
      cy.get('body').type('{ctrl}{shift}z');
      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '新项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    那么('节点标题应该还原', () => {
      cy.获取antd树列表内部容器()
        .children()
        .should('have.length', 1)
        .should('have.text', '新项目节点');
    });
  });

  假如(
    '用户激活了项目节点，新建节点成功保存后，应该激活新节点',
    ({ 当, 并且, 那么 }) => {
      当('用户登录并访问主页', () => {
        cy.登录('yb', '123456');
        cy.visit('/');
      });

      当('用户成功创建一个项目节点', () => {
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('项目节点1{enter}');
        cy.window().then((win) => {
          expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
            JSON.stringify([
              {
                id: 1,
                name: '项目节点1',
                ownerId: 2,
                owner: {
                  id: 2,
                  name: 'yb',
                  password: '',
                  projects: [],
                  createdAt: '',
                  updatedAt: '',
                  projectGroups: [],
                },
                createdAt: '',
                updatedAt: '',
                type: 'View',
              },
            ]),
          );
          expect(
            JSON.stringify(win.projectGroupTable.toTestSnapshot()),
          ).to.equal(JSON.stringify([]));
        });
      });

      那么('这个节点应该处于激活状态', () => {
        cy.获取项目树节点标题元素('项目节点1').should('have.class', 'active');
      });

      当('用户再次新建项目节点', () => {
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('项目节点2');

        cy.window().then((win) => {
          expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
            JSON.stringify([
              {
                id: 1,
                name: '项目节点1',
                ownerId: 2,
                owner: {
                  id: 2,
                  name: 'yb',
                  password: '',
                  projects: [],
                  createdAt: '',
                  updatedAt: '',
                  projectGroups: [],
                },
                createdAt: '',
                updatedAt: '',
                type: 'View',
              },
              {
                id: 2,
                name: '',
                ownerId: 2,
                owner: {
                  id: 2,
                  name: 'yb',
                  password: '',
                  projects: [],
                  createdAt: '',
                  updatedAt: '',
                  projectGroups: [],
                },
                createdAt: '',
                updatedAt: '',
                type: 'View',
              },
            ]),
          );
          expect(
            JSON.stringify(win.projectGroupTable.toTestSnapshot()),
          ).to.equal(JSON.stringify([]));
        });
      });

      那么('编辑中的时候，原节点保持激活状态', () => {
        cy.获取项目树节点标题元素('项目节点1').should('have.class', 'active');
      });

      当('编辑完成', () => {
        cy.获取项目树标题输入框().type('{enter}');
      });

      那么('新创建的项目节点为激活状态', () => {
        cy.获取项目树节点标题元素('项目节点2').should('have.class', 'active');
      });

      并且('之前的项目节点失去激活状态', () => {
        cy.获取项目树节点标题元素('项目节点1').should(
          'not.have.class',
          'active',
        );
      });
    },
  );

  假如('用户创建了项目节点，应该可以回撤和重做', ({ 当, 那么 }) => {
    当('用户登录且访问主页', () => {
      cy.登录('yb', '123456');
      cy.visit('/');
    });

    当('用户创建一个项目节点', () => {
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('项目节点{enter}');

      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    那么('此时项目树区域应该聚焦', () => {
      cy.获取测试标识(组件测试标识.项目树区域容器).should(
        'have.class',
        'focused',
      );
    });

    当('用户按下 ctrl + z 键', () => {
      cy.get('body').type('{ctrl}z');

      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    那么('项目节点应该被删除', () => {
      cy.获取antd树列表内部容器().children().should('have.length', 0);
    });

    当('用户按下 ctrl + shift + z 键', () => {
      cy.get('body').type('{ctrl}{shift}z');
      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    那么('项目节点应该被恢复', () => {
      cy.获取项目树节点通过标题('项目节点').should('exist');
    });
  });

  假如(
    '用户聚焦了节点，进入又退出新节点标题编辑，那么聚焦应该失去又恢复',
    ({ 当, 并且, 那么 }) => {
      当('用户登录且访问主页', () => {
        cy.登录('yb', '123456');
        cy.visit('/');
      });

      当('用户创建一个视图项目节点', () => {
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('项目节点{enter}');
        cy.window().then((win) => {
          expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
            JSON.stringify([
              {
                id: 1,
                name: '项目节点',
                ownerId: 2,
                owner: {
                  id: 2,
                  name: 'yb',
                  password: '',
                  projects: [],
                  createdAt: '',
                  updatedAt: '',
                  projectGroups: [],
                },
                createdAt: '',
                updatedAt: '',
                type: 'View',
              },
            ]),
          );
          expect(
            JSON.stringify(win.projectGroupTable.toTestSnapshot()),
          ).to.equal(JSON.stringify([]));
        });
      });

      当('用户聚焦了一个节点', () => {
        cy.获取项目树节点通过标题('项目节点').click();
      });

      那么('这个节点应该聚焦', () => {
        cy.获取项目树节点标题元素('项目节点').should('have.class', 'focused');
      });

      当('用户进入新节点标题编辑', () => {
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('something');
      });

      那么('原节点应该失去聚焦', () => {
        cy.获取项目树节点标题元素('项目节点').should(
          'not.have.class',
          'focused',
        );
      });

      并且('用户取消新节点标题编辑', () => {
        cy.get('body').type('{esc}');
      });

      那么('原节点应该恢复聚焦', () => {
        cy.获取项目树节点标题元素('项目节点').should('have.class', 'focused');
      });
    },
  );

  假如('用户点击项目树之外的区域，应该失去节点聚焦', ({ 当, 并且, 那么 }) => {
    当('用户登录且访问主页', () => {
      cy.登录('yb', '123456');
      cy.visit('/');
    });

    当('用户创建一个视图项目节点', () => {
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('项目节点{enter}');
      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    并且('点击他', () => {
      cy.获取项目树节点通过标题('项目节点').click();
    });

    那么('这个节点应该聚焦', () => {
      cy.获取项目树节点标题元素('项目节点').should('have.class', 'focused');
    });

    当('用户点击其他地方', () => {
      cy.get('body').click('topRight');
    });

    并且('节点失去聚焦', () => {
      cy.获取项目树节点标题元素('项目节点').should('not.have.class', 'focused');
    });
  });

  假如('用户选中项目树容器，应该失去节点聚焦', ({ 当, 并且, 那么 }) => {
    当('用户登录且访问主页', () => {
      cy.登录('yb', '123456');
      cy.visit('/');
    });

    当('用户创建一个视图项目节点', () => {
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('项目节点{enter}');
      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    并且('点击他', () => {
      cy.获取项目树节点通过标题('项目节点').click();
    });

    那么('这个节点应该聚焦', () => {
      cy.获取项目树节点标题元素('项目节点').should('have.class', 'focused');
    });

    当('用户点击项目树容器', () => {
      cy.获取项目树容器().click('bottom');
    });

    那么('项目树容器应该被选中', () => {
      cy.获取项目树容器().should('have.class', 'selected');
    });

    并且('节点失去聚焦', () => {
      cy.获取项目树节点标题元素('项目节点').should('not.have.class', 'focused');
    });
  });

  假如('用户快捷重命名，应该对聚焦的节点起作用', ({ 当, 并且, 那么 }) => {
    当('用户登录并且访问主页', () => {
      cy.登录('yb', '123456');
      cy.visit('/');
    });

    当('用户创建2个视图项目节点', () => {
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('项目节点1{enter}');
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('项目节点2{enter}');
      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点1',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
            {
              id: 2,
              name: '项目节点2',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    当('用户选中其中一个节点', () => {
      cy.获取项目树节点通过标题('项目节点1').click();
    });

    当('用户按住 ctrl 选中另外一个节点', () => {
      cy.获取项目树节点通过标题('项目节点2').click({ ctrlKey: true });
    });

    并且('用户按住 ctrl 取消选中第一个选中的节点', () => {
      cy.获取项目树节点通过标题('项目节点1').click({ ctrlKey: true });
    });

    那么('第一个节点应该聚焦', () => {
      cy.获取项目树节点标题元素('项目节点1').should('have.class', 'focused');
    });

    当('用户按下 f2', () => {
      cy.get('body').trigger('keydown', {
        keyCode: 113,
        which: 113,
        key: 'F2',
      });
    });

    那么('第一个聚焦节点应该进入编辑状态', () => {
      cy.获取项目树标题输入框().should('be.visible');
      cy.获取项目树标题输入框().should('have.value', '项目节点1');
    });
  });

  假如('用户点击菜单项重命名，应该对聚焦的节点起作用', ({ 当, 那么 }) => {
    当('用户登录并且访问主页', () => {
      cy.登录('yb', '123456');
      cy.visit('/');
    });

    当('用户创建2个视图项目节点', () => {
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('项目节点1{enter}');
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('项目节点2{enter}');
      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点1',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
            {
              id: 2,
              name: '项目节点2',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    当('用户选中其中一个节点', () => {
      cy.获取项目树节点通过标题('项目节点1').click();
    });

    当('用户右击另外一个节点', () => {
      cy.获取项目树节点通过标题('项目节点2').rightclick();
    });

    那么('另外一个节点应该进入聚焦状态', () => {
      cy.获取项目树节点标题元素('项目节点2').should('have.class', 'focused');
    });

    当('用户点击编辑菜单项', () => {
      cy.获取测试标识(组件测试标识.重命名项目树节点标题菜单按钮).click();
    });

    那么('被右击的节点进入编辑状态', () => {
      cy.获取项目树标题输入框().should('be.visible');
      cy.获取项目树标题输入框().should('have.value', '项目节点2');
    });
  });

  假如('用户左键点击项目树节点，应该进入聚焦状态', ({ 当, 并且, 那么 }) => {
    当('用户已经登录', () => {
      cy.登录('yb', '123456');
    });

    当('用户访问主页', () => {
      cy.visit('/');
    });

    当('用户创建了项目树中一个项目节点', () => {
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('项目节点{enter}');
      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    并且('左键点击项目树节点', () => {
      cy.获取项目树节点通过标题('项目节点').click();
    });

    那么('项目节点应该进入聚焦状态', () => {
      cy.获取项目树节点标题元素('项目节点').should('have.class', 'focused');
    });
  });

  假如('用户右键点击项目树节点，应该进入聚焦状态', ({ 当, 并且, 那么 }) => {
    当('用户已经登录', () => {
      cy.登录('yb', '123456');
    });

    当('用户访问主页', () => {
      cy.visit('/');
    });

    当('用户创建了项目树中一个项目节点', () => {
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('项目节点{enter}');
      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    并且('右键点击唤起菜单项', () => {
      cy.获取项目树节点通过标题('项目节点').rightclick();
    });

    那么('项目节点应该进入聚焦状态', () => {
      cy.获取项目树节点标题元素('项目节点').should('have.class', 'focused');
    });
  });

  假如('用户点击了项目树菜单项，不应该取消选中', ({ 当, 并且, 那么 }) => {
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
      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
    });

    并且('右键点击唤起菜单项', () => {
      cy.获取项目树节点通过标题('项目节点').rightclick();
    });

    当('用户点击编辑菜单', () => {
      cy.获取测试标识(组件测试标识.重命名项目树节点标题菜单按钮).click();
    });

    那么('项目节点应该进入编辑状态', () => {
      cy.获取项目树标题输入框().should('be.visible');
      cy.获取项目树标题输入框().should('have.value', '项目节点');
    });
  });

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
      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
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
      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目组节点',
              childGroups: [],
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              projects: [],
              createdAt: '',
              updatedAt: '',
            },
          ]),
        );
      });
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
        cy.window().then((win) => {
          expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
            JSON.stringify([
              {
                id: 1,
                name: '项目节点',
                ownerId: 2,
                owner: {
                  id: 2,
                  name: 'yb',
                  password: '',
                  projects: [],
                  createdAt: '',
                  updatedAt: '',
                  projectGroups: [],
                },
                createdAt: '',
                updatedAt: '',
                type: 'View',
              },
            ]),
          );
          expect(
            JSON.stringify(win.projectGroupTable.toTestSnapshot()),
          ).to.equal(JSON.stringify([]));
        });
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
        cy.window().then((win) => {
          expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
            JSON.stringify([
              {
                id: 1,
                name: '文件夹0',
                ownerId: 2,
                owner: {
                  id: 2,
                  name: 'yb',
                  password: '',
                  projects: [],
                  createdAt: '',
                  updatedAt: '',
                  projectGroups: [],
                },
                createdAt: '',
                updatedAt: '',
                type: 'View',
              },
              {
                id: 2,
                name: '文件夹1',
                ownerId: 2,
                owner: {
                  id: 2,
                  name: 'yb',
                  password: '',
                  projects: [],
                  createdAt: '',
                  updatedAt: '',
                  projectGroups: [],
                },
                createdAt: '',
                updatedAt: '',
                type: 'View',
              },
              {
                id: 3,
                name: '文件夹2',
                ownerId: 2,
                owner: {
                  id: 2,
                  name: 'yb',
                  password: '',
                  projects: [],
                  createdAt: '',
                  updatedAt: '',
                  projectGroups: [],
                },
                createdAt: '',
                updatedAt: '',
                type: 'View',
              },
            ]),
          );
          expect(
            JSON.stringify(win.projectGroupTable.toTestSnapshot()),
          ).to.equal(JSON.stringify([]));
        });
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
        cy.获取测试类(组件测试类名.项目树节点标题).should('have.length', 1);
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
        cy.window().then((win) => {
          expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
            JSON.stringify([
              {
                id: 1,
                name: '项目节点',
                ownerId: 2,
                owner: {
                  id: 2,
                  name: 'yb',
                  password: '',
                  projects: [],
                  createdAt: '',
                  updatedAt: '',
                  projectGroups: [],
                },
                createdAt: '',
                updatedAt: '',
                type: 'View',
              },
            ]),
          );
          expect(
            JSON.stringify(win.projectGroupTable.toTestSnapshot()),
          ).to.equal(JSON.stringify([]));
        });
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
      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
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
      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
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
      cy.window().then((win) => {
        expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
          JSON.stringify([
            {
              id: 1,
              name: '项目节点',
              ownerId: 2,
              owner: {
                id: 2,
                name: 'yb',
                password: '',
                projects: [],
                createdAt: '',
                updatedAt: '',
                projectGroups: [],
              },
              createdAt: '',
              updatedAt: '',
              type: 'View',
            },
          ]),
        );
        expect(JSON.stringify(win.projectGroupTable.toTestSnapshot())).to.equal(
          JSON.stringify([]),
        );
      });
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
        cy.window().then((win) => {
          expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
            JSON.stringify([
              {
                id: 1,
                name: '项目节点',
                ownerId: 2,
                owner: {
                  id: 2,
                  name: 'yb',
                  password: '',
                  projects: [],
                  createdAt: '',
                  updatedAt: '',
                  projectGroups: [],
                },
                createdAt: '',
                updatedAt: '',
                type: 'View',
              },
            ]),
          );
          expect(
            JSON.stringify(win.projectGroupTable.toTestSnapshot()),
          ).to.equal(JSON.stringify([]));
        });
      });

      当('用户按下 f2', () => {
        cy.get('body').trigger('keydown', {
          keyCode: 113,
          which: 113,
          key: 'F2',
        });
      });

      并且('输入了非法字符', () => {
        cy.获取项目树标题输入框().type('{selectall}*');
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
        cy.window().then((win) => {
          expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
            JSON.stringify([
              {
                id: 1,
                name: '项目节点',
                ownerId: 2,
                owner: {
                  id: 2,
                  name: 'yb',
                  password: '',
                  projects: [],
                  createdAt: '',
                  updatedAt: '',
                  projectGroups: [],
                },
                createdAt: '',
                updatedAt: '',
                type: 'View',
              },
            ]),
          );
          expect(
            JSON.stringify(win.projectGroupTable.toTestSnapshot()),
          ).to.equal(JSON.stringify([]));
        });
      });

      当('用户按下 f2', () => {
        cy.get('body').trigger('keydown', {
          keyCode: 113,
          which: 113,
          key: 'F2',
        });
      });

      并且('输入了非法字符', () => {
        cy.获取项目树标题输入框().type('{selectall}*');
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
        cy.window().then((win) => {
          expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
            JSON.stringify([
              {
                id: 1,
                name: '项目节点',
                ownerId: 2,
                owner: {
                  id: 2,
                  name: 'yb',
                  password: '',
                  projects: [],
                  createdAt: '',
                  updatedAt: '',
                  projectGroups: [],
                },
                createdAt: '',
                updatedAt: '',
                type: 'View',
              },
            ]),
          );
          expect(
            JSON.stringify(win.projectGroupTable.toTestSnapshot()),
          ).to.equal(JSON.stringify([]));
        });
      });

      当('用户点击新增项目按钮', () => {
        cy.添加项目树视图项目();
      });

      那么('之前选中的项目节点应该处于“之前选中”的状态', () => {
        cy.获取项目树节点通过标题('项目节点')
          .should('not.have.class', 'ant-tree-treenode-selected')
          .find(
            `[data-test-class*="${组件测试类名.编辑临时创建节点之前选中的节点}"]`,
          )
          .should('exist');
      });

      当('用户取消输入', () => {
        cy.获取项目树标题输入框().blur();
      });

      那么('之前选中的项目节点应该重新被选中，而非“之前选中”的状态', () => {
        cy.获取项目树节点通过标题('项目节点')
          .should('have.class', 'ant-tree-treenode-selected')
          .find(
            `[data-test-class*="${组件测试类名.编辑临时创建节点之前选中的节点}"]`,
          )
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
        cy.window().then((win) => {
          expect(JSON.stringify(win.projectTable.toTestSnapshot())).to.equal(
            JSON.stringify([
              {
                id: 1,
                name: '项目节点',
                ownerId: 2,
                owner: {
                  id: 2,
                  name: 'yb',
                  password: '',
                  projects: [],
                  createdAt: '',
                  updatedAt: '',
                  projectGroups: [],
                },
                createdAt: '',
                updatedAt: '',
                type: 'View',
              },
            ]),
          );
          expect(
            JSON.stringify(win.projectGroupTable.toTestSnapshot()),
          ).to.equal(JSON.stringify([]));
        });
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

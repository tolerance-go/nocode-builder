import { fullPathnames, 测试标识 } from '@/constants';
import { RootState } from '@/core/managers/UIStoreManager/types';
import { localStateFieldName } from '@/core/managers/UIStoreManager/constants';
import { 使用场景 } from '@cypress/support/utils';
import localforage from 'localforage';

使用场景('用户登录流程', ({ 假如 }) => {
  假如('用户登录后，应该过滤掉某些属性后保存到本地 state', ({ 当, 那么 }) => {
    当('用户登录成功后', () => {
      cy.visit('/login');
      cy.获取测试标识(测试标识.登录用户名输入框).type('yb');
      cy.获取测试标识(测试标识.登录密码输入框).type('123456');
      cy.获取测试标识(测试标识.登录提交按钮).click();
    });

    那么('本地 state 中不包括 userInfo.token 和 location.pathname', () => {
      cy.当前访问应该为主页().then(() => {
        return localforage
          .getItem<RootState>(localStateFieldName)
          .then((state) => {
            expect(state!.userInfo.token).to.eq(null);
            expect(state!.location.pathname).to.eq(null);
          });
      });
    });
  });

  假如(
    '用户登录到系统，应该看到用户栏目显示自己的姓名',
    ({ 当, 那么, 并且 }) => {
      当('用户访登录页面', () => {
        cy.visit('/login');
      });
      当('用户在登录页面输入用户名 "yb" 和密码 "123456"', () => {
        cy.获取测试标识(测试标识.登录用户名输入框).type('yb');
        cy.获取测试标识(测试标识.登录密码输入框).type('123456');
      });
      并且('点击登录按钮', () => {
        cy.获取测试标识(测试标识.登录提交按钮).click();
      });
      那么('用户会跳转到主页', () => {
        cy.当前访问应该为主页();
      });
      并且('用户会看到自己的姓名', () => {
        cy.获取测试标识(测试标识.用户信息显示按钮).should('have.text', 'yb');
      });
    },
  );

  假如(
    '用户登录到系统，应该看到用户栏目显示自己的姓名',
    ({ 当, 那么, 并且 }) => {
      当('用户已经登录', () => {
        cy.登录('yb', '123456');
      });
      并且('用户访问主页', () => {
        cy.visit('/');
      });
      那么('用户会看到自己的姓名', () => {
        cy.获取测试标识(测试标识.用户信息显示按钮).should('have.text', 'yb');
      });
    },
  );

  假如('用户访问登录页面，应该看到登录表单', ({ 当, 那么 }) => {
    当('用户访问登录页面', () => {
      cy.visit('/login');
    });
    那么('用户应该能看到登录表单', () => {
      cy.获取测试标识(测试标识.登录表单).should('be.visible');
    });
  });

  假如('用户访问登录页面，应该默认聚焦用户名输入框', ({ 当, 那么 }) => {
    当('用户访问登录页面', () => {
      cy.visit('/login');
    });
    那么('用户可以看到用户名输入框聚焦', () => {
      cy.获取测试标识(测试标识.登录用户名输入框).should('be.focused');
    });
  });

  假如(
    '用户输入正确的用户名和密码，应该成功登录并重定向到主页',
    ({ 当, 那么, 并且 }) => {
      当('用户访问登录页面', () => {
        cy.visit('/login');
      });
      当('用户在登录页面输入用户名 "yb" 和密码 "123456"', () => {
        cy.获取测试标识(测试标识.登录用户名输入框).type('yb');
        cy.获取测试标识(测试标识.登录密码输入框).type('123456');
      });
      并且('点击登录按钮', () => {
        cy.获取测试标识(测试标识.登录提交按钮).click();
      });
      那么('用户应该被重定向到主页并看到欢迎信息', () => {
        cy.页面路径应该为(fullPathnames.root);
      });
    },
  );

  假如(
    '用户输入无效的登录凭证，应该看到错误提示并停留在登录页面',
    ({ 当, 那么, 并且 }) => {
      当('用户访问登录页面', () => {
        cy.visit('/login');
      });
      当(
        '用户在登录页面输入无效的用户名 "invalidUser" 和密码 "invalidPass"',
        () => {
          cy.获取测试标识(测试标识.登录用户名输入框).type('invalidUser');
          cy.获取测试标识(测试标识.登录密码输入框).type('invalidPass');
        },
      );
      并且('点击登录按钮', () => {
        cy.获取测试标识(测试标识.登录提交按钮).click();
      });
      那么('用户应该看到错误提示信息并停留在登录页面', () => {
        cy.获取antd通知框描述().should('contain.text', '用户不存在');
        cy.url().should('eq', Cypress.config().baseUrl + '/login');
      });
    },
  );

  假如(
    '用户未输入凭证，应该看到输入框的错误提示并停留在登录页面',
    ({ 当, 那么, 并且 }) => {
      当('用户访问登录页面', () => {
        cy.visit('/login');
      });

      当('用户在用户名和密码输入框中留空', () => {
        cy.获取测试标识(测试标识.登录用户名输入框).clear();
        cy.获取测试标识(测试标识.登录密码输入框).clear();
      });
      并且('点击登录按钮', () => {
        cy.获取测试标识(测试标识.登录提交按钮).click();
      });
      那么('用户应该看到输入框的错误提示信息并停留在登录页面', () => {
        cy.获取测试标识(测试标识.登录用户名输入框)
          .parents('.ant-form-item')
          .find('.ant-form-item-explain-error')
          .should('be.visible');
        cy.获取测试标识(测试标识.登录密码输入框)
          .parents('.ant-form-item')
          .find('.ant-form-item-explain-error')
          .should('be.visible');

        cy.url().should('eq', Cypress.config().baseUrl + '/login');
      });
    },
  );

  假如('用户登录后，应该可以成功登出并返回到登录页面', ({ 当, 那么 }) => {
    当('用户已经成功登录并点击登出按钮', () => {
      cy.登录('yb', '123456'); // 假设这是一个自定义命令，用于简化登录过程
      cy.visit('/');
      cy.获取测试标识(测试标识.用户名称文本).trigger('mouseover');
      cy.获取测试标识(测试标识.登出按钮文本).should('be.visible').click();
    });
    那么('用户应该被登出并返回到登录页面', () => {
      cy.url().should('include', '/login');
    });
  });

  假如(
    '用户输入错误的用户名或密码，应该登录失败并显示错误提示',
    ({ 当, 那么, 并且 }) => {
      当('用户访问登录页面', () => {
        cy.visit('/login');
      });
      当(
        '用户在登录页面输入错误的用户名 "errorUser" 和正确的密码 "123456"',
        () => {
          cy.获取测试标识(测试标识.登录用户名输入框).type('errorUser');
          cy.获取测试标识(测试标识.登录密码输入框).type('123456');
        },
      );
      并且('点击登录按钮', () => {
        cy.获取测试标识(测试标识.登录提交按钮).click();
      });
      那么('页面应该显示登录失败的错误提示', () => {
        cy.获取antd通知框描述().should('contain.text', '用户不存在');
      });

      当('用户在登录页面输入正确的用户名 "yb" 和错误的密码 "wrongPass"', () => {
        cy.获取测试标识(测试标识.登录用户名输入框).type(
          '{selectall}{backspace}yb',
        );
        cy.获取测试标识(测试标识.登录密码输入框).type(
          '{selectall}{backspace}wrongPass',
        );
      });
      并且('点击登录按钮', () => {
        cy.获取测试标识(测试标识.登录提交按钮).click();
      });
      那么('页面应该显示登录失败的错误提示', () => {
        cy.获取antd通知框描述().should('contain.text', '密码错误');
      });
    },
  );

  假如('用户输入为空的用户名或密码，应该显示必填提示', ({ 当, 那么, 并且 }) => {
    当('用户访问登录页面', () => {
      cy.visit('/login');
    });

    并且('用户在登录页面不输入用户名，输入密码 "123456"', () => {
      cy.获取测试标识(测试标识.登录密码输入框).type('123456');
    });
    当('用户点击登录按钮', () => {
      cy.获取测试标识(测试标识.登录提交按钮).click();
    });
    那么('页面应该显示用户名必填的提示', () => {
      cy.获取测试标识(测试标识.登录用户名输入框)
        .parents('.ant-form-item')
        .find('.ant-form-item-explain-error')
        .should('be.visible');
    });

    当('用户在登录页面输入用户名 "yb" 并且不输入密码', () => {
      cy.获取测试标识(测试标识.登录用户名输入框).type('yb');
      cy.获取测试标识(测试标识.登录密码输入框).clear();
    });
    当('用户点击登录按钮', () => {
      cy.获取测试标识(测试标识.登录提交按钮).click();
    });
    那么('页面应该显示密码必填的提示', () => {
      cy.获取测试标识(测试标识.登录密码输入框)
        .parents('.ant-form-item')
        .find('.ant-form-item-explain-error')
        .should('be.visible');
    });
  });
});

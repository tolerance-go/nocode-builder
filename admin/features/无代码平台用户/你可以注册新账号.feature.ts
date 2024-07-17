import { apiUrls } from '@cypress/support/_gen/apiUrls';
import { BASE_API } from '@cypress/support/constants';
import { 使用场景 } from '@cypress/support/scenarioUtils';
import { random } from 'lodash-es';

使用场景('注册账号流程', ({ 假如 }) => {
  假如('用户输入错误信息，应该得到错误反馈', ({ 那么, 当, 并且 }) => {
    当('平台用户访问 /register 页面', () => {
      cy.visit('/register');
    });

    那么('用户可以在注册页面找到用户名输入框', () => {
      cy.get('input#username').should('be.visible');
    });

    并且('用户可以在用户名输入框中输入用户名', () => {
      cy.get('input#username').type('newuser');
      cy.get('input#username').should('have.value', 'newuser');
    });

    当('用户输入清空用户名', () => {
      cy.get('input#username').clear();
    });

    并且('点击注册按钮', () => {
      cy.get('button[type="submit"]').click();
    });

    那么('用户名输入框出现提示信息', () => {
      cy.get('#username_help > .ant-form-item-explain-error').should(
        'contain',
        '用户名不能为空',
      );
    });

    当('用户输入存在的用户名和密码', () => {
      cy.get('input#username').type('existinguser');
      cy.get('input#password').type('123456a.');
      cy.get('input#confirm').type('123456a.');
    });

    cy.intercept(
      apiUrls.AuthController_register.method,
      apiUrls.AuthController_register.path,
      {
        statusCode: 409,
        body: {
          message: '用户名已被占用',
        },
      },
    ).as('registerRequest');

    并且('点击注册按钮，等待请求返回', () => {
      cy.get('button[type="submit"]').click();
    });

    那么('接口应该返回错误信息', () => {
      cy.wait('@registerRequest');
    });

    并且('将弹出错误提示信息，显示用户已被占用', () => {
      cy.get('.ant-notification-notice-description').should(
        'contain',
        '用户名已被占用',
      );
    });
  });

  假如('用户输入有效的信息，应该可以注册成功', ({ 那么, 当, 并且 }) => {
    当('平台用户访问 /register 页面', () => {
      cy.visit('/register');
    });

    当('用户输入有效的用户名和密码', () => {
      const baseUsername = 'newuniqueuser';
      const suffix = random(0, 1000000);

      const newUsername =
        suffix === 0 ? baseUsername : `${baseUsername}${suffix}`;
      cy.get('input#username').type(newUsername);
      cy.get('input#password').type('123456a.');
      cy.get('input#confirm').type('123456a.');
    });

    cy.intercept('POST', `${BASE_API}/auth/register`, {
      statusCode: 201,
    }).as('registerRequest');

    并且('点击注册按钮', () => {
      cy.get('button[type="submit"]').click();
    });

    那么('接口应该返回成功信息', () => {
      cy.wait('@registerRequest');
    });

    那么('用户将被重定向到登录页面', () => {
      cy.url().should('not.include', '/register');
    });
  });

  假如('用户注册时使用自动登录，应该自动登录成功', ({ 那么, 当, 并且 }) => {
    当('平台用户访问注册页面', () => {
      cy.visit('/register');
    });
    那么('用户可以看到自动登录勾选框', () => {
      cy.get('input#autoLogin').should('exist');
    });
    并且('自动登录选择框默认勾选', () => {
      cy.get('input#autoLogin').should('be.checked');
    });
    当('用户勾选自动登录选项后', () => {
      cy.get('input#autoLogin').check();
    });
    并且('正确输入用户名和密码', () => {
      const baseUsername = 'newuniqueuser';
      const suffix = random(0, 1000000);
      const newUsername =
        suffix === 0 ? baseUsername : `${baseUsername}${suffix}`;

      cy.get('input#username').type(newUsername);
      cy.get('input#password').type('123456a.');
      cy.get('input#confirm').type('123456a.');
    });

    cy.intercept('POST', `${BASE_API}/auth/register`, {
      statusCode: 201,
    }).as('registerRequest');

    并且('点击注册按钮', () => {
      cy.get('button[type="submit"]').click();
    });

    那么('接口应该返回成功信息', () => {
      cy.wait('@registerRequest');
    });

    并且('用户将被重定向到主页', () => {
      cy.url().should('not.include', '/login');
    });
  });

  假如('用户注册时未勾选自动登录，应该需要手动登录', ({ 那么, 当, 并且 }) => {
    当('用户访问注册页面', () => {
      cy.visit('/register');
    });
    并且('正确填写所有表单信息', () => {
      const baseUsername = 'newuniqueuser';
      const suffix = random(0, 1000000);
      const newUsername =
        suffix === 0 ? baseUsername : `${baseUsername}${suffix}`;

      cy.get('input#username').type(newUsername);
      cy.get('input#password').type('123456a.');
      cy.get('input#confirm').type('123456a.');
    });
    并且('取消勾选自动登录选项', () => {
      cy.get('input#autoLogin').uncheck();
    });

    cy.intercept('POST', `${BASE_API}/auth/register`, {
      statusCode: 201,
    }).as('registerRequest');

    并且('点击注册按钮', () => {
      cy.get('button[type="submit"]').click();
    });
    那么('接口应该返回成功信息', () => {
      cy.wait('@registerRequest');
    });
    并且('用户将被重定向到登录页', () => {
      cy.url().should('include', '/login');
    });
  });
});

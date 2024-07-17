import { apiUrls } from '@cypress/support/_gen/apiUrls';
import { 使用场景 } from '@cypress/support/utils';
import { fullPathnames } from '@/constants';
import { 测试标识 } from '@/constants';

使用场景('项目树远程同步流程', ({ 假如 }) => {
  假如('用户上次同步失败，直接进入主页，应该自动同步', ({ 当, 那么 }) => {
    当('用户上次项目树同步失败', () => {
      cy.拦截请求(apiUrls.SyncController_applyProjectDiff, {
        statusCode: 500,
        body: { statusCode: 500, message: 'Internal server error' },
      }).as('applyProjectDiff');

      cy.登录('yb', '123456');
      cy.visit('/');
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('视图标题{enter}');

      cy.wait('@applyProjectDiff')
        .its('response.statusCode')
        .should('equal', 500);

      cy.获取测试标识(测试标识.全局通知框标题).should('be.visible');

      cy.get('@applyProjectDiff.all').should('have.length', 1);
    });

    当('用户直接访问页面并访问主页', () => {
      cy.visit('/');
    });

    那么('应该自动触发同步操作', () => {
      cy.wait('@applyProjectDiff')
        .its('response.statusCode')
        .should('equal', 500);

      cy.获取测试标识(测试标识.全局通知框标题).should('be.visible');
      cy.获取测试标识(测试标识.全局模态框标题).should(
        'contain.text',
        '同步失败，是否重试？',
      );
      cy.get('@applyProjectDiff.all').should('have.length', 2);
    });
  });

  假如(
    '用户上次同步失败，直接进入登录页面并成功登录跳转到主页，应该自动同步一次',
    ({ 当, 那么, 并且 }) => {
      当('用户上次项目树同步失败', () => {
        cy.拦截请求(apiUrls.SyncController_applyProjectDiff, {
          statusCode: 500,
          body: { statusCode: 500, message: 'Internal server error' },
        }).as('applyProjectDiff');

        cy.登录('yb', '123456');
        cy.visit('/');
        cy.添加项目树视图项目();
        cy.获取项目树标题输入框().type('视图标题{enter}');

        cy.wait('@applyProjectDiff')
          .its('response.statusCode')
          .should('equal', 500);

        cy.获取测试标识(测试标识.全局通知框标题).should('be.visible');

        cy.get('@applyProjectDiff.all').should('have.length', 1);
      });

      当('用户直接访问页面并进入登录页面', () => {
        cy.visit('/login');
      });

      当('用户在登录页面输入用户名 "yb" 和密码 "123456"', () => {
        cy.获取测试标识(测试标识.登录用户名输入框).type('yb');
        cy.获取测试标识(测试标识.登录密码输入框).type('123456');
      });
      并且('点击登录按钮', () => {
        cy.获取测试标识(测试标识.登录提交按钮).click();
      });

      那么('应该自动触发同步操作', () => {
        cy.页面路径应该为(fullPathnames.root);
        cy.wait('@applyProjectDiff')
          .its('response.statusCode')
          .should('equal', 500);
        cy.get('@applyProjectDiff.all').should('have.length', 2);
      });
    },
  );

  假如('用户上次同步失败，直接进入登录页面，不应该自动同步', ({ 当, 那么 }) => {
    当('用户上次项目树同步失败', () => {
      cy.拦截请求(apiUrls.SyncController_applyProjectDiff, {
        statusCode: 500,
        body: { statusCode: 500, message: 'Internal server error' },
      }).as('applyProjectDiff');

      cy.登录('yb', '123456');
      cy.visit('/');
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('视图标题{enter}');

      cy.wait('@applyProjectDiff')
        .its('response.statusCode')
        .should('equal', 500);

      cy.获取测试标识(测试标识.全局通知框标题).should('be.visible');

      cy.get('@applyProjectDiff.all').should('have.length', 1);
    });

    当('用户直接访问页面并进入登录页面', () => {
      cy.visit('/login');
    });

    那么('不应该自动触发同步操作', () => {
      cy.获取测试标识(测试标识.全局通知框标题).should('not.exist');
      cy.获取测试标识(测试标识.全局模态框标题).should('not.exist');
      cy.get('@applyProjectDiff.all').should('have.length', 1);
    });
  });

  假如('用户项目树同步失败的话，应该弹出提示', ({ 当, 那么 }) => {
    当('用户直接访问页面并访问主页', () => {
      cy.拦截请求(apiUrls.SyncController_applyProjectDiff, {
        statusCode: 500,
        body: { statusCode: 500, message: 'Internal server error' },
      }).as('applyProjectDiff');

      cy.登录('yb', '123456');
      cy.visit('/');
    });

    当('同步操作失败', () => {
      cy.添加项目树视图项目();
      cy.获取项目树标题输入框().type('视图标题{enter}');
    });

    那么('应该弹出同步失败的提示', () => {
      cy.wait('@applyProjectDiff');

      cy.获取测试标识(测试标识.全局通知框标题).should('be.visible');
      cy.获取测试标识(测试标识.全局模态框标题).should(
        'contain.text',
        '同步失败，是否重试？',
      );
      cy.get('@applyProjectDiff.all').should('have.length', 1);
    });
  });
});

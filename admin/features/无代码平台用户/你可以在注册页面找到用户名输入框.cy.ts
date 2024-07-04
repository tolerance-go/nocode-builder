import { Given, When, Then } from '@cypress/support/scenarioUtils';

Given('当用户准备注册的时候', () => {
  When('平台用户访问 /register 页面', () => {
    cy.visit('/register');
  });

  Then('用户可以在注册页面找到用户名输入框', () => {
    cy.get('input#username').should('be.visible');
  });
});

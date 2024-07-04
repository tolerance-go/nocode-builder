import { BASE_API } from '@cypress/support/constants';
import { random } from 'lodash-es';

describe('用户输入用户名', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('用户可以在注册页面找到用户名输入框', () => {
    cy.get('input#username').should('be.visible');
  });

  it('用户可以在用户名输入框中输入用户名', () => {
    cy.get('input#username').type('newuser');
    cy.get('input#username').should('have.value', 'newuser');
  });

  it('用户名不能为空的验证', () => {
    cy.get('input#username').clear();
    cy.get('button[type="submit"]').click();
    cy.get('#username_help > .ant-form-item-explain-error').should(
      'contain',
      '用户名不能为空',
    );
  });

  it('用户名有效性验证 - 用户名已存在', () => {
    cy.intercept('POST', `${BASE_API}/auth/register`, {
      statusCode: 409,
      body: {
        message: '用户名已被占用',
      },
    }).as('registerRequest');

    cy.get('input#username').type('existinguser');
    cy.get('input#password').type('123456a.');
    cy.get('input#confirm').type('123456a.');

    cy.get('button[type="submit"]').click();

    cy.wait('@registerRequest');

    cy.get('.ant-notification-notice-description').should(
      'contain',
      '用户名已被占用',
    );
  });

  it('用户名有效', () => {
    const baseUsername = 'newuniqueuser';
    const suffix = random(0, 1000000);

    const newUsername =
      suffix === 0 ? baseUsername : `${baseUsername}${suffix}`;
    cy.get('input#username').clear();
    cy.get('input#username').type(newUsername);
    cy.get('input#password').clear();
    cy.get('input#password').type('123456a.');
    cy.get('input#confirm').clear();
    cy.get('input#confirm').type('123456a.');
    cy.intercept('POST', `${BASE_API}/auth/register`, {
      statusCode: 201,
    }).as('registerRequest');
    cy.get('button[type="submit"]').click();
    cy.wait('@registerRequest');
    cy.url().should('not.include', '/register');
  });
});

import { BASE_API } from '@cypress/support/constants';
import { random } from 'lodash-es';

describe('用户注册时自动登录', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('用户在注册页面看到自动登录选择框', () => {
    cy.get('input#autoLogin').should('exist');
  });

  it('自动登录选择框默认勾选', () => {
    cy.get('input#autoLogin').should('be.checked');
  });

  it('用户勾选自动登录选项后注册', () => {
    const baseUsername = 'newuniqueuser';
    const suffix = random(0, 1000000);
    const newUsername =
      suffix === 0 ? baseUsername : `${baseUsername}${suffix}`;

    cy.get('input#autoLogin').check();
    cy.get('input#username').type(newUsername);
    cy.get('input#password').type('123456a.');
    cy.get('input#confirm').type('123456a.');

    cy.intercept('POST', `${BASE_API}/auth/register`, {
      statusCode: 201,
    }).as('registerRequest');

    cy.get('button[type="submit"]').click();
    cy.wait('@registerRequest');
    cy.url().should('not.include', '/register');
  });

  it('用户未勾选自动登录选项后注册', () => {
    const baseUsername = 'newuniqueuser';
    const suffix = random(0, 1000000);
    const newUsername =
      suffix === 0 ? baseUsername : `${baseUsername}${suffix}`;

    cy.get('input#autoLogin').uncheck();
    cy.get('input#username').type(newUsername);
    cy.get('input#password').type('123456a.');
    cy.get('input#confirm').type('123456a.');

    cy.intercept('POST', `${BASE_API}/auth/register`, {
      statusCode: 201,
    }).as('registerRequest');

    cy.get('button[type="submit"]').click();
    cy.wait('@registerRequest');
    cy.url().should('include', '/login');
  });
});

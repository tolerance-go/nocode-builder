/// <reference types="cypress" />

import { TEST_IDS } from '@cypress/shared/constants';
import { BASE_API } from './constants';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//     //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//     //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//     //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// 在输入框内输入内容
const typeToProjectTreeTitleInput = (input: string) => {
  cy.get(`input#${TEST_IDS.项目树标题输入框}`).as('projectTreeTitleInput');
  cy.get('@projectTreeTitleInput').type(input);
  cy.get('@projectTreeTitleInput').type('{enter}');
};

Cypress.Commands.add('登录', (username: string, password: string) => {
  cy.session([username, password], () => {
    cy.request({
      method: 'POST',
      url: `${BASE_API}/auth/login`,
      body: { username, password },
    }).then(({ body }) => {
      window.localStorage.setItem('token', body.accessToken);
    });
  });
});

Cypress.Commands.add('添加项目文件节点', (typeName: string) => {
  cy.get(`[data-test-id="${TEST_IDS.CREATE_PROJECT_NODE_BTN}"]`).as(
    'createProjectBtn',
  );
  cy.get('@createProjectBtn').click();
  typeToProjectTreeTitleInput(typeName);
});

Cypress.Commands.add('添加项目组文件夹节点', (typeName: string) => {
  cy.get(`[data-test-id="${TEST_IDS.CREATE_PROJECT_GROUP_NODE_BTN}"]`).as(
    'createProjectGroupBtn',
  );
  cy.get('@createProjectGroupBtn').click();
  typeToProjectTreeTitleInput(typeName);
});

Cypress.Commands.add('获取项目树节点标题元素', (name: string) => {
  return cy
    .get('[data-test-class="project-tree-title"]')
    .filter((_index, element) => {
      return element.textContent?.trim() === name;
    });
});

Cypress.Commands.add('获取antd树列表内部容器', () => {
  return cy.get('.ant-tree-list-holder-inner');
});

Cypress.Commands.add('获取项目树标题输入框', () => {
  return cy.get(`input#${TEST_IDS.项目树标题输入框}`);
});

Cypress.Commands.add('获取添加项目组的按钮', () => {
  return cy.get(`[data-test-id="${TEST_IDS.CREATE_PROJECT_GROUP_NODE_BTN}"]`);
});
Cypress.Commands.add('获取添加项目的按钮', () => {
  return cy.get(`[data-test-id="${TEST_IDS.CREATE_PROJECT_NODE_BTN}"]`);
});

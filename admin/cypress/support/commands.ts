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
  cy.get('input#project-tree-title-input').as('projectTreeTitleInput');
  cy.get('@projectTreeTitleInput').type(input);
  cy.get('@projectTreeTitleInput').type('{enter}');
};

Cypress.Commands.add('login', (username: string, password: string) => {
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

Cypress.Commands.add('addProjectFile', (typeName: string) => {
  cy.get('[data-test-id="create-project-btn"]').as('createProjectBtn');
  cy.get('@createProjectBtn').click();
  typeToProjectTreeTitleInput(typeName);
});

Cypress.Commands.add('addProjectGroupFolder', (typeName: string) => {
  cy.get(`[data-test-id="${TEST_IDS.CREATE_GROUP_BTN}"]`).as(
    'createProjectGroupBtn',
  );
  cy.get('@createProjectGroupBtn').click();
  typeToProjectTreeTitleInput(typeName);
});

Cypress.Commands.add('selectProjectMenu', (name: string) => {
  cy.get('[data-test-class="project-tree-title"]').contains(name).click();
});

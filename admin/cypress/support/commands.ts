/// <reference types="cypress" />

import { 测试标识, 测试类 } from '@cypress/shared/constants';
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

Cypress.Commands.add('组合批量选中节点', (titles) => {
  titles.forEach((title) => {
    cy.获取项目树节点通过标题(title).click({ ctrlKey: true });
  });
});

Cypress.Commands.add('范围批量选中节点', (startTitle, endTitle) => {
  // 点击起始节点
  cy.获取项目树节点通过标题(startTitle).click();

  // 按住 shift 键点击结束节点
  cy.获取项目树节点通过标题(endTitle).click({ shiftKey: true });
});

Cypress.Commands.add(
  '拖拽到',
  { prevSubject: 'element' },
  (subject, targetChainable, position, options) => {
    const { vertical = 'middle', horizontal = 'center' } = position;
    const doDrop = !options?.notDrop;

    targetChainable.then(($target) => {
      const dataTransfer = new DataTransfer();

      // 获取目标元素的边界矩形
      const subjectRect = subject[0].getBoundingClientRect();
      const targetRect = $target[0].getBoundingClientRect();

      const getTargetClientXY = () => {
        let clientY, clientX;

        // 根据指定的垂直位置设置 clientY
        if (vertical === 'top') {
          clientY = targetRect.top + 1; // 接近目标元素的顶部
        } else if (vertical === 'bottom') {
          clientY = targetRect.bottom - 1; // 接近目标元素的底部
        } else {
          clientY = targetRect.top + (targetRect.bottom - targetRect.top) / 2; // 目标元素的中间
        }

        // 根据指定的水平位置设置 clientX
        if (horizontal === 'left') {
          clientX = targetRect.left + 1; // 接近目标元素的左侧
        } else if (horizontal === 'right') {
          clientX = targetRect.right - 1; // 接近目标元素的右侧
        } else {
          clientX = targetRect.left + (targetRect.right - targetRect.left) / 2; // 水平方向居中
        }

        return { clientX, clientY };
      };

      const targetClients = getTargetClientXY();
      // 计算插值坐标
      const interpolate = (
        start: { clientX: number; clientY: number },
        end: { clientX: number; clientY: number },
        steps: number,
      ): Array<{ clientX: number; clientY: number }> => {
        const stepX = (end.clientX - start.clientX) / steps;
        const stepY = (end.clientY - start.clientY) / steps;
        return Array.from({ length: steps }, (_, i) => ({
          clientX: start.clientX + stepX * (i + 1),
          clientY: start.clientY + stepY * (i + 1),
        }));
      };

      const dragSteps = interpolate(
        {
          clientX: subjectRect.left + subjectRect.width / 2,
          clientY: subjectRect.top + subjectRect.height / 2,
        },
        targetClients,
        3,
      );
      // 触发 dragstart 事件
      cy.wrap(subject)
        // .find('.ant-tree-node-content-wrapper')
        .as('subject')
        .trigger('dragstart', {
          dataTransfer,
          /** 从中间位置抓起 */
          clientX:
            subjectRect.left + (subjectRect.right - subjectRect.left) / 2,
          clientY: subjectRect.top + (subjectRect.bottom - subjectRect.top) / 2,
        });

      // 触发插值坐标的 drag 事件
      dragSteps.forEach((step) => {
        cy.get('@subject').trigger('drag', {
          dataTransfer,
          clientX: step.clientX,
          clientY: step.clientY,
        });
      });

      // 触发 dragenter 事件
      cy.wrap($target)
        // .find('.ant-tree-node-content-wrapper')
        .as('target')
        .trigger('dragenter', {
          dataTransfer,
          clientX: targetClients.clientX,
          clientY: targetClients.clientY,
        });

      // 触发 dragover 事件
      cy.get('@target').trigger('dragover', {
        dataTransfer,
        clientX: targetClients.clientX,
        clientY: targetClients.clientY,
      });

      if (doDrop) {
        // 触发 drop 事件
        cy.get('@target').trigger('drop', {
          dataTransfer,
        });
      }

      // 这里注释掉，因为 antd tree 实现拖拽不依赖 dragend，并且系统实现，移动节点时，会先删除拖拽的节点，所以 @subject 不存在
      // 触发 dragend 事件
      // cy.get('@subject').trigger('dragend', {
      //   dataTransfer,
      // });
    });
  },
);

// 在输入框内输入内容
const typeToProjectTreeTitleInput = (input: string) => {
  cy.get(`input#${测试标识.项目树标题输入框}`).as('projectTreeTitleInput');
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
  cy.get(`[data-test-id="${测试标识.创建项目节点的按钮}"]`).as(
    'createProjectBtn',
  );
  cy.get('@createProjectBtn').click();
  typeToProjectTreeTitleInput(typeName);
});

Cypress.Commands.add('添加项目组文件夹节点', (typeName: string) => {
  cy.get(`[data-test-id="${测试标识.创建项目组节点的按钮}"]`).as(
    'createProjectGroupBtn',
  );
  cy.get('@createProjectGroupBtn').click();
  typeToProjectTreeTitleInput(typeName);
});

Cypress.Commands.add('获取项目树节点标题元素', (name: string) => {
  return cy
    .get(`[data-test-class*="${测试类.项目树节点标题}"]`)
    .filter((_index, element) => {
      return element.textContent?.trim() === name;
    });
});

Cypress.Commands.add('获取项目树节点通过标题', (name: string) => {
  return cy.获取项目树节点标题元素(name).parents('.ant-tree-treenode');
});

Cypress.Commands.add('获取antd树列表内部容器', () => {
  return cy.get('.ant-tree-list-holder-inner');
});

Cypress.Commands.add('获取项目树标题输入框', () => {
  return cy.get(`input#${测试标识.项目树标题输入框}`);
});

Cypress.Commands.add('获取添加项目组的按钮', () => {
  return cy.get(`[data-test-id="${测试标识.创建项目组节点的按钮}"]`);
});

Cypress.Commands.add('获取添加项目的按钮', () => {
  return cy.get(`[data-test-id="${测试标识.创建项目节点的按钮}"]`);
});

Cypress.Commands.add('获取测试标识', (id: string) => {
  return cy.get(`[data-test-id="${id}"]`);
});

Cypress.Commands.add('获取测试类', (className: string) => {
  return cy.get(`[data-test-class*="${className}"]`);
});

Cypress.Commands.add('获取antd通知框描述', () => {
  return cy.get('.ant-notification-notice-description');
});

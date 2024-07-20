export function 验证元素可见性<T>(element: T) {
  if (typeof element === 'string') {
    cy.获取测试标识(element).should('be.visible');
  } else if (typeof element === 'object' && element !== null) {
    for (const key in element) {
      验证元素可见性(element[key]);
    }
  }
}

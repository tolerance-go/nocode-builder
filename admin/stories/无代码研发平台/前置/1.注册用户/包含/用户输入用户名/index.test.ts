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
    cy.get('input#username').type('existinguser');
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('contain', '用户名已被占用');
  });

  it('用户名有效性验证 - 用户名有效', () => {
    cy.get('input#username').type('newuniqueuser');
    cy.get('button[type="submit"]').click();
    cy.get('.success-message').should('not.exist');
    cy.url().should('not.include', '/register');
  });
});

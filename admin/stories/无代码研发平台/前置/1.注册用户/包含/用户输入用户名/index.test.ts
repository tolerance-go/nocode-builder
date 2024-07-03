describe('用户输入用户名', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('用户可以在注册页面找到用户名输入框', () => {
    cy.get('input[name="username"]').should('be.visible');
  });

  it('用户可以在用户名输入框中输入用户名', () => {
    cy.get('input[name="username"]').type('newuser');
    cy.get('input[name="username"]').should('have.value', 'newuser');
  });

  it('用户名有效性验证 - 用户名长度不足', () => {
    cy.get('input[name="username"]').type('abc');
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('contain', '用户名长度不能少于 6 个字符');
  });

  it('用户名有效性验证 - 用户名已存在', () => {
    cy.get('input[name="username"]').type('existinguser');
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('contain', '用户名已被占用');
  });

  it('用户名有效性验证 - 用户名有效', () => {
    cy.get('input[name="username"]').type('newuniqueuser');
    cy.get('button[type="submit"]').click();
    cy.get('.success-message').should('not.exist');
    cy.url().should('not.include', '/register');
  });
});

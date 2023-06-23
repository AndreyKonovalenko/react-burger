describe('login test', () => {
  const email = 'test111@mail.ru';
  const password = 'Znamenka';
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });
  it('should login', () => {
    cy.get('[data-testid=user-account]').click();
    cy.get('[data-testid=email_input]').type(`${email}`);
    cy.get('[data-testid=password_input]').type(`${password}`);
    cy.get('[data-testid=login-button]').click();
  });
});

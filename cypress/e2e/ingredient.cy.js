describe('ingredient business logic', () => {
  const email = 'test111@mail.ru';
  const password = 'Znamenka';

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should open ingredient details modal and colse it after 2 sec', () => {
    cy.get('a[href="/ingredients/643d69a5c3f7b9001cfa0942"]').click();
    cy.wait(2000);
    cy.get('body').type('{esc}');
  });

  it('should darg ingredient to burger constructor', () => {
    cy.get('a[href="/ingredients/643d69a5c3f7b9001cfa093d"]').drag(
      '[data-testid=drop-zone]'
    );
    cy.get('a[href="/ingredients/643d69a5c3f7b9001cfa0942"]').drag(
      '[data-testid=drop-zone]'
    );
    cy.get('[data-testid=checkout]').click();
    cy.wait(500);
    cy.get('[data-testid=email_input]').type(`${email}`);
    cy.get('[data-testid=password_input]').type(`${password}`);
    cy.get('[data-testid=login-button]').click();
    cy.wait(500);
  });
});

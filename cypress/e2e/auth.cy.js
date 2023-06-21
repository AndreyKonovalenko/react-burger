describe('test auth', () => {
  // сделайте аккаунт чтобы добавить креды в этот тест
  // const email = "";
  // const password = "";

  it('Visits my react burger', () => {
    cy.visit('http://localhost:3000/');
  });

  // beforeEach(() => {
  //   cy.visit('http://localhost:3000/');
  //   // cy.get("[data-testid=email_input]").type(`${email}{enter}`);
  //   // cy.get("[data-testid=password_input]").type(`${password}{enter}`);
  // });

  // it("should show user name", () => {
  //     cy.get("[data-testid=header-user-name]").should("have.text", "review25@mail.com");
  // });

  // it("should go to login page after logout", () => {
  //     cy.get(".header__logout").click();
  //     cy.get(".auth-form").should("exist");
  // });
});

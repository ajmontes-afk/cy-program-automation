export const LoginPageCentral = {
  openCentral() {
    cy.visit(Cypress.env("CENTRAL_BASE_URL"), {
    timeout: 120000,
    });
  },

  login(companyId, userId, password) {
    cy.get("#company_id").should("be.visible").clear().type(companyId);
    cy.get("#username").should("be.visible").clear().type(userId);
    cy.get("#password").should("be.visible").clear().type(password, {
      log: false,
    });

    cy.contains('button', 'Sign in').click();  },

  loginAsAdminUser() {
    this.login(
      Cypress.env("CENTRAL_COMPID"),
      Cypress.env("CENTRAL_USER"),
      Cypress.env("CENTRAL_PASS"),
    );
  },
};

export default LoginPageCentral;
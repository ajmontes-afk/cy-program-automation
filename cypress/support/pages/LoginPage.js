export const LoginPage = {
  open() {
    cy.visit("/");
  },

  login(companyId, userId, password) {
    cy.get("#gl_comcde").should("be.visible").clear().type(companyId);
    cy.get("#txtusrcde").should("be.visible").clear().type(userId);
    cy.get("#txtusrpwd").should("be.visible").clear().type(password, {
      log: false,
    });

    cy.get(".loginbtn > input").click();
  },

  loginAsHrUser() {
    this.login(
      Cypress.env("HR_COMPANY"),
      Cypress.env("HR_USER"),
      Cypress.env("HR_PASS"),
    );
  },

  assertLoginSuccess() {
     cy.get('.ajs-content').should('contain', 'Successfully logged in')
     cy.get('.ajs-button').click()
  },
};

// Login Page Object Model for HR application with methods to open the page, perform login, and assert successful login.
// The loginAsHrUser method uses environment variables for credentials, and assertLoginSuccess checks for the visibility of a menu item to confirm successful login.
// This page object can be used in Cypress tests to interact with the login page of the HR application.

export const DashboardPage = {
  openHrApp() {
    cy.url().should('include', '/login_applist.php');
    cy.get(":nth-child(4) > .applist_gradient").should("be.visible").click();
  },

  openMasterFile() {
    cy.get('#toggle').should('be.visible').click();
    cy.get('#389').should('be.visible').click();
  },

  openCivilStatus() {
    cy.get('#men_256').should('be.visible').click();
  },
};
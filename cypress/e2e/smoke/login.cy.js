Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('parent.load_bc is not a function')) {
    return false; // prevents Cypress from failing
  }
})


describe("Smoke Test", () => {
 it("Login page should load", () => {
 cy.visit("/");

cy.get('input[id="gl_comcde"]').clear()
cy.get('input[id="gl_comcde"]').type('QATEAM')
 cy.get('input[id="txtusrcde"]').type('AJ')
    cy.get('input[id="txtusrpwd"]').type('Rance@11')
    cy.get('input[type="button"][value="Login"]').click()
    cy.contains('button', 'OK').click()
        cy.get('img.applist_button_img').eq(3).click()
            cy.get('#toggle', { timeout: 10000 }) // wait up to 10s
  .should('be.visible')
  .click()
            cy.get('#389').click()
                cy.get('#men_256').click()

                cy.get('#pager_default_add').click()
                cy.get('input[id="modalField_cvlstat"]').type('Separated')
                cy.get('#btn_diag_save').click()
                    cy.contains('button', 'OK').click()

                    cy.contains('div', 'Separated').parent().find('input.edit').click()
                    cy.get('input[id="modalField_cvlstat"]').clear()
                    cy.get('input[id="modalField_cvlstat"]').type('Legally Separated')
                    cy.get('#btn_diag_save').click()
                    cy.contains('button', 'OK').click()

                    cy.contains('div', 'Separated').parent().find('input.delete').click()
                    cy.contains('button', 'OK').click()
                    cy.get('.ajs-button.print').filter(':visible').click()
 });
});
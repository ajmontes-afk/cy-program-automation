export const ItemClassPage = {

    assertPageLoaded() {
        cy.get("#pager-tableitemclassification").should("be.visible");
        cy.get("#btn_add").should("be.visible");
    },

    clickAdd() {
        cy.get("#btn_add").should("be.visible").click();
    },

    createitemClass(itemClassDesc) {
        cy.get("#item_classification_description").should("be.visible").type(itemClassDesc);
    },

    getVisibleitemClassDescInput() {
        return cy.get('#item_classification_description');
    },

    enteritemClass(itemClassDesc) {
        this.getVisibleitemClassDescInput().clear().type(itemClassDesc);
    },

    clickSave() {
        cy.get("#save-pager-button").should("be.visible").click();

    },

    assertSuccessMessage(message) {
        cy.contains(new RegExp(message, 'i'), { timeout: 15000 }).should("be.visible");
  },

    noAdditionalRecord() {
        cy.get('button.swal2-cancel').click();
    },

    assertRowVisible(itemClassDesc) {
        cy.get("#per_page").select("100");
        cy.get("#pager-tableitemclassification_wrapper").contains(itemClassDesc).scrollIntoView().should('be.visible');
    },   

    getRowByitemClassDesc(itemClassDesc) {
        return cy.contains('td', itemClassDesc).parents('tr');
    },

    clickEdit(itemClassDesc) {
        this.getRowByitemClassDesc(itemClassDesc).within(() => {
            cy.get('.bx.bx-dots-vertical-rounded').should('be.visible').click();
            cy.get('.dropdown-menu').should("be.visible").contains('Edit').click();
        });
    },

    clickUpdate() {
        cy.get("#update-pager-button").should("be.visible").click();
    },

    confirmSuccessful() {
        cy.get('button.swal2-confirm.swal2-styled').should("be.visible").click();
    },

    clickDelete(itemClassDesc) {
        cy.contains(itemClassDesc).parents('tr').within(() => {
            cy.get('.bx.bx-dots-vertical-rounded').should('be.visible').click();
            cy.get('.dropdown-menu').should("be.visible").contains('Delete').click();
        });
    },

    confirmDelete() {
        cy.get('button.swal2-confirm.swal2-styled').should("be.visible").click();
    },

    confirmSuccessfulDelete() {
        cy.get('button.swal2-confirm.swal2-styled').should("be.visible").click();
    },

    assertRowNotVisible(itemClassDesc) {
        cy.get("#per_page").select("100");
        cy.get("#pager-tableitemclassification_wrapper").contains(itemClassDesc).should('not.exist');
    },

    assertErrorMessage(requireditemClassDescMessage) {
        cy.get(".swal2-html-container").should("be.visible").and("contain", requireditemClassDescMessage);
    },
};
export const DashboardPageCentral = {
    openMasterFile() {
        cy.get('.fas.fa-bars').click();
    },
    clickMasterFile() {
        cy.contains('a.menu-link', 'Master Files').click();
    },

    openitemClass() {
        cy.contains('a.menu-link', 'Item Classification').click();
    },
};

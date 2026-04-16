import { LoginPageCentral } from '../../support/pages/LoginPageCentral'
import { DashboardPageCentral } from '../../support/pages/DashboardPageCentral'
import { ItemClassPage } from '../../support/pages/ItemClassPage'
import testData from '../../fixtures/generated/mf-item-class-milktea-test-data.json';

const MAX_POSITION_TYPE_LENGTH = 30;

const {
  pageLoaditemClass = [],
  additemClass = [],
  edititemClass = [],
  deleteitemClass = [],
  validationitemClass = [],
  duplicateitemClass = [],
  spacesOnlyitemClass = [],
  maxLengthitemClass = [],
  editToDuplicateitemClass = [],
  specialCharsitemClass = [],
} = testData;


describe ("Central Master File - Item Class", () => {
    beforeEach(() => {
        LoginPageCentral.openCentral();
        LoginPageCentral.loginAsAdminUser();

        DashboardPageCentral.openMasterFile();
        DashboardPageCentral.clickMasterFile();
        DashboardPageCentral.openitemClass();

    });
    
    describe ("Page Load Item Class", () => {
        pageLoaditemClass.forEach(({ testCaseId, description }) => {
            it(`[${testCaseId}] ${description}`, () => {
                ItemClassPage.assertPageLoaded();
         });
    });
});

    describe ("Add Item Class", () => {
        additemClass.forEach(({ testCaseId, description, itemClassDesc }) => {
            it(`[${testCaseId}] ${description}`, () => {

                ItemClassPage.clickAdd();
                ItemClassPage.createitemClass(itemClassDesc);
                ItemClassPage.clickSave();

                ItemClassPage.assertSuccessMessage("successfully");
                ItemClassPage.noAdditionalRecord();
                ItemClassPage.assertRowVisible(itemClassDesc);

            });
         });
    }); 

    describe ('Edit Item Class', () => {
        edititemClass.forEach(({ testCaseId, description, origitemClassDesc, updateitemClassDesc }) => {
             it(`[${testCaseId}] ${description}`, () => {


                ItemClassPage.clickAdd();
                ItemClassPage.createitemClass(origitemClassDesc);
                ItemClassPage.clickSave();

                ItemClassPage.assertSuccessMessage("successfully");
                ItemClassPage.noAdditionalRecord();

                ItemClassPage.clickEdit(origitemClassDesc);
                ItemClassPage.enteritemClass(updateitemClassDesc);
                ItemClassPage.clickUpdate();

                ItemClassPage.assertSuccessMessage("successfully");
                ItemClassPage.confirmSuccessful();
                ItemClassPage.assertRowVisible(updateitemClassDesc);

            });
        });
    });

    describe ('Delete Item Class', () => {
        deleteitemClass.forEach(({ testCaseId, description, itemClassDesc }) => {
            it(`[${testCaseId}] ${description}`, () => {

                ItemClassPage.clickAdd();
                ItemClassPage.createitemClass(itemClassDesc);
                ItemClassPage.clickSave();

                ItemClassPage.assertSuccessMessage("successfully");
                ItemClassPage.noAdditionalRecord();

                ItemClassPage.clickDelete(itemClassDesc);
                ItemClassPage.confirmDelete();

                ItemClassPage.assertSuccessMessage("deleted successfully");
                ItemClassPage.confirmSuccessful();
                ItemClassPage.assertRowNotVisible(itemClassDesc);
            });
        });
    });

    describe ('Validation - Item Class', () => {
        validationitemClass.forEach(({ testCaseId, description, requireditemClassDescMessage }) => {
            it(`[${testCaseId}] ${description}`, () => {

                ItemClassPage.clickAdd();
                ItemClassPage.clickSave();

                ItemClassPage.assertErrorMessage(requireditemClassDescMessage);
            });
        });
    });

    describe ('Duplicate Item Class', () => {
        duplicateitemClass.forEach(({ testCaseId, description, itemClassDesc, duplicateMessage }) => {
            it(`[${testCaseId}] ${description}`, () => {

                ItemClassPage.clickAdd();
                ItemClassPage.createitemClass(itemClassDesc);
                ItemClassPage.clickSave();

                ItemClassPage.assertSuccessMessage("successfully");
                ItemClassPage.noAdditionalRecord();

                ItemClassPage.clickAdd();
                ItemClassPage.createitemClass(itemClassDesc);
                ItemClassPage.clickSave();

                ItemClassPage.assertErrorMessage(duplicateMessage);
             });
         });
    });

    describe ('Spaces Only Validation - Item Class', () => {
        spacesOnlyitemClass.forEach(({ testCaseId, description, itemClassDesc, requireditemClassDescMessage }) => {
            it(`[${testCaseId}] ${description}`, () => {

                ItemClassPage.clickAdd();
                ItemClassPage.createitemClass(itemClassDesc);
                ItemClassPage.clickSave();

                ItemClassPage.assertErrorMessage(requireditemClassDescMessage);
            });
        });
    });

    describe ('Max Length Validation - Item Class', () => {
        maxLengthitemClass.forEach(({ testCaseId, description, itemClassDesc, maxLengthMessage }) => {
            it(`[${testCaseId}] ${description}`, () => {

                ItemClassPage.clickAdd();
                ItemClassPage.createitemClass(itemClassDesc);
                ItemClassPage.clickSave();

                ItemClassPage.assertErrorMessage(maxLengthMessage);

            });
        });
    });

    describe ('Edit to Duplicate Item Class', () => {
        editToDuplicateitemClass.forEach(({ testCaseId, description, firstitemClassDesc, seconditemClassDesc, duplicateMessage }) => {
            it(`[${testCaseId}] ${description}`, () => {

                ItemClassPage.clickAdd();
                ItemClassPage.createitemClass(firstitemClassDesc);
                ItemClassPage.clickSave();

                ItemClassPage.assertSuccessMessage("successfully");
                ItemClassPage.noAdditionalRecord();

                ItemClassPage.assertRowVisible(firstitemClassDesc);
                ItemClassPage.clickEdit(firstitemClassDesc);
                ItemClassPage.enteritemClass(seconditemClassDesc);
                ItemClassPage.clickUpdate();

                ItemClassPage.assertErrorMessage(duplicateMessage);
            });
        });
    });

    describe ('Special Characters Validation - Item Class', () => {
        specialCharsitemClass.forEach(({ testCaseId, description, itemClassDesc, errorMessage }) => {
            it(`[${testCaseId}] ${description}`, () => {

                ItemClassPage.clickAdd();
                ItemClassPage.createitemClass(itemClassDesc);
                ItemClassPage.clickSave();

                ItemClassPage.assertErrorMessage(errorMessage);
            });
        });
    });
});




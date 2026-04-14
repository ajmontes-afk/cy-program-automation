import { LoginPage } from '../../support/pages/LoginPage'
import { DashboardPage } from '../../support/pages/DashboardPage'
import { CivilStatusPage } from '../../support/pages/CivilStatusPage'
import testData from '../../fixtures/generated/mf-civil-status-negative-test-data.json';

// The name box only allows 30 letters, numbers, or spaces.
// We keep this number here so our test does not make a name that is too long.
const MAX_POSITION_TYPE_LENGTH = 25;

// This makes a new name that is a little different every time.
// That helps us avoid duplicates when we run the test again.
//const buildUniqueName = (baseName) => {
  // This small number at the end makes the name unique.
  //const uniqueToken = `${Date.now().toString().slice(-6)}${Cypress._.random(10, 99)}`;
  // We save space for the unique number and one blank space.
  //const allowedBaseLength = MAX_POSITION_TYPE_LENGTH - uniqueToken.length - 1;
  // If the original name is too long, cut it short so it still fits in the box.
  //const trimmedBaseName = baseName.slice(0, allowedBaseLength).trimEnd();

 // return `${trimmedBaseName} ${uniqueToken}`;


// We take each group of test data from the JSON file.
// If one group is missing, we use an empty list so the test does not crash.
const {
  pageLoad = [],
  add = [],
  edit = [],
  delete: deleteCases = [],
  validation = [],
  duplicate = [],
  spacesOnly = [],
  maxLength = [],
  editToDuplicate = [],
} = testData;

describe("HR Master File - Civil Status", () => {

  beforeEach(() => {
    // Before every test, open the app, log in, and go to the Civil Status page.
    LoginPage.open();
    LoginPage.loginAsHrUser();
    LoginPage.assertLoginSuccess();

    DashboardPage.openHrApp();
    DashboardPage.openMasterFile();
    DashboardPage.openCivilStatus();

    CivilStatusPage.assertPageLoaded();
  });

  describe("Page Load", () => {
    pageLoad.forEach(({ testCaseId, description }) => {
    it(`[${testCaseId}] ${description}`, () => {
      CivilStatusPage.assertPageLoaded();
    });
  });
});

  describe("Add Civil Status Type", () => {
    add.forEach(({ testCaseId, description, name }) => {
    it(`[${testCaseId}] ${description}`, () => {
      //const uniqueName = buildUniqueName(name);

      CivilStatusPage.clickAdd();
      CivilStatusPage.entercivilStatus(name);
      CivilStatusPage.clickSave();

      CivilStatusPage.assertSuccessMessage("Successfully");
      CivilStatusPage.confirmSuccessful();
      CivilStatusPage.assertRowVisible(name);
    });
  });
});

  describe("Edit Civil Status", () => {
    edit.forEach(({ testCaseId, description, originalName, updatedName }) => {
    it(`[${testCaseId}] ${description}`, () => {

      //const originalUniqueName = buildUniqueName(originalName);
      //const updatedUniqueName = buildUniqueName(updatedName);

      CivilStatusPage.createcivilStatus(originalName);
      CivilStatusPage.assertSuccessMessage("Successfully");
      CivilStatusPage.confirmSuccessful();

      CivilStatusPage.clickEdit(originalName);
      CivilStatusPage.enterName(updatedName);
      CivilStatusPage.clickUpdate();

      CivilStatusPage.assertSuccessMessage("updated");
      CivilStatusPage.confirmSuccessful();
      CivilStatusPage.assertRowVisible(updatedName);
    });
  });
});

  describe("Delete Civil Status", () => {
    deleteCases.forEach(({ testCaseId, description, name }) => {
      it(`[${testCaseId}] ${description}`, () => {
        // Make a special row just for this delete test.
        //const uniqueName = buildUniqueName(name);

      CivilStatusPage.createcivilStatus(name);
      CivilStatusPage.assertSuccessMessage("Successfully");
      CivilStatusPage.confirmSuccessful();

      CivilStatusPage.clickDelete(name);
      CivilStatusPage.confirmDelete();
      
      CivilStatusPage.assertSuccessMessage("Successfully deleted");
      CivilStatusPage.confirmSuccessfulDelete();
      CivilStatusPage.assertRowNotVisible(name);
    });
  });
});

  describe("Validation", () => {
    validation.forEach(({ testCaseId, description, requiredNameMessage }) => {
      it(`[${testCaseId}] ${description}`, () => {
        // Try to save without typing anything.
        // The app should show an error because the name is required.
        CivilStatusPage.clickAdd();
        CivilStatusPage.clickSave();

        CivilStatusPage.assertErrorMessage(requiredNameMessage);
      });
    });
  });

  describe("Duplicate Validation", () => {
    duplicate.forEach(({ testCaseId, description, name }) => {
      it(`[${testCaseId}] ${description}`, () => {
        // Make the first row.
        //const uniqueName = buildUniqueName(name);

        CivilStatusPage.createcivilStatus(name);
        CivilStatusPage.assertSuccessMessage("Successfully");
        CivilStatusPage.confirmSuccessful();

        // Try to save the exact same name again.
        // The app should say this name already exists.
        CivilStatusPage.clickAdd();
        CivilStatusPage.enterName(name);
        CivilStatusPage.clickSave();

        CivilStatusPage.assertErrorMessage(
          `Civil Status (${name}) already Exist`,
        );
      });
    });
  });

  describe("Spaces-Only Validation", () => {
    spacesOnly.forEach(
      ({ testCaseId, description, name, requiredNameMessage }) => {
        it(`[${testCaseId}] ${description}`, () => {
          // Type only blank spaces.
          // The app should treat this like an empty value.
          CivilStatusPage.clickAdd();
          CivilStatusPage.enterName(name);
          CivilStatusPage.clickSave();

          CivilStatusPage.assertErrorMessage(requiredNameMessage);
        });
      },
    );
  });

  describe("Max Length Validation", () => {
    maxLength.forEach(
      ({
        testCaseId,
        description,
        name,
        maxLength = MAX_POSITION_TYPE_LENGTH,
      }) => {
        it(`[${testCaseId}] ${description}`, () => {
          // Type a name that is too long for the box.
          // The box should keep only the first 25 characters.
          CivilStatusPage.clickAdd();
          CivilStatusPage.enterName(name);
          CivilStatusPage.assertNameIsLimitedTo(name, maxLength);
        });
      },
    );
  });

  describe("Edit Duplicate Validation", () => {
    editToDuplicate.forEach(
      ({ testCaseId, description, firstName, secondName }) => {
        it(`[${testCaseId}] ${description}`, () => {
          // Make two different rows.
          // Later, we will try to turn the second one into a copy of the first one.
          //const firstUniqueName = buildUniqueName(firstName);
          //const secondUniqueName = buildUniqueName(secondName);

          CivilStatusPage.createcivilStatus(firstName);
          CivilStatusPage.assertSuccessMessage("Successfully");
          CivilStatusPage.confirmSuccessful();

          //CivilStatusPage.createcivilStatus(secondName);
          //CivilStatusPage.assertSuccessMessage("Successfully");
          //CivilStatusPage.confirmSuccessful();

          // Change the second row so it has the same name as the first row.
          // The app should stop us and show a duplicate error.
          CivilStatusPage.clickEdit(firstName);
          CivilStatusPage.enterName(secondName);
          CivilStatusPage.clickUpdate();

          CivilStatusPage.assertErrorMessage(
            `Civil status (${secondName}) already Exist`,
          );
        });
      },
    );
  });
});


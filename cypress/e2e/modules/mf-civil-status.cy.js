import { LoginPage } from '../../support/pages/LoginPage'
import { DashboardPage } from '../../support/pages/DashboardPage'
import { CivilStatusPage } from '../../support/pages/CivilStatusPage'
import civilStatus from '../../fixtures/master-file/civil-status.json'

describe("HR Master File - Civil Status", () => {

  beforeEach(() => {
    LoginPage.open();
    LoginPage.loginAsHrUser();
    LoginPage.assertLoginSuccess();

    DashboardPage.openHrApp();
    DashboardPage.openMasterFile();
    DashboardPage.openCivilStatus();

    CivilStatusPage.assertPageLoaded();
  });

  describe("Page Load", () => {
    it("[Civil Status Master File] should load the civil status master file page", () => {
      CivilStatusPage.assertPageLoaded();
    });
  });

  describe("Add Civil Status Type", () => {
    it("[Separated] should add a new civil status", () => {
      const uniquecivilStatus = civilStatus.add.civilStatus;

      CivilStatusPage.clickAdd();
      CivilStatusPage.entercivilStatus(uniquecivilStatus);
      CivilStatusPage.clickSave();

      CivilStatusPage.assertSuccessMessage("Successfully");
      CivilStatusPage.confirmSuccessful();
      CivilStatusPage.assertRowVisible(uniquecivilStatus);
    });
  });

  describe("Edit Civil Status", () => {
    it("[Legally Separated] should edit an existing civil status", () => {
      const uniquecivilStatus = civilStatus.add.civilStatus;
      const updatedcivilStatus = civilStatus.edit.updatedcivilStatus;

      //CivilStatusPage.createcivilStatus(originalcivilStatus);
      //CivilStatusPage.assertSuccessMessage("Successfully");
      //CivilStatusPage.confirmSuccessful();

      CivilStatusPage.clickEdit(uniquecivilStatus);
      CivilStatusPage.entercivilStatus(updatedcivilStatus);
      CivilStatusPage.clickUpdate();
      CivilStatusPage.confirmSuccessful();

      CivilStatusPage.assertSuccessMessage("Legally Separated");
      CivilStatusPage.assertRowVisible(updatedcivilStatus);
    });
  });

  describe("Delete Civil Status", () => {
    it("[Legally Separated] should delete an existing civil status", () => {
      const uniquecivilStatus = civilStatus.edit.updatedcivilStatus;

      //CivilStatusPage.createcivilStatus(uniquecivilStatus);
      //CivilStatusPage.assertSuccessMessage("Successfully");
      //CivilStatusPage.confirmSuccessful();

      CivilStatusPage.clickDelete(uniquecivilStatus);
      CivilStatusPage.confirmDelete(uniquecivilStatus);
      CivilStatusPage.assertSuccessMessage("Successfully deleted");
      
      CivilStatusPage.confirmSuccessful();
      CivilStatusPage.assertRowNotVisible(uniquecivilStatus);
    });
  });

  describe("Validation", () => {
    it("[Separated] should validate required name", () => {
      CivilStatusPage.clickAdd();
      CivilStatusPage.clickSave();

      CivilStatusPage.assertErrorMessage(
        civilStatus.validation.requiredCodeMessage
      );
    });
  });
});

require("dotenv").config();
const { defineConfig } = require("cypress");
module.exports = defineConfig({
e2e: {
baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
specPattern: "cypress/e2e/**/*.cy.js",
reporter: "cypress-mochawesome-reporter",
reporterOptions: {
reportDir: "reports/mocha",
overwrite: false,
html: false,
json: true,
},
setupNodeEvents(on, config) {
require("cypress-mochawesome-reporter/plugin")(on);

      //HR
      config.env.HR_COMPANY = process.env.HR_COMPANY;
      config.env.HR_USER = process.env.HR_USER;
      config.env.HR_PASS = process.env.HR_PASS;

      //CENTRAL
      config.env.CENTRAL_BASE_URL = process.env.CENTRAL_BASE_URL;
      config.env.CENTRAL_COMPID = process.env.CENTRAL_COMPID;
      config.env.CENTRAL_USER = process.env.CENTRAL_USER;
      config.env.CENTRAL_PASS = process.env.CENTRAL_PASS;     
      
      return config;
},
},
});
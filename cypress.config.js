const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  videoCompression: 32,
  videoUploadOnPasses: true,

  e2e: {
    baseUrl: 'https://automationexercise.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  }
});

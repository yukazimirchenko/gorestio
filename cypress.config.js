const { defineConfig } = require("cypress");
const { verifyDownloadTasks } = require('cy-verify-downloads');
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://the-internet.herokuapp.com', 
    setupNodeEvents(on, config) {
      on('task', verifyDownloadTasks);
      on('task', {downloadFile});
      allureWriter(on, config);
            return config;
    },
  },
});

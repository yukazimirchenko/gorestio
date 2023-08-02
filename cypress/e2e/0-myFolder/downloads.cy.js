/// <reference types="cypress-downloadfile"/>
/// <reference types="Cypress"/>

describe.skip(`Download and upload files`, () => {

    it(`should download MP3 file`, () => {
        cy.downloadFile('https://the-internet.herokuapp.com/download/testing.mp3', 'cypress/downloads', 'test.mp3');
    })

    it(`should download PNG file`, () => {
        cy.visit('/download');
        cy.get('[href="download/icon.png"]')
            .should('contain.text', 'icon.png')
            .click()
        cy.get('#content').should('contain.text', 'File Downloader')
        cy.verifyDownload('icon.png', { timeout: 20000 })
    })

    it(`should download PDF file`, () => {
        cy.visit('/download');
        cy.get('[href="download/sample.pdf"]')
            .should('contain.text', 'sample.pdf')
            .click()
    })
})
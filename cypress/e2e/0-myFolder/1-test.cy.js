/// <reference types="cypress" />

describe(`My frist test`, () => {
    
    it(`Alert`, () => {
        cy.visit('/javascript_alerts');
        cy.contains('Click for JS Alert').click();
        cy.on('window:alert', text => {
            expect(text).to.contains('I am a JS Alert');
        })
    })
})
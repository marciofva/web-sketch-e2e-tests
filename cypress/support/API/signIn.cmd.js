// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
/// <reference types="Cypress" />


Cypress.Commands.add('tokenAuthServerFailure', () => {
    cy.intercept(
        'POST', 
         '**/oauth/token', 
        { statusCode: 500 }
        ).as('getServerFailure')
})

Cypress.Commands.add('tokenAuthNetworkError', () => {
    cy.intercept(
        'POST', 
        '**/oauth/token', 
        { forceNetworkError: true }
        ).as('getNetworkError')
})

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

import signIn from './../selectors/signIn.sel'
import workspace from './../selectors/workspace.sel'


Cypress.Commands.add('fillSignInForm', (user) => {
    if (user.email != '' && user.email != undefined) {
        cy.get(signIn.emailInput).click().type(user.email)
    }

    if (user.password != '' && user.password != undefined) {
        cy.get(signIn.passwordInput).click().type(user.password)
    }
    cy.get(signIn.signInButton).click()
})


Cypress.Commands.add('signIn', (user) => {
    cy.fillSignInForm(user)
    .get(workspace.startButton).click()
    .title().should('eq', 'Sketch - Documents')
})

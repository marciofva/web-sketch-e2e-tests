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

import workspace from './../selectors/workspace.sel'

Cypress.Commands.add('signOut', () => {
    cy.get(workspace.userMenu).click()
    .get(workspace.signOutButton).click()
})

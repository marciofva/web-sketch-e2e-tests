/// <reference types="Cypress" />

import signIn from './../support/selectors/signIn.sel'

const user = {}


describe('Sign out', () => {

    beforeEach(() => {
        user.email = Cypress.env('email')
        user.password = Cypress.env('password')
        cy.visit('/signin').signIn(user)
    })

    it('Should sign out successfully', () => {
        cy.signOut()
        
        cy.get(signIn.signInButton).should('be.visible')
    })
})

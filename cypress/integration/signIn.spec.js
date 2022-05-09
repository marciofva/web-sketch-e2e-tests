/// <reference types="Cypress" />

import signIn from '../support/selectors/signIn.sel'
import workspace from '../support/selectors/workspace.sel'

const { faker } = require('@faker-js/faker')
const user = {}
const sizes = ['iphone-6', 'ipad-2', [1024, 768], 'macbook-13', 'iphone-se2', 'samsung-s10']


describe('Sign in on several sizes of screens', () => {
    
        beforeEach(() => {
            cy.visit('/signin')
            .title()
            .should('eq', 'Sketch - Sign in - It\'s\ great to see you again')
        })

    context('Sign in successfully', () => {

        it(`Should allow to sign in with valid credentials`, () => {
            cy.intercept('POST', '**/oauth/token').as('authSignIn')

            user.email = Cypress.env('email')
            user.password = Cypress.env('password')
            cy.fillSignInForm(user).get(workspace.startButton).should('be.visible')

            cy.wait('@authSignIn').its('response.statusCode').should('eq', 200)
        })
    })

    context('Sign in unsuccessfully on several sizes of screens', () => {

        Cypress._.times(sizes.length, (i) => {

            it(`Should show blank e-mail message on ${sizes[i]} screen`, () => {
                user.email = ''
                user.password = faker.internet.password()
                cy.setResolution(sizes[i]).fillSignInForm(user)
    
                cy.get(signIn.errorMessages).first().find('li').should('have.text', 'Email can’t be blank')
                cy.get(signIn.errorMessages).last().find('li').should('not.exist')
            })
    
            it(`Should show blank e-mail and blank password messages on ${sizes[i]} screen`, () => {
                user.email = ''
                user.password = ''
                cy.setResolution(sizes[i]).fillSignInForm(user)
    
                cy.get(signIn.errorMessages).first().find('li').should('have.text', 'Email can’t be blank')
                cy.get(signIn.errorMessages).last().find('li').should('have.text', 'Password can’t be blank')
            })
    
            it(`Should show blank password message on ${sizes[i]} screen`, () => {
                user.email = faker.internet.email()
                user.password = ''
                cy.setResolution(sizes[i]).fillSignInForm(user)
    
                cy.get(signIn.errorMessages).first().find('li').should('not.exist')
                cy.get(signIn.errorMessages).last().find('li').should('have.text', 'Password can’t be blank')
            })
    
            it(`Sign in not authorized with invalid credentials on ${sizes[i]} screen`, () => {
                cy.intercept('POST', '**/oauth/token').as('authSignIn')

                user.email = faker.internet.email()
                user.password = faker.internet.password()
                cy.setResolution(sizes[i]).fillSignInForm(user)
    
                cy.get(signIn.signInErrorMessage).should('have.text', 'We couldn’t sign you in. Please check your details and try again.')
                cy.wait('@authSignIn').its('response.statusCode').should('eq', 401)
            })
    
            it(`Should show invalid e-mail format message on ${sizes[i]} screen`, () => {
                user.email = 'invalid_email@test'
                user.password = faker.internet.password()
                cy.setResolution(sizes[i]).fillSignInForm(user)
    
                cy.get(signIn.errorMessages).first().find('li').should('have.text', 'This is not a valid email')
                cy.get(signIn.errorMessages).last().find('li').should('not.exist')
            })
        })
    })

    context('Sign in with authentication error', () => {

        it('Should show authentication server error message', () => {
            cy.tokenAuthServerFailure()

            user.email = Cypress.env('email')
            user.password = Cypress.env('password')
            cy.fillSignInForm(user)

            cy.wait('@getServerFailure').its('response.statusCode').should('eq', 500)

            if (Cypress.browser.name === 'firefox') {
                cy.get(signIn.signInErrorMessage).should('have.text', 'JSON.parse: unexpected end of data at line 1 column 1 of the JSON data')
            } else {
                cy.get(signIn.signInErrorMessage).should('have.text', 'Unexpected end of JSON input')
            }
        })

        it('Should show authentication network error message', () => {
            cy.tokenAuthNetworkError()

            user.email = Cypress.env('email')
            user.password = Cypress.env('password')
            cy.fillSignInForm(user)

            if (Cypress.browser.name === 'firefox') {
                cy.wait('@getNetworkError').get(signIn.signInErrorMessage).should('have.text', 'NetworkError when attempting to fetch resource.')
            } else {
                cy.wait('@getNetworkError').get(signIn.signInErrorMessage).should('have.text', 'Failed to fetch')
            }
        })
    })
})

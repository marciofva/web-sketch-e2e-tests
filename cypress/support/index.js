// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './GUI/signIn.cmd'
import './GUI/workspace.cmd'
import './GUI/helpers.cmd'
import './GUI/manageProject.cmd'
import './API/signIn.cmd'

// Alternatively you can use CommonJS syntax:
// require('./commands')
// ignore uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
    return false
  })

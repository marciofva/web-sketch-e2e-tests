/// <reference types="Cypress" />

import projectManagement from '../support/selectors/manageProject.sel'

const { faker } = require('@faker-js/faker')
const user = {}
const project = {}


describe('Project management', () => {

    beforeEach(() => {
        user.email = Cypress.env('email')
        user.password = Cypress.env('password')
        cy.visit('/signin').signIn(user)
    })

    context('Create project', () => {
        it('Should create a new project', () => {
            project.name = `project-${faker.datatype.uuid()}`
            cy.createProject(project)
    
            cy.get(projectManagement.toastMessage)
            .should('have.text', `"${project.name}" Project created`)

            cy.get((projectManagement.createdProjectMenu.replace('{projectname}', project.name)))
            .should('exist')
        })
    })

    context('Move project to the trash', () => {

        beforeEach(() => {
            project.name = `project-${faker.datatype.uuid()}`
            cy.createProject(project)
        })

        it('Should move the project to the trash', () => {
            cy.moveProjectToTrash(project)

            cy.get(projectManagement.toastMessage)
            .should('have.text', `"${project.name}" has been moved to Trash`)

            cy.get((projectManagement.createdProjectMenu.replace('{projectname}', project.name)))
            .should('not.exist')
        })
    })

    context('Delete project permanently', () => {

        beforeEach(() => {
            project.name = `project-${faker.datatype.uuid()}`
            cy.createProject(project)
            .moveProjectToTrash(project)
        })

        it('Should delete the project permanently', () => {
            cy.deleteProjectPermanently(project)

            cy.get(projectManagement.toastMessage)
            .should('have.text', `“${project.name}” has been permanently deleted`)

            cy.get((projectManagement.createdProjectMenu.replace('{projectname}', project.name)))
            .should('not.exist')
        })
    })
})

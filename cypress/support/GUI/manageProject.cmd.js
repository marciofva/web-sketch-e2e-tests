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

import projectManagement from './../selectors/manageProject.sel'


Cypress.Commands.add('createProject', (project) => {
    cy.get('body').then(($body) => {
        if ($body.find(projectManagement.createNewProject).length > 0) {
            return cy.get(projectManagement.createNewProject)
        }else{
            return cy.get(projectManagement.addNewProject)
        }
    }).click()
    .get(projectManagement.projectNameInput).type(project.name)
    .get(projectManagement.confirmationCreationButton).click()
})


Cypress.Commands.add('moveProjectToTrash', (project) => {
    cy.get((projectManagement.createdProjectMenu.replace('{projectname}', project.name))).click()
    .get(projectManagement.expandOptions).click()
    .get(projectManagement.deleteOptions).last().click()
    .get(projectManagement.confirmationDeleteButton).click()
})


Cypress.Commands.add('deleteProjectPermanently', (project) => {

    cy.get(projectManagement.sideMenuItens).each(($el)=>{
        if ($el.text().includes('Trash')){
            $el.trigger('click')
        }
    })
    .get(projectManagement.trashItems).each(($el)=>{
            if ($el.text().includes(project.name)){
                $el.trigger('click')
            }
        })
        .get(projectManagement.expandOptions).click()
        .get(projectManagement.deleteOptions).last().click()
        .get(projectManagement.deletePermanentlyButton).click()
})

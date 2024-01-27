// cypress/support/commands.js

Cypress.Commands.add('createUser', () => {
  cy.request({
    method: 'POST',
    url: '/users',
    body: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      
    }
  }).then((response) => {
    cy.wrap(response).as('createdUser');
  });
});

Cypress.Commands.add('retrieveUser', (userId) => {
  cy.request({
    method: 'GET',
    url: `/users/${userId}`
  }).then((response) => {
    cy.wrap(response).as('retrievedUser');
  });
});

Cypress.Commands.add('deleteUser', (userId) => {
  cy.request({
    method: 'DELETE',
    url: `/users/${userId}`
  }).then((response) => {
    cy.wrap(response).as('deletedUser');
  });
});

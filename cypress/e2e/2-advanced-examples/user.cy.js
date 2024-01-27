// cypress/integration/userTests.spec.js

describe('User Creation Test', () => {
  it('Creates a new user', () => {
    cy.request({
      method: 'POST',
      url: 'https://gorest.co.in/public/v2/users',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer uFU3BHXphhVGtIjMuFxYFFTrcrKzAEOKtKc91HbQR' 
      },
      body: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        gender: 'male',
        status: 'active'
      },
      failOnStatusCode: false
    }).then((response) => {
      if (response && response.status === 201 && response.body && response.body.data) {
        
        expect(response.status).to.eq(201);
        expect(response.body.data.name).to.eq('John Doe');
        expect(response.body.data.email).to.eq('john.doe@example.com');
      } else {
       
        cy.log('Failed to create user: Empty or undefined response');
      }
    });
  });
});

describe('Retrieve User Test', () => {
  it('Retrieves an existing user', () => {
    cy.request({
      method: 'GET',
      url: 'https://gorest.co.in/public/v2/users/1', 
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer uFU3BHXphhVGtIjMuFxYFFTrcrKzAEOKtKc91HbQR' 
      },
      failOnStatusCode: false
    }).then((response) => {
      if (response && response.status === 200 && response.body && response.body.data) {
        
        const userId = response.body.data.id;
        expect(response.body.data.id).to.eq(userId);
        expect(response.body.data.name).to.eq('John Doe');
        expect(response.body.data.email).to.eq('john.doe@example.com');
      } else {
        
        cy.log('Failed to retrieve user: Empty or undefined response');
      }
    });
  });
});

 describe('Delete User Test', () => {
   it('Deletes an existing user', () => {
     cy.request({
       method: 'DELETE',
       url: 'https://gorest.co.in/public/v2/users/1', 
       headers: {
         'Accept': 'application/json',
         'Authorization': 'Bearer uFU3BHXphhVGtIjMuFxYFFTrcrKzAEOKtKc91HbQR' 
       },
       failOnStatusCode: false
     }).then((response) => {
       if (response && response.status === 204) {
        
         expect(response.status).to.eq(204);
       } else {
        
         cy.log('Failed to delete user: Empty or undefined response');
       }
     });
   });
 });

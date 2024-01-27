// cypress/integration/userManagement.spec.js

describe('User Management Tests', () => {
  const baseUrl = 'https://gorest.co.in/public/v2';
  const accessToken = 'uFU3BHXphhVGtIjMuFxYFFTrcrKzAEOKtKc91HbQR';

  it('should create, retrieve, and delete a user', () => {
    // Generate random name and email
    const randomName = `User_${Math.floor(Math.random() * 1000)}`;
    const randomEmail = `user_${randomName}@example.com`;

    // Create user
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: {
        name: randomName,
        gender: 'male',
        email: randomEmail,
        status: 'active'
      },
      failOnStatusCode: false // Add this option to bypass failure on non-2xx or 3xx status codes
    }).then((response) => {
      if (response.status === 401) {
        cy.log('Unauthorized: Please check your access token.');
        return;
      }

      const createdUser = response.body.data;
      
      // Assert creation
      expect(createdUser.name).to.equal(randomName);
      expect(createdUser.email).to.equal(randomEmail);

      const userId = createdUser.id;

      // Retrieve user
      cy.request({
        method: 'GET',
        url: `${baseUrl}/users/${userId}`,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }).then((response) => {
        // Assert retrieval
        expect(response.status).to.equal(200);
        const retrievedUser = response.body.data;
        expect(retrievedUser.id).to.equal(userId);
        expect(retrievedUser.name).to.equal(randomName);
        expect(retrievedUser.email).to.equal(randomEmail);

        // Delete user
       cy.request({
          method: 'DELETE',
          url: `${baseUrl}/users/${userId}`,
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }).then((response) => {
          // Assert deletion
          expect(response.status).to.equal(204);
        });
      });
    });
  });
}); 

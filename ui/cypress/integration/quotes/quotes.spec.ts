describe('Quotes', () => {
  it('Loads home page', () => {
    cy.setScenarios('draft');
    cy.visit('/');
    cy.findByText('All Quotes');
    cy.findByText('Create Quote');
  });

  it('No quotes shows empty message', () => {
    cy.setScenarios('noquotes');
    cy.visit('/');
    cy.get('[data-cy=noquotes]');
  });

  it('Error getting quotes shows error message', () => {
    cy.setScenarios('error');
    cy.visit('/');
    cy.get('.Toastify');
    cy.findByText('Unable to get data.');
  });
});

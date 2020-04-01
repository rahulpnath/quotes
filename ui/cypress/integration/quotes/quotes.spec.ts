describe('Quotes', () => {
  describe('Mock Api', () => {
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

  describe('Fixture Data', () => {
    it('Renders quotes as expected', () => {
      cy.server();
      cy.fixture('quotes/quotes.json')
        .as('quotes')
        .then(quotes => {
          cy.route('GET', '/api/quotes', '@quotes');
          cy.visit('/');
          const renderedQuotes = cy.get('tbody > tr');
          renderedQuotes.should('have.length', quotes.length);
          renderedQuotes.each((renderedQuote, index) => {
            cy.wrap(renderedQuote).within(() => {
              const quote = quotes[index];

              cy.get('[data-cy=quoteNumber]')
                .invoke('text')
                .should('eq', quote.quoteNumber || '');

              cy.get('[data-cy=customerName]')
                .invoke('text')
                .should('eq', quote.customerName || '');

              cy.get('[data-cy=mobilePhoneDescription]')
                .invoke('text')
                .should('eq', quote.mobilePhoneDescription || '');
              cy.get('[data-cy=statusCode]')
                .invoke('text')
                .should('eq', quote.statusCode || '');
              cy.get('[data-cy=lastModifiedAt]')
                .invoke('text')
                .should('eq', quote.lastModifiedAt);
            });
          });
        });
    });

    it('Draft Quote Status is Grey', () => {
      assertStatusHasColor('Draft', 'rgb(128, 128, 128)');
    });

    it('Open Quote Status is Orange', () => {
      assertStatusHasColor('Open', 'rgb(255, 165, 0)');
    });

    it('Accepted Quote Status is SeaGreen', () => {
      assertStatusHasColor('Accepted', 'rgb(46, 139, 87)');
    });

    it('Expired Quote Status is Red', () => {
      assertStatusHasColor('Expired', 'rgb(255, 0, 0)');
    });
  });
});

function assertStatusHasColor(status, color) {
  cy.server();
  cy.fixture('quotes/quotes.json')
    .as('quotes')
    .then(quotes => {
      cy.route('GET', '/api/quotes', '@quotes');
      cy.visit('/');
      cy.findAllByText(status)
        .first()
        .parent()
        .should('have.css', 'background-color')
        .and('eq', color);
    });
}

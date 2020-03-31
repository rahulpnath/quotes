// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to set sceanrios.
     * @example cy.setScenarios('draft open')
     */
    setScenarios(scenarios: string): Chainable<Element>;
  }
}

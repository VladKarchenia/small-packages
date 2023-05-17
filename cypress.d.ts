export declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-testid attribute.
       * @example cy.getByTestid("greeting")
       */
      getByTestid(id: string): Chainable<JQuery<HTMLElement>>
    }
  }
}

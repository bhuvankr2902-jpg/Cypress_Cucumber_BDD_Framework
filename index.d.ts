/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to add product to cart
     * @example cy.addProductToCart("Broccoli")
     */
    addProductToCart(productName: string): Chainable<void>;

    /**
     * Custom command to apply promo code
     * @example cy.applyPromo("rahulshettyacademy")
     */
    applyPromo(promoCode: string): Chainable<void>;
  }
}

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
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



// Cypress.Commands.add("addProductToCart", (productName: string) => {
//   cy.contains("h4.product-name", productName)
//     .parents("div.product")
//     .contains("ADD TO CART")
//     .click();
// });

Cypress.Commands.add("addProductToCart", (productName: string) => {
  cy.get("h4.product-name").each(($el) => {
    const name = $el.text().trim();
    
    if (name.includes(productName)) {  
      cy.wrap($el)
        .closest("div.product")        
        .find("button")               
        .click({ force: true });       
    }
  });
});


Cypress.Commands.add("applyPromo", (promoCode: string) => {
  cy.get(".promoCode").clear().type(promoCode);
  cy.get(".promoBtn").click();
});

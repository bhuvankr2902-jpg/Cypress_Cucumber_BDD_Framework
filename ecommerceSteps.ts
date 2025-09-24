import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ProductPage from "../pageObjects/ProductPage";

let calculatedSum = 0;
let actualTotal = 0;

Given("I am on the product page", () => {
  cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
});


When("I add products {string} to cart", (productList: string) => {
  const products: string[] = productList.split(",").map(p => p.trim());
  products.forEach((product) => {
    cy.addProductToCart(product);
  });
});

// When(
//   "I add {string}, {string}, {string}, {string}, {string} to cart",
//   (
//     product1: string,
//     product2: string,
//     product3: string,
//     product4: string,
//     product5: string
//   ) => {
//     const products = [product1, product2, product3, product4, product5];
//     products.forEach((product) => {
//       cy.addProductToCart(product);
//     });
//   }
// );

Then("cart should have {int} items", (count: number) => {
  cy.get(".cart-icon").click();
  cy.contains("PROCEED TO CHECKOUT").click();

  cy.url().should("include", "/cart");

  cy.get("tbody tr", { timeout: 10000 }) 
    .should("have.length", count);
});


Then("total price should match calculated sum", () => {
  let sum = 0;

  cy.get("tr td:nth-child(5) p").each(($el) => {
    const price = parseInt($el.text().trim());
    sum += price;
  }).then(() => {
    cy.get(".totAmt").should(($total) => {
      const total = parseInt($total.text().trim());
      expect(total).to.eq(sum);
    });
  });
});

When("I proceed to checkout and apply promo {string}", (promoCode: string) => {
  cy.get(".promoCode").clear().type(promoCode);
  cy.get(".promoBtn").click();
  cy.get(".promoInfo", { timeout: 10000 }) 
    .should("be.visible")
    .and("contain.text", "Code applied ..!");
});


Then("discount should be applied and order placed successfully", () => {
  let originalTotal: number;
  cy.get(".totAmt").then(($el) => {
    originalTotal = parseFloat($el.text().trim());
  });
  cy.get(".discountAmt").should(($discount) => {
    const discountedTotal = parseFloat($discount.text().trim());
    expect(discountedTotal).to.be.lessThan(originalTotal);
  });
});



When("I apply invalid promo {string}", (promoCode: string) => {
  cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/cart");
  ProductPage.getCartIcon().click();
  ProductPage.getCheckoutButton().click();

  cy.get(".promoCode").should("be.visible").clear().type(promoCode);
  cy.get(".promoBtn").click();
});

Then("error message {string} should be displayed", (error: string) => {
  cy.get(".promoInfo", { timeout: 10000 })     
    .should("be.visible")
    .and("contain.text", error);
});


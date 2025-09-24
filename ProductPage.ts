class ProductPage {
  getProductCard(productName: string) {
    return cy.contains("h4.product-name", productName).parents("div.product");
  }

  getAddToCartButton(productName: string) {
    return this.getProductCard(productName).contains("ADD TO CART");
  }

  getCartIcon() {
    return cy.get(".cart-icon");
  }

  getCartItems() {
    // return cy.get(".cart-items .product-name");
    return cy.get("tbody tr");
  }

  getCartTotal() {
    return cy.get(".cart-total .totAmt");
  }

  getCheckoutButton() {
    return cy.contains("PROCEED TO CHECKOUT");
  }

  getPromoInput() {
    return cy.get(".promoCode");
  }

  getApplyPromoButton() {
    return cy.get(".promoBtn");
  }

  getPromoInfo() {
    return cy.get(".promoInfo");
  }

  getDiscountAmount() {
    return cy.get(".discountAmt");
  }

  getPlaceOrderButton() {
    return cy.contains("Place Order");
  }
}

export default new ProductPage();

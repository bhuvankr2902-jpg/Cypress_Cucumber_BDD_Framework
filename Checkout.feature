Feature:E-commerce Checkout Automation

    Scenario: Add vegetable to cart and checkout with valid promo
        Given I am on the product page
        When I add products "Brocolli, Pomegranate, Mushroom, Walnuts, Beetroot" to cart
        # When I add "Brocolli", "Pomegranate", "Mushroom", "Walnuts", "Beetroot" to cart
        Then  cart should have 5 items
        And total price should match calculated sum
        When I proceed to checkout and apply promo "rahulshettyacademy"
        Then discount should be applied and order placed successfully

    Scenario Outline: Handle Invalid promo code
        # Given I am on the product page
        When I apply invalid promo "<promocode>"
        Then error message "<error>" should be displayed

        Examples:
            | promocode | error            |
            | Invalid   | Invalid code ..! |


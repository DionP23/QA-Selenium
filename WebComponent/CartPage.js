const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.cartItems = By.className('cart_item');
        this.checkoutButton = By.id('checkout');
    }

    async getCartItemCount() {
        const items = await this.driver.findElements(this.cartItems);
        return items.length;
    }

    async proceedToCheckout() {
        await this.driver.findElement(this.checkoutButton).click();
    }
}

module.exports = CartPage;

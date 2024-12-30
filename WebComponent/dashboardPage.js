const { By, until } = require('selenium-webdriver');

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
        this.productsContainer = By.className('inventory_list');
        this.addToCartButton = By.className('btn_inventory');
        this.cartIcon = By.className('shopping_cart_link');
    }

    async isOnDashboard() {
        const title = await this.driver.findElement(By.className('title')).getText();
        return title;
    }

    async addItemToCart() {
        await this.driver.findElement(this.addToCartButton).click();
        await this.driver.wait(until.elementLocated(By.className('shopping_cart_badge')), 5000); 
    }

    async goToCart() {
        await this.driver.findElement(this.cartIcon).click();
    }

    
    async isDashboardVisible() {
        try {
            await this.driver.findElement(By.className('inventory_list')); 
            return true;
        } catch (err) {
            return false; 
        }
    }
}

module.exports = DashboardPage;

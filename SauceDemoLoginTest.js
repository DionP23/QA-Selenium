const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function SauceDemoLoginTest(){
    // Membuat koneksi dengan Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();

    try{
        await driver.get('https://www.saucedemo.com/')

        //Masukan Username dan Password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');

        //Click Button Login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        //Memastika masuk dengan url "inventory.html"
        await driver.wait(until.urlContains('inventory.html'), 5000);
        console.log('Login berhasil!');

        //Memastika kita masuk dengan mencari "Swag Labs"
        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include");
        console.log('logo ditemukan');

        // Tambah item ke cart
        await driver.findElement(By.id('add-to-cart-sauce-labs-backpack')).click();
        console.log("Item berhasil ditambahkan ke cart");

        // Validasi cart icon berubah
        let cartBadge = await driver.findElement(By.className('shopping_cart_badge')).getText();
        assert.strictEqual(cartBadge, '1', "Cart badge tidak menunjukkan item yang ditambahkan");
        console.log("Validasi cart badge berhasil");

        // Klik ikon cart untuk membuka halaman cart
        await driver.findElement(By.className('shopping_cart_link')).click();

        // Validasi item di dalam cart
        let cartItem = await driver.findElement(By.className('inventory_item_name')).getText();
        assert.strictEqual(cartItem, 'Sauce Labs Backpack', "Item di cart tidak sesuai");
        console.log("Validasi item di cart berhasil");


    } finally{
        // await driver.quit();
    }
}

SauceDemoLoginTest();
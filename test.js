const { Builder, By, Key, until } = require('selenium-webdriver');
async function exampleTest() {
    // Membuat koneksi dengan Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();
    //Exception handling & Conclusion
    try {
        //Buka URL di broswer
        await driver.get("https://www.google.com");

        //mencari di search box
        let searchBox = await driver.findElement(By.name('q'));

        // simlate user behavior typing "Hello World"
        await searchBox.sendKeys('Hello World', Key.RETURN);
        await driver.wait(until.elementLocated(By.id('result-stats')),10000);

        let title = await driver.getTitle();
        console.log(`page Title is: ${title}`);
    } finally {
        //tutup Browser
        await driver.quit();
    }
}
exampleTest();
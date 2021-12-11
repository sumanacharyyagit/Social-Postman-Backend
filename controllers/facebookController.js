const puppeteer = require('puppeteer');
const post = async (req, res) => {
    if (req.body.message == undefined || req.body.message == '') {
        res.status(400).send({
            message: "Message is required"
        });
    } else {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.facebook.com/');
        await page.waitForSelector("[name='email']")
        await page.type("[name='email']", "8001621693")
        await page.keyboard.down('Tab')
        await page.keyboard.type("hesoyam159")
        const [button] = await page.$x("//button[contains(.,'Log In')]")
        if (button) {
            await button.click();
            await page.waitForNavigation();
            await page.click("[aria-label='Create a post']");
            const context = browser.defaultBrowserContext();
            await context.overridePermissions('https://www.facebook.com/', ['geolocation']);
            await page.goto("https://www.facebook.com/profile");
            await page.waitForXPath(`//span[contains(.,"What's on your mind?")]`);
            const [span] = await page.$x(`//span[contains(.,"What's on your mind?")]`)
            await span.click();
            await page.waitForTimeout(1000);
            await page.keyboard.type(req.body.message);
            await page.waitForTimeout(500);
            
            await page.keyboard.down("Control");
            await page.keyboard.press(String.fromCharCode(13));
            await page.keyboard.up("Control");
            await page.waitForTimeout(2000);
        }
        browser.close();
        res.status(200).send({
            message: "Successfully posted on facebook"
        });
    }
}

module.exports = {
    post
}
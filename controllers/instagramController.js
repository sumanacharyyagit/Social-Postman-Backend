const puppeteer = require('puppeteer');
const post = async (req, res) => {
    if (req.body.message == undefined || req.body.message == '') {
        res.status(400).send({
            message: "Message is required"
        });
    } else {
        // instagram controller need fix
        const browser = await puppeteer.launch({
            headless: false,
        });
       const page = await browser.newPage();
        await page.goto('https://www.instagram.com/accounts/login/');
        await page.waitForSelector("[name='username']")
        await page.type("[name='username']", "username")
        await page.keyboard.down('Tab')
        await page.keyboard.type("password")
        const [button] = await page.$x("//button[contains(.,'Log In')]")

        if(button){
            await button.click();
        }
        await page.waitForSelector('svg[aria-label="New post"]')
        await page.click('svg[aria-label="New post"]')
        const [button1] = await page.$x("//button[contains(.,'Select From Computer')]")
        // await button1.click();
        const [fileChooser] = await Promise.all([
        
        page.waitForFileChooser(),
        button1.click()
        

        ])
        await fileChooser.accept(['/home/rex/Pictures/pins/12%20Link%20building%20Strategy.jpg'])
        const [next] = await page.$x("//button[contains(.,'Next')]")
        await next.click();
        const [next2] = await page.$x("//button[contains(.,'Next')]")
        await next2.click();
        await page.waitForTimeout(500)
        await page.click('.lFzco')
        await page.keyboard.type("Photo Upload by Automation")
        const [share] = await page.$x("//button[contains(.,'Share')]")
        await share.click();
        await page.waitForTimeout(10000)
        browser.close()
        res.status(200).send({
            message: "Successfully posted on instagram"
        });
    }
}

module.exports = {
    post
}
// require('dotenv').config()
const puppeteer = require('puppeteer');
async function instagram_post() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo:100,
  
  });
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/accounts/login/');
  await page.waitForSelector("[name='username']")
  await page.type("[name='username']", "user_name")
  await page.keyboard.down('Tab')
  await page.keyboard.type("Password")
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
await fileChooser.accept(['/home/anupam/Pictures/photo-1531804055935-76f44d7c3621.jpeg'])
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
}
instagram_post();

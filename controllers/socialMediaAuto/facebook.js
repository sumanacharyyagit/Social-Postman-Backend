// require('dotenv').config()
const puppeteer = require('puppeteer');
async function facebook_post() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo:100,
  
  });
  const page = await browser.newPage();
  await page.goto('https://www.facebook.com/');
  await page.waitForSelector("[name='email']")
  await page.type("[name='email']", "user_name")
  await page.keyboard.down('Tab')
  await page.keyboard.type("Password")
  const [button] = await page.$x("//button[contains(.,'Log In')]")

  if(button){
    await button.click();
  }

await page.waitForNavigation();

await page.waitForTimeout(25000)
await page.goto("https://www.facebook.com/profile.php?id=100010304882063");


await page.waitForTimeout(5000);
const [span] = await page.$x(`//span[contains(.,"What's on your mind?")]`)
await span.click();
await page.waitForTimeout(5000);
await page.keyboard.type("First message Post by automation...")
await page.waitForTimeout(2000);
await page.keyboard.down("Control");
await page.keyboard.press(String.fromCharCode(13));
await page.keyboard.up("Control");
await page.waitForTimeout(4000);
browser.close()
}
facebook_post();

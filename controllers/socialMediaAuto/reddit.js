const puppeteer = require("puppeteer");

let userName = "suman_acharyya";
let password = "Reddit@123";
let title = "Suman@Acharyya";
let description =
  "Suman@Acharyya Suman@Acharyya Suman@Acharyya Suman@Acharyya Suman@Acharyya";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    devtools: false,
  });
  const page = await browser.newPage();

  await page.goto("https://www.reddit.com/login/");
  await page.type("#loginUsername", userName, { delay: 0 });
  await page.waitForTimeout(500);
  await page.type("#loginPassword", password, { delay: 0 });
  await page.waitForTimeout(500);
  await page.click(".AnimatedForm__submitButton", { click: 1 });
  await page.waitForTimeout(12500);
  // await page.waitFor(5000);

  await page.goto("https://www.reddit.com/user/" + userName + "/submit");
  // await page.goto("https://www.reddit.com/user/suman_acharyya/submit");
  await page.waitForTimeout(500);

  await page.type(".PqYQ3WC15KaceZuKcFI02", title);
  await page.type(".notranslate", description);
  await page.waitForTimeout(500);
  await page.waitForTimeout(500);

  await page.click("._18Bo5Wuo3tMV-RDB8-kh8Z", { click: 1 });
  await page.waitForTimeout(5000);
  await browser.close();
})(userName, title, description);

import { chromium } from 'playwright';

async function testHeader() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(500);
  await page.fill('input#nickname', 'Linh');
  await page.click('button:has-text("Enter The Room"), button:has-text("Bước Vào Phòng")');
  await page.waitForTimeout(500);
  const skip = await page.$('button:has-text("Skip Cinematic"), button:has-text("Bỏ Qua Hoạt Cảnh")');
  if (skip) await skip.click();
  await page.waitForTimeout(1000);

  const headerText = await page.innerText('header');
  console.log('HEADER TEXT ON PAGE 1:', JSON.stringify(headerText));

  // Check what MultiplayerBadge renders
  const badgeHTML = await page.innerHTML('header');
  console.log('HEADER HTML:', badgeHTML);

  await browser.close();
}
testHeader();

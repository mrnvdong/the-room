import { chromium } from 'playwright';

async function verifyDeskCloseup() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5188...');
  await page.goto('http://localhost:5188');
  await page.waitForTimeout(2500);

  // Click Enter The Room
  const enterBtn = page.locator('button:has-text("Enter The Room"), button:has-text("Vào Phòng")');
  if (await enterBtn.first().isVisible({ timeout: 2000 }).catch(() => false)) {
    console.log('Clicking Enter The Room...');
    await enterBtn.first().click();
    await page.waitForTimeout(2000);
  }

  // Dismiss toast banner
  const toastClose = page.locator('button[aria-label="Dismiss"], button[aria-label="Close"], button:has-text("✕")');
  if (await toastClose.first().isVisible({ timeout: 1000 }).catch(() => false)) {
    await toastClose.first().click().catch(() => {});
  }

  // Let's teleport/set avatar position directly near the desk facing it
  console.log('Framing desk closeup...');
  await page.evaluate(() => {
    // If we have window.__ROOM_STORES__
    const stores = window.__ROOM_STORES__;
    // We can walk by pressing KeyA then KeyW
  });

  // Walk left towards desk
  await page.keyboard.down('KeyA');
  await page.waitForTimeout(1600);
  await page.keyboard.up('KeyA');
  await page.keyboard.down('KeyW');
  await page.waitForTimeout(1300);
  await page.keyboard.up('KeyW');
  await page.waitForTimeout(600);

  // Rotate camera to face the desk (-Z)
  const canvas = page.locator('canvas').first();
  const box = await canvas.boundingBox();
  if (box) {
    const startX = box.x + box.width * 0.5;
    const startY = box.y + box.height * 0.5;
    // drag to face north/desk
    await page.mouse.move(startX, startY);
    await page.mouse.down({ button: 'left' });
    await page.mouse.move(startX, startY + 60, { steps: 10 });
    await page.mouse.up({ button: 'left' });
    await page.waitForTimeout(1000);
  }

  await page.screenshot({
    path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/desk_closeup_view.png',
  });
  console.log('Saved desk_closeup_view.png');

  await browser.close();
  console.log('Done!');
}

verifyDeskCloseup().catch(console.error);

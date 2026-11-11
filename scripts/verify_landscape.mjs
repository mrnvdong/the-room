import { chromium } from 'playwright';

async function verifyLandscape() {
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

  // 1. Enter Window Lookout Mode directly (Daylight Clear)
  console.log('Setting clear weather and window lookout...');
  await page.evaluate(() => {
    const stores = window.__ROOM_STORES__;
    if (stores?.room) {
      stores.room.getState().setWeatherMode('clear');
      stores.room.getState().setWindowLookout(true);
    }
  });
  await page.waitForTimeout(2000);

  await page.screenshot({
    path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/coastal_lookout_day.png',
  });
  console.log('Saved coastal_lookout_day.png');

  // 2. Switch to Sunset Mode
  console.log('Switching to sunset weather...');
  await page.evaluate(() => {
    const stores = window.__ROOM_STORES__;
    if (stores?.room) {
      stores.room.getState().setWeatherMode('sunset');
    }
  });
  await page.waitForTimeout(1500);

  await page.screenshot({
    path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/coastal_lookout_sunset.png',
  });
  console.log('Saved coastal_lookout_sunset.png');

  // 3. Switch to Night Mode
  console.log('Switching to night weather...');
  await page.evaluate(() => {
    const stores = window.__ROOM_STORES__;
    if (stores?.room) {
      stores.room.getState().setWeatherMode('night');
    }
  });
  await page.waitForTimeout(1500);

  await page.screenshot({
    path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/coastal_lookout_night.png',
  });
  console.log('Saved coastal_lookout_night.png');

  // 4. Return to room (3rd person) with clear sunny weather and walk towards window
  console.log('Returning to room and framing avatar near coastal window...');
  await page.evaluate(() => {
    const stores = window.__ROOM_STORES__;
    if (stores?.room) {
      stores.room.getState().setWindowLookout(false);
      stores.room.getState().setWeatherMode('clear');
    }
  });
  await page.waitForTimeout(1000);

  // Walk left towards window
  await page.keyboard.down('KeyA');
  await page.waitForTimeout(1500);
  await page.keyboard.up('KeyA');
  await page.waitForTimeout(600);

  // Drag mouse to frame avatar against the sunlit window
  const canvas = page.locator('canvas').first();
  const box = await canvas.boundingBox();
  if (box) {
    const startX = box.x + box.width * 0.5;
    const startY = box.y + box.height * 0.5;
    await page.mouse.move(startX, startY);
    await page.mouse.down({ button: 'left' });
    await page.mouse.move(startX + 280, startY, { steps: 15 });
    await page.mouse.up({ button: 'left' });
    await page.waitForTimeout(1000);
  }

  await page.screenshot({
    path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/coastal_character_room_view.png',
  });
  console.log('Saved coastal_character_room_view.png');

  await browser.close();
  console.log('Verification script completed successfully!');
}

verifyLandscape().catch((err) => {
  console.error(err);
  process.exit(1);
});

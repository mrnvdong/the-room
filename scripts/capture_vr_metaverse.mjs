import { chromium } from 'playwright';

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:4173/...');
  await page.goto('http://localhost:4173/');

  await page.waitForSelector('canvas', { timeout: 10000 });
  await page.waitForTimeout(2000);

  // 1. Capture Identity Selector with the Metaverse VR Explorer selected
  const visitorBtn = await page.$('button:has-text("General Visitor"), button:has-text("Explorer"), button:has-text("Khách tham quan")');
  if (visitorBtn) {
    await visitorBtn.click();
    await page.waitForTimeout(800);
  }

  await page.screenshot({
    path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/vr_metaverse_identity_preview.png'
  });
  console.log('Captured vr_metaverse_identity_preview.png');

  // 2. Click Enter The Room
  const enterBtn = await page.$('button:has-text("Enter The Room"), button:has-text("Bước Vào Phòng")');
  if (enterBtn) {
    console.log('Clicking Enter The Room...');
    await enterBtn.click();
  }

  await page.waitForTimeout(1000);
  const skipBtn = await page.$('button[data-testid="skip-cinematic-button"], button:has-text("Skip"), button:has-text("Bỏ qua")');
  if (skipBtn) {
    console.log('Skipping cinematic...');
    await skipBtn.click();
  }

  await page.waitForTimeout(2500);

  // 3. Capture the Metaverse Avatar in the 3D Room
  await page.screenshot({
    path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/vr_metaverse_in_room.png'
  });
  console.log('Captured vr_metaverse_in_room.png');

  // Trigger wave emote (Key 'B' then click Wave or press action)
  const emoteBtn = await page.$('button:has-text("Emotes"), button:has-text("Biểu cảm")');
  if (emoteBtn) {
    await emoteBtn.click();
    await page.waitForTimeout(600);
    const waveOption = await page.$('button:has-text("Wave"), button:has-text("Chào")');
    if (waveOption) {
      await waveOption.click();
      await page.waitForTimeout(800);
      await page.screenshot({
        path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/vr_metaverse_waving.png'
      });
      console.log('Captured vr_metaverse_waving.png');
    }
  }

  await browser.close();
  console.log('All captures done.');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});

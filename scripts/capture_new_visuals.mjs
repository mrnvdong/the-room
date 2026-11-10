import { chromium } from 'playwright';

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:4173/...');
  await page.goto('http://localhost:4173/');

  // Wait for canvas to load
  await page.waitForSelector('canvas', { timeout: 10000 });
  await page.waitForTimeout(2000);

  // 1. Capture Identity Selector Modal showing the stylish new avatar
  await page.screenshot({
    path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/visual_identity_modal.png'
  });
  console.log('Captured visual_identity_modal.png');

  // Select Cybernetic Robot archetype
  const robotBtn = await page.$('button:has-text("Cybernetic"), button:has-text("Robot")');
  if (robotBtn) {
    await robotBtn.click();
    await page.waitForTimeout(800);
    await page.screenshot({
      path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/visual_robot_preview.png'
    });
  }

  // Select Recruiter archetype
  const recruiterBtn = await page.$('button:has-text("Recruiter"), button:has-text("Hiring")');
  if (recruiterBtn) {
    await recruiterBtn.click();
    await page.waitForTimeout(800);
    await page.screenshot({
      path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/visual_recruiter_preview.png'
    });
  }

  // Click Enter The Room button
  const enterBtn = await page.$('button:has-text("Enter The Room"), button:has-text("Bước Vào Phòng")');
  if (enterBtn) {
    console.log('Clicking Enter The Room...');
    await enterBtn.click();
  }

  // If Skip cinematic button appears, click it
  await page.waitForTimeout(1000);
  const skipBtn = await page.$('button[data-testid="skip-cinematic-button"], button:has-text("Skip"), button:has-text("Bỏ qua")');
  if (skipBtn) {
    console.log('Skipping cinematic...');
    await skipBtn.click();
  }

  await page.waitForTimeout(3000);

  // 2. Capture Entrance View of the 3D Room
  await page.screenshot({
    path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/visual_room_entrance.png'
  });
  console.log('Captured visual_room_entrance.png');

  // 3. Walk forward towards desk & oak slats
  await page.keyboard.down('KeyW');
  await page.waitForTimeout(1800);
  await page.keyboard.up('KeyW');
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/visual_workstation.png'
  });
  console.log('Captured visual_workstation.png');

  // 4. Move over to Lounge Area
  await page.keyboard.down('KeyD');
  await page.waitForTimeout(1500);
  await page.keyboard.up('KeyD');
  await page.keyboard.down('KeyS');
  await page.waitForTimeout(800);
  await page.keyboard.up('KeyS');
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/visual_lounge.png'
  });
  console.log('Captured visual_lounge.png');

  await browser.close();
  console.log('Capture finished successfully.');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});

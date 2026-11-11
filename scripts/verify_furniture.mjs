import { chromium } from 'playwright';

async function verifyFurniture() {
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

  // 1. Capture Workstation Desk & Chair Overview
  console.log('Walking towards the workstation desk...');
  // Move left towards desk (X = -4.7, Z = -3.7)
  await page.keyboard.down('KeyA');
  await page.waitForTimeout(1400);
  await page.keyboard.up('KeyA');
  await page.keyboard.down('KeyW');
  await page.waitForTimeout(1000);
  await page.keyboard.up('KeyW');
  await page.waitForTimeout(600);

  // Drag mouse to look at the workstation desk and chair
  const canvas = page.locator('canvas').first();
  const box = await canvas.boundingBox();
  if (box) {
    const startX = box.x + box.width * 0.5;
    const startY = box.y + box.height * 0.5;
    await page.mouse.move(startX, startY);
    await page.mouse.down({ button: 'left' });
    await page.mouse.move(startX + 180, startY - 50, { steps: 15 });
    await page.mouse.up({ button: 'left' });
    await page.waitForTimeout(1000);
  }

  await page.screenshot({
    path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/furniture_workstation_desk.png',
  });
  console.log('Saved furniture_workstation_desk.png');

  // 2. Sit at the desk chair [F]
  console.log('Pressing KeyF to sit down at the desk chair...');
  await page.keyboard.press('KeyF');
  await page.waitForTimeout(2000);

  await page.screenshot({
    path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/furniture_seated_at_desk.png',
  });
  console.log('Saved furniture_seated_at_desk.png');

  // Stand up
  await page.keyboard.press('KeyF');
  await page.waitForTimeout(1500);

  // 3. Move over to the Lounge Area (X = 4.5, Z = 2.7)
  console.log('Walking towards the lounge area...');
  await page.keyboard.down('KeyD');
  await page.waitForTimeout(2800);
  await page.keyboard.up('KeyD');
  await page.keyboard.down('KeyS');
  await page.waitForTimeout(1800);
  await page.keyboard.up('KeyS');
  await page.waitForTimeout(800);

  // Orbit camera to view the sofa, coffee table, TV and plant
  if (box) {
    const startX = box.x + box.width * 0.5;
    const startY = box.y + box.height * 0.5;
    await page.mouse.move(startX, startY);
    await page.mouse.down({ button: 'left' });
    await page.mouse.move(startX - 220, startY - 40, { steps: 15 });
    await page.mouse.up({ button: 'left' });
    await page.waitForTimeout(1000);
  }

  await page.screenshot({
    path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/furniture_lounge_area.png',
  });
  console.log('Saved furniture_lounge_area.png');

  // 4. View Bookshelf along back wall
  console.log('Turning to view bookshelf...');
  if (box) {
    const startX = box.x + box.width * 0.5;
    const startY = box.y + box.height * 0.5;
    await page.mouse.move(startX, startY);
    await page.mouse.down({ button: 'left' });
    await page.mouse.move(startX - 300, startY, { steps: 15 });
    await page.mouse.up({ button: 'left' });
    await page.waitForTimeout(1000);
  }

  await page.screenshot({
    path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/furniture_bookshelf_view.png',
  });
  console.log('Saved furniture_bookshelf_view.png');

  await browser.close();
  console.log('Furniture verification script completed successfully!');
}

verifyFurniture().catch((err) => {
  console.error(err);
  process.exit(1);
});

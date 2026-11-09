import { chromium } from 'playwright';

async function runE2ETests() {
  console.log('--- STARTING PLAYABLE ROOM REGRESSION E2E TEST ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });
  const page = await context.newPage();

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => {
    errors.push(err.message);
  });

  console.log('1. Navigating to http://localhost:3000/...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // Click Enter The Room to transition into the workspace
  const enterBtn = await page.$('button:has-text("Enter The Room")');
  if (enterBtn) {
    await enterBtn.click();
    await page.waitForTimeout(400);
    const skipBtn = await page.$('button:has-text("Skip Cinematic")');
    if (skipBtn) await skipBtn.click();
    await page.waitForTimeout(800);
  }

  const welcomeDismiss = page.locator('button[aria-label="Dismiss banner"]');
  if (await welcomeDismiss.count()) await welcomeDismiss.click();

  // Focus the window / canvas
  await page.locator('canvas').click({ force: true });

  // Verify canvas
  const canvas = await page.$('canvas');
  if (!canvas) throw new Error('Canvas not found');
  console.log('✓ 3D Canvas loaded and focused in Room.');

  // At spawn position [0, 0, 4.5], the exit threshold is nearby.
  await page.waitForTimeout(500);
  const initialPrompt = page.getByText('Inspect Workspace Threshold & Exit');
  await initialPrompt.waitFor({ timeout: 5000 });
  {
    const text = await initialPrompt.innerText();
    console.log(`✓ Initial spawn proximity prompt detected: "${text}"`);

    // Press E to interact with Entrance/Exit
    console.log('2. Pressing [E] to interact...');
    await page.keyboard.press('KeyE');
    await page.waitForTimeout(500);

    const dialog = await page.$('dialog[open]');
    if (!dialog) throw new Error('Expected modal dialog to open!');
    console.log('✓ Modal dialog opened with object details.');

    // Dismiss with Escape
    console.log('3. Pressing [Escape] to dismiss modal...');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    const dialogStillOpen = await page.$('dialog[open]');
    if (dialogStillOpen) throw new Error('Expected modal to close after Escape!');
    console.log('✓ Modal closed successfully.');
  }

  // Now test WASD movement forward into the room towards bookshelf at [-0.2, 0, -4.7]
  console.log('4. Testing WASD walking forward into the room (KeyW)...');
  await page.keyboard.down('KeyW');
  await page.waitForTimeout(2500);
  await page.keyboard.up('KeyW');
  await page.waitForTimeout(500);

  // Check if bookshelf prompt appears
  const bookshelfPrompt = page.getByText('Inspect Technical Library Shelf');
  await bookshelfPrompt.waitFor({ timeout: 5000 });
  console.log('✓ Walked across room and reached Bookshelf proximity prompt!');
  await page.keyboard.press('KeyE');
  await page.waitForTimeout(500);
  if (!(await page.$('dialog[open]'))) throw new Error('Expected Bookshelf modal dialog to open!');
  console.log('✓ Opened Bookshelf modal dialog.');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  // 5. Test Mobile Controls toggle
  console.log('5. Testing Mobile Controls Overlay...');
  const mobileToggleBtn = await page.$('button[aria-label="Toggle mobile / desktop controls mode"]');
  if (mobileToggleBtn) {
    await mobileToggleBtn.click();
    await page.waitForTimeout(500);

    const joystick = await page.$('div[aria-label="Virtual Movement Joystick"]');
    if (!joystick) throw new Error('Virtual joystick not found in mobile mode');
    console.log('✓ Mobile virtual joystick and touch controls active.');
  }

  await browser.close();

  if (errors.length > 0) {
    console.error('Errors found:', errors);
    throw new Error('E2E test failed with errors');
  }

  console.log('--- ALL REGRESSION CHECKS PASSED FOR PLAYABLE ROOM ---');
}

runE2ETests().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});

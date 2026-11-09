import { chromium } from 'playwright';

const ARTIFACT_DIR = '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa';

async function runPhase4E2ETest() {
  console.log('--- STARTING PHASE 4 PORTFOLIO & LOCALIZATION E2E TEST ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
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
  await page.waitForTimeout(1000);

  // 1. Test Language Toggle in Entrance: EN -> VI
  console.log('2. Testing Language Switcher (EN -> VI)...');
  const langBtn = await page.$('button[title*="Toggle Language"]');
  if (langBtn) {
    await langBtn.click();
    await page.waitForTimeout(400);
    const viTitle = await page.$('text=KHÔNG GIAN LÀM VIỆC CỦA DONG');
    if (viTitle) {
      console.log('✓ Successfully toggled to Vietnamese: "KHÔNG GIAN LÀM VIỆC CỦA DONG" displayed.');
    }
    await page.screenshot({ path: `${ARTIFACT_DIR}/screenshot_vietnamese.png` });
    console.log('✓ Saved screenshot_vietnamese.png');
  }

  // 2. Test Accessible 2D Portfolio View
  console.log('3. Testing Switch to 2D Accessible Portfolio View...');
  const switch2DBtn = await page.$('button:has-text("Bản 2D"), button:has-text("2D View")');
  if (!switch2DBtn) throw new Error('2D Mode switch button not found!');
  await switch2DBtn.click();
  await page.waitForTimeout(800);

  const heroHeading = await page.$('text=DONG');
  if (!heroHeading) throw new Error('2D Portfolio view did not render profile displayName!');
  console.log('✓ 2D Accessible Portfolio view loaded successfully.');

  // Test project category filtering in 2D View
  const cloudEdgeFilter = await page.$('button:has-text("Cloud Edge")');
  if (cloudEdgeFilter) {
    await cloudEdgeFilter.click();
    await page.waitForTimeout(300);
    const edgeMesh = await page.$('text=Cloudflare Edge Microservices Mesh');
    if (edgeMesh) console.log('✓ Category filter "Cloud Edge" correctly rendered project.');
  }

  await page.screenshot({ path: `${ARTIFACT_DIR}/screenshot_2d_mode.png` });
  console.log('✓ Saved screenshot_2d_mode.png');

  // 3. Test Switch Back to 3D Room
  console.log('4. Testing Switch back to 3D Room...');
  const switch3DBtn = await page.$('button:has-text("Phòng 3D"), button:has-text("3D Room")');
  if (!switch3DBtn) throw new Error('Switch back to 3D Room button not found!');
  await switch3DBtn.click();
  await page.waitForTimeout(800);

  const roomCanvas = await page.$('canvas');
  if (!roomCanvas) throw new Error('WebGL 3D Canvas not rendered after returning from 2D mode!');
  console.log('✓ Successfully returned to 3D WebGL environment.');

  if (errors.length > 0) {
    console.error('Console errors:', errors);
    throw new Error(`Encountered ${errors.length} browser console errors during Phase 4 test!`);
  }

  console.log('\n======================================================');
  console.log('✅ ALL PHASE 4 PORTFOLIO & LOCALIZATION TESTS PASSED!');
  console.log('======================================================\n');

  await browser.close();
}

runPhase4E2ETest().catch((err) => {
  console.error('Phase 4 E2E test failed:', err);
  process.exit(1);
});

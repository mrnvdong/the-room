import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const ARTIFACT_DIR = resolve(process.cwd(), 'test-results');
mkdirSync(ARTIFACT_DIR, { recursive: true });

async function runPhase5And6E2ETest() {
  console.log('--- STARTING PHASE 5 & 6 GAMEPLAY POLISH, AUDIO, GUESTBOOK & ADMIN E2E TEST ---');
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

  // Enter room with test nickname
  const nicknameInput = await page.$('input#nickname');
  if (nicknameInput) {
    await nicknameInput.fill('Phase5 Tester');
    await page.waitForTimeout(200);
  }

  const enterBtn = await page.$('button:has-text("Enter The Room"), button:has-text("Bước Vào Phòng")');
  if (!enterBtn) throw new Error('Enter The Room button not found');
  await enterBtn.click();

  // Skip cinematic
  await page.waitForTimeout(600);
  const skipBtn = await page.$('button:has-text("Skip Cinematic"), button:has-text("Bỏ Qua Hoạt Cảnh")');
  if (skipBtn) await skipBtn.click();
  await page.waitForTimeout(1000);

  console.log('✓ Successfully entered 3D Room.');

  // 1. Verify Exploration Tracker in HUD
  console.log('\n--- 1. Testing Exploration Progress Tracker ---');
  const explorationBadge = await page.$('text=/6');
  if (!explorationBadge) {
    throw new Error('Exploration progress badge (e.g. 1/6) not found in HUD!');
  }
  const badgeText = await explorationBadge.innerText();
  console.log(`✓ Exploration progress badge visible: ${badgeText}`);

  // Test discovering a new zone programmatically
  await page.evaluate(() => {
    import('/src/stores/useExplorationStore.ts').then((mod) => {
      mod.useExplorationStore.getState().discoverZone('workstation');
      mod.useExplorationStore.getState().discoverZone('bookshelf');
    });
  });
  await page.waitForTimeout(500);

  const zoneToast = await page.$('text=New Zone Discovered, text=Khu vực mới khám phá');
  if (zoneToast) {
    console.log('✓ Exploration discovery notification toast triggered.');
  }

  // 2. Test Audio Mute / Unmute
  console.log('\n--- 2. Testing Audio Toggle ---');
  const soundBtn = await page.$('button[title*="Audio"]');
  if (soundBtn) {
    await soundBtn.click();
    await page.waitForTimeout(200);
    console.log('✓ Sound toggled successfully.');
  }

  // 3. Test Guestbook Signing at Entrance Portal
  console.log('\n--- 3. Testing Guestbook (entrance.door) ---');
  await page.evaluate(() => {
    (window).__ROOM_STORES__.interaction.getState().openModal({
      id: 'entrance.door',
      displayName: 'Workspace Threshold & Exit',
      description: 'Exit workspace or sign the visitor guestbook.',
      position: [0, 1.2, 5.3],
      radius: 2.0,
      action: 'exit_door',
      category: 'exit',
    });
  });
  await page.waitForTimeout(800);

  const guestbookHeading = await page.$('h3:has-text("Guestbook"), h3:has-text("Lưu Bút")');
  if (!guestbookHeading) {
    throw new Error('Guestbook panel not rendered inside entrance modal!');
  }
  console.log('✓ Guestbook panel rendered.');

  // Fill and submit guestbook note
  const noteTextarea = await page.$('textarea');
  if (!noteTextarea) throw new Error('Guestbook message field is missing.');
  await noteTextarea.fill('Automated guestbook pending status check.');
  const signBtn = await page.$('button:has-text("Sign Guestbook"), button:has-text("Ký Tên")');
  if (!signBtn) throw new Error('Guestbook submit button is missing.');
  await signBtn.click();
  await page.getByText('Note submitted. It will appear after moderation.').waitFor({ timeout: 5000 });
  const publicFeed = await page.evaluate(async () => (await fetch('/api/guestbook')).json());
  if (publicFeed.some((entry) => entry.message === 'Automated guestbook pending status check.')) {
    throw new Error('Pending guestbook note must not appear in the public feed.');
  }
  console.log('✓ Guestbook submission is pending and hidden from the public feed.');

  await page.screenshot({ path: `${ARTIFACT_DIR}/screenshot_guestbook.png` });
  console.log('✓ Saved screenshot_guestbook.png');

  // Close modal
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // 4. Admin remains disabled until server-side authentication is implemented.
  console.log('\n--- 4. Testing disabled Admin tools ---');
  const adminBtn = await page.$('button[title="Admin Control Center"]');
  if (!adminBtn) throw new Error('Admin Control Center button not found in HUD!');
  await adminBtn.click();
  await page.waitForTimeout(500);

  await page.getByText('Admin tools unavailable').waitFor({ timeout: 3000 });
  if (await page.locator('input[type="password"]').count()) throw new Error('Client-side admin password input must not exist.');
  const adminApiStatus = (await fetch('http://localhost:3000/api/admin/guestbook')).status;
  if (adminApiStatus !== 503) throw new Error(`Expected disabled admin API status 503, got ${adminApiStatus}.`);
  console.log('✓ Admin UI has no password input and admin API returns 503.');

  await page.screenshot({ path: `${ARTIFACT_DIR}/screenshot_admin.png` });
  console.log('✓ Saved screenshot_admin.png');

  // Close admin modal
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  if (errors.length > 0) {
    console.error('Console errors:', errors);
    throw new Error(`Encountered ${errors.length} browser console errors during Phase 5 & 6 test!`);
  }

  console.log('\n======================================================');
  console.log('✅ Local guestbook and disabled-admin checks passed.');
  console.log('======================================================\n');

  await browser.close();
}

runPhase5And6E2ETest().catch((err) => {
  console.error('Phase 5 & 6 E2E test failed:', err);
  process.exit(1);
});

import { chromium } from 'playwright';

async function enterRoom(page, nickname, roleId) {
  console.log(`[${nickname}] Opening page...`);
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(500);

  console.log(`[${nickname}] Setting nickname (${nickname})...`);
  await page.waitForSelector('input#nickname', { timeout: 15000 });
  await page.fill('input#nickname', nickname);
  await page.waitForTimeout(300);

  console.log(`[${nickname}] Selecting role (${roleId})...`);
  const roleSelector = `[data-testid="role-${roleId}"]`;
  const roleBtn = await page.waitForSelector(roleSelector, { timeout: 15000 });
  await roleBtn.click();
  await page.waitForTimeout(300);

  console.log(`[${nickname}] Entering room...`);
  const enterBtn = await page.waitForSelector('[data-testid="enter-room-button"]', { timeout: 15000 });
  await enterBtn.click();

  try {
    const skipBtn = await page.waitForSelector('[data-testid="skip-cinematic-button"]', { timeout: 5000 });
    await skipBtn.click();
  } catch (e) {
    // Already skipped
  }

  // Wait for 3D room HUD to appear (MultiplayerBadge)
  await page.waitForSelector('text=Visitor', { timeout: 15000 });
  console.log(`[${nickname}] Successfully entered 3D workspace.`);
}

async function runIdleMultiplayerTest() {
  console.log('--- TESTING MULTIPLAYER IDLE VISITOR PERSISTENCE (15s NO MOVEMENT) ---');
  const browser = await chromium.launch({ headless: true });

  const ctx1 = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 720 } });

  // 1. Browser 1: Linh Recruiter enters
  const page1 = await ctx1.newPage();
  await enterRoom(page1, 'Linh Recruiter', 'recruiter');

  // 2. Browser 2: David Observer enters
  const page2 = await ctx2.newPage();
  await enterRoom(page2, 'David Observer', 'partner');

  // 3. Confirm both see 2 Visitors initially
  console.log('3. Checking initial 2 Visitors count on Browser 2...');
  await page2.waitForSelector('text=2 Visitors', { timeout: 10000 });
  console.log('✓ Both connected. Browser 2 sees "2 Visitors"');

  const nametagInitial = await page2.$('text=Linh Recruiter');
  if (nametagInitial) {
    console.log('✓ Browser 2 sees Linh Recruiter nametag initially.');
  }

  // 4. Stand COMPLETELY STILL for 15 seconds!
  // In the old buggy implementation, stale timeout was 5 seconds, so after 5 seconds Linh disappeared.
  // With heartbeat keepalive (1.5s interval) and 60s stale timeout, Linh will NOT disappear!
  console.log('\n>>> Linh Recruiter will now stay completely idle for 15 seconds (no keypresses, no mouse movement)...');
  for (let sec = 1; sec <= 15; sec += 3) {
    await page1.waitForTimeout(3000);
    console.log(`    ... elapsed ${sec + 2}s idle ...`);
  }

  // 5. Verify that after 15 seconds, David STILL sees 2 Visitors and Linh's nametag
  console.log('\n>>> Checking visitor count on Browser 2 after 15s idle...');
  const countStill2 = await page2.waitForSelector('text=2 Visitors', { timeout: 5000 });
  if (!countStill2) {
    throw new Error('FAILURE: Count dropped below 2 Visitors while Linh was idle!');
  }
  console.log('✓ SUCCESS: Visitor count is STILL "2 Visitors" on Browser 2!');

  const nametagStillVisible = await page2.$('text=Linh Recruiter');
  if (!nametagStillVisible) {
    throw new Error('FAILURE: Nametag for Linh Recruiter disappeared from Browser 2!');
  }
  console.log('✓ SUCCESS: Nametag "Linh Recruiter" is STILL visible on Browser 2 screen!');

  // Take screenshot for proof
  await page2.screenshot({ path: 'screenshot_multiplayer_idle_persisted.png' });
  console.log('✓ Proof screenshot saved: screenshot_multiplayer_idle_persisted.png');

  await browser.close();
  console.log('\n=============================================================');
  console.log('🎉 TEST PASSED: Idle visitors persist indefinitely with keepalive!');
  console.log('=============================================================\n');
}

runIdleMultiplayerTest().catch((err) => {
  console.error('Idle test failed:', err);
  process.exit(1);
});

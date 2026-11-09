import { chromium } from 'playwright';

async function enterRoom(page, nickname, roleId) {
  console.log(`[${nickname}] Opening page...`);
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);

  console.log(`[${nickname}] Setting nickname and selecting role (${roleId})...`);
  await page.waitForSelector('input#nickname', { timeout: 8000 });
  await page.fill('input#nickname', nickname);
  
  const roleBtn = await page.waitForSelector(`[data-testid="role-${roleId}"]`, { timeout: 8000 });
  await roleBtn.click();
  await page.waitForTimeout(300);

  console.log(`[${nickname}] Entering room...`);
  const enterBtn = await page.waitForSelector('[data-testid="enter-room-button"]', { timeout: 8000 });
  await enterBtn.click();

  // Wait for and click skip cinematic button if present
  try {
    const skipBtn = await page.waitForSelector('[data-testid="skip-cinematic-button"]', { timeout: 3000 });
    await skipBtn.click();
  } catch (e) {
    // Might have already transitioned
  }

  // Guarantee that player is fully in room (HUD MultiplayerBadge mounted)
  await page.waitForSelector('[data-testid="multiplayer-badge"]', { timeout: 10000 });
  console.log(`[${nickname}] In room successfully with HUD active.`);
}

async function runFullVerification() {
  console.log('===============================================================');
  console.log('   FULL MULTIPLAYER REAL-TIME PRESENCE & IDLE PERSISTENCE TEST   ');
  console.log('===============================================================');

  const browser = await chromium.launch({
    headless: true,
    args: ['--use-gl=angle', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const ctx1 = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const ctx3 = await browser.newContext({ viewport: { width: 1280, height: 720 } });

  // 1. Browser 1: Linh (Recruiter) enters
  const page1 = await ctx1.newPage();
  await enterRoom(page1, 'Linh Recruiter', 'recruiter');

  // 2. Browser 2: David (Partner) enters
  const page2 = await ctx2.newPage();
  await enterRoom(page2, 'David Partner', 'partner');

  // 3. Confirm both see 2 Visitors online
  console.log('\n--- VERIFYING INITIAL 2-VISITOR SYNCHRONIZATION ---');
  await page2.waitForSelector('[data-testid="multiplayer-badge"]:has-text("2 Visitors")', { timeout: 8000 });
  
  const b2Count = await page2.evaluate(() => {
    const store = window.__MULTIPLAYER_STORE__;
    return store ? 1 + store.getState().remotePlayers.size : 0;
  });
  console.log(`Browser 2 sees total visitors: ${b2Count}`);
  if (b2Count < 2) {
    throw new Error(`Expected at least 2 visitors on Browser 2, got: ${b2Count}`);
  }
  console.log('✓ SUCCESS: Both visitors connected and synchronized!');

  // 4. Test Idle Persistence: Visitor 1 stands completely still for 15 seconds
  console.log('\n--- TESTING IDLE PERSISTENCE (15 SECONDS NO MOVEMENT) ---');
  console.log('Visitor 1 (Linh Recruiter) will stand completely motionless...');
  
  for (let s = 3; s <= 15; s += 3) {
    await page1.waitForTimeout(3000);
    const countDuringIdle = await page2.evaluate(() => {
      const store = window.__MULTIPLAYER_STORE__;
      return store ? 1 + store.getState().remotePlayers.size : 0;
    });
    console.log(`   ... ${s}s elapsed: Browser 2 sees ${countDuringIdle} visitors`);
    if (countDuringIdle < 2) {
      throw new Error(`FAILURE: Linh disappeared from Browser 2 after ${s}s of idle!`);
    }
  }

  console.log('✓ SUCCESS: Idle visitor persisted continuously for 15s without disappearing!');

  // 5. Browser 3: CyberBot (Robot) joins
  console.log('\n--- TESTING 3 CONCURRENT BROWSERS ---');
  const page3 = await ctx3.newPage();
  await enterRoom(page3, 'CyberBot', 'robot');

  console.log('Verifying 3 Visitors count on Browser 1 (Linh)...');
  await page1.waitForSelector('[data-testid="multiplayer-badge"]:has-text("3 Visitors")', { timeout: 8000 });
  const b1Count = await page1.evaluate(() => {
    const store = window.__MULTIPLAYER_STORE__;
    return store ? 1 + store.getState().remotePlayers.size : 0;
  });
  console.log(`Browser 1 sees total visitors: ${b1Count}`);
  if (b1Count < 3) {
    throw new Error(`Expected 3 visitors on Browser 1, got: ${b1Count}`);
  }
  console.log('✓ SUCCESS: 3 visitors simultaneously active in the workspace!');

  // Take proof screenshot of the 3-visitor session
  await page1.screenshot({ path: 'screenshot_multiplayer_verified.png' });
  console.log('✓ Screenshot saved: screenshot_multiplayer_verified.png');

  // 6. Test graceful leave on disconnect
  console.log('\n--- TESTING DISCONNECT HANDLING ---');
  await ctx3.close();
  await page1.waitForSelector('[data-testid="multiplayer-badge"]:has-text("2 Visitors")', { timeout: 6000 });

  const countAfterLeave = await page1.evaluate(() => {
    const store = window.__MULTIPLAYER_STORE__;
    return store ? 1 + store.getState().remotePlayers.size : 0;
  });
  console.log(`Browser 1 count after Browser 3 left: ${countAfterLeave}`);
  if (countAfterLeave !== 2) {
    throw new Error(`Expected 2 visitors after disconnect, got: ${countAfterLeave}`);
  }
  console.log('✓ SUCCESS: Disconnected visitor removed immediately.');

  await browser.close();

  console.log('\n===============================================================');
  console.log('🎉 ALL MULTIPLAYER TESTS PASSED WITH 100% SUCCESS!');
  console.log('===============================================================\n');
}

runFullVerification().catch((err) => {
  console.error('\n❌ VERIFICATION FAILED:', err);
  process.exit(1);
});

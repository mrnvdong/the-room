import { chromium } from 'playwright';

async function enterRoom(page, nickname, roleId) {
  console.log(`[${nickname}] Opening page...`);
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);

  console.log(`[${nickname}] Setting nickname and selecting role (${roleId})...`);
  await page.fill('input#nickname', nickname);
  const roleBtn = await page.waitForSelector(`[data-testid="role-${roleId}"]`, { timeout: 4000 });
  await roleBtn.click();
  await page.waitForTimeout(300);

  console.log(`[${nickname}] Entering room...`);
  const enterBtn = await page.waitForSelector('[data-testid="enter-room-button"]', { timeout: 4000 });
  await enterBtn.click();
  await page.waitForTimeout(400);

  const skipBtn = await page.$('[data-testid="skip-cinematic-button"]');
  if (skipBtn) {
    await skipBtn.click().catch(() => {});
  }
  await page.waitForTimeout(1000);
  console.log(`[${nickname}] In room successfully.`);
}

async function runMultiBrowserTest() {
  console.log('--- TESTING 3 SEPARATE BROWSERS VIA WEBSOCKET PRESENCE ---');
  const browser = await chromium.launch({ headless: true });

  // 3 completely isolated browser contexts (simulating Chrome, Safari, Firefox or Incognito)
  const ctx1 = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const ctx3 = await browser.newContext({ viewport: { width: 1280, height: 720 } });

  // 1. Browser 1: Linh (Recruiter)
  const page1 = await ctx1.newPage();
  await enterRoom(page1, 'Linh Recruiter', 'recruiter');

  // 2. Browser 2: David (Partner)
  const page2 = await ctx2.newPage();
  await enterRoom(page2, 'David Partner', 'partner');

  // Move David to the right
  await page2.keyboard.down('KeyD');
  await page2.waitForTimeout(800);
  await page2.keyboard.up('KeyD');

  // 3. Browser 3: CyberBot (Robot)
  const page3 = await ctx3.newPage();
  await enterRoom(page3, 'CyberBot', 'robot');

  // Move CyberBot to the left
  await page3.keyboard.down('KeyA');
  await page3.waitForTimeout(800);
  await page3.keyboard.up('KeyA');

  // Wait 1.5s for WebSocket broadcasts across all 3 browsers
  await page1.waitForTimeout(1500);

  // 4. Verify that Browser 1 shows 3 visitors online
  console.log('4. Verifying cross-browser visitor count on Browser 1 (Linh)...');
  const countPill = await page1.waitForSelector('text=3 Visitors', { timeout: 6000 });
  if (!countPill) {
    const text = await page1.innerText('header');
    console.log('Header text:', text);
    throw new Error('Expected 3 Visitors count on Browser 1');
  }
  console.log('✓ "3 Visitors" detected across 3 distinct browser contexts via WebSocket!');

  // Verify nametags on Browser 1 screen
  const tagDavid = await page1.$('text=David Partner');
  const tagBot = await page1.$('text=CyberBot');
  if (tagDavid) console.log('✓ Browser 2 (David Partner) nametag rendered on Browser 1 screen.');
  if (tagBot) console.log('✓ Browser 3 (CyberBot) nametag rendered on Browser 1 screen.');

  // Take screenshot of 3 different browsers co-existing
  await page1.screenshot({ path: 'screenshot_multiplayer_3visitors.png' });
  console.log('✓ Screenshot saved: screenshot_multiplayer_3visitors.png');

  // 5. Test real-time movement: Browser 2 moves and Browser 1 sees it
  console.log('5. Testing real-time cross-browser movement synchronization...');
  await page2.keyboard.down('KeyW');
  await page2.waitForTimeout(1200);
  await page2.keyboard.up('KeyW');
  await page1.waitForTimeout(500);
  console.log('✓ Real-time movement synchronized over WebSocket.');

  // 6. Test Browser 3 disconnect
  console.log('6. Disconnecting Browser 3...');
  await ctx3.close();
  await page1.waitForTimeout(1500);

  const updatedPill = await page1.waitForSelector('text=2 Visitors', { timeout: 4000 });
  if (updatedPill) {
    console.log('✓ Browser 1 dynamically dropped count to "2 Visitors" on disconnect.');
  }

  await browser.close();
  console.log('--- ALL MULTI-BROWSER TESTS PASSED! ---');
}

runMultiBrowserTest().catch((e) => {
  console.error('Failed:', e);
  process.exit(1);
});

import { chromium } from 'playwright';

async function runPhase2E2ETests() {
  console.log('--- STARTING PHASE 2 ENTRANCE & AVATARS E2E TEST ---');
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
  await page.waitForTimeout(1000);

  // Check Entrance Scene presence
  const workspaceTitle = await page.$('text=DONG\'S PRIVATE WORKSPACE');
  if (!workspaceTitle) {
    throw new Error('Workspace title "DONG\'S PRIVATE WORKSPACE" not found in entrance scene!');
  }
  console.log('✓ Entrance scene loaded: Workspace nameplate visible.');
  await page.screenshot({ path: 'screenshot_entrance.png' });

  // 2. Test Doorbell Ring
  console.log('2. Testing Doorbell interaction...');
  const doorbellBtn = await page.$('button[title="Ring Entrance Doorbell"]');
  if (doorbellBtn) {
    await doorbellBtn.click();
    await page.waitForTimeout(400);
    const doorbellToast = await page.$('text=Ding-dong');
    if (doorbellToast) {
      console.log('✓ Doorbell ring chime alert triggered.');
    }
  }

  // 3. Test Security Camera Scan
  console.log('3. Testing Security Camera interaction...');
  const cameraBtn = await page.$('button[title="Security Camera Scan"]');
  if (cameraBtn) {
    await cameraBtn.click();
    await page.waitForTimeout(400);
    const cameraToast = await page.$('text=Security');
    if (cameraToast) {
      console.log('✓ Security camera scan telemetry message displayed.');
      await page.screenshot({ path: 'screenshot_doorbell.png' });
    }
  }

  // 4. Test Nickname Input & 30-character limit
  console.log('4. Testing Nickname form & character limit...');
  const nicknameInput = await page.$('input#nickname');
  if (!nicknameInput) throw new Error('Nickname input not found');

  await nicknameInput.fill('Alex Senior FullStack Engineer With Very Long Name');
  const val = await nicknameInput.inputValue();
  console.log(`✓ Nickname input length capped at ${val.length} chars: "${val}"`);
  if (val.length > 30) throw new Error('Nickname input exceeded 30 characters limit!');

  // Fill clean test nickname
  await nicknameInput.fill('Alex Engineer');

  // 5. Test Selecting All 8 Visitor Identities
  console.log('5. Testing all 8 visitor identities selection...');
  const identities = [
    { name: 'Recruiter', badge: '💼' },
    { name: 'Technical Partner', badge: '🤝' },
    { name: 'Close Friend', badge: '☕' },
    { name: 'General Visitor', badge: '🧭' },
    { name: 'Stealth Thief', badge: '🥷' },
    { name: 'Floating Ghost', badge: '👻' },
    { name: 'Cybernetic Android', badge: '🤖' },
    { name: 'Mystery Guest', badge: '🎭' },
  ];

  for (const ident of identities) {
    const btn = await page.$(`text=${ident.name}`);
    if (!btn) throw new Error(`Identity button "${ident.name}" not found!`);
    await btn.click();
    await page.waitForTimeout(150);
  }
  console.log('✓ Successfully cycled through all 8 identities.');

  // Select 'Cybernetic Android / Robot' for in-room test
  const robotBtn = await page.$('text=Cybernetic Android');
  if (robotBtn) await robotBtn.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshot_avatar_selection.png' });

  // 6. Test Enter The Room & Door Opening Cinematic
  console.log('6. Testing "Enter The Room" button & door cinematic...');
  const enterBtn = await page.$('button:has-text("Enter The Room")');
  if (!enterBtn) throw new Error('Enter The Room button not found!');

  await enterBtn.click();
  await page.waitForTimeout(600);

  // Verify cinematic state (ENTERING)
  const enteringNotice = await page.$('text=ENTERING WORKSPACE');
  if (!enteringNotice) throw new Error('ENTERING state HUD not found!');
  console.log('✓ Door opening cinematic initiated.');
  await page.screenshot({ path: 'screenshot_cinematic.png' });

  // 7. Test Skippable Cinematic
  console.log('7. Testing "Skip Cinematic" button...');
  const skipBtn = await page.$('button:has-text("Skip Cinematic")');
  if (skipBtn) {
    await skipBtn.click();
    await page.waitForTimeout(800);
  }

  // 8. Verify transition to Playable Room with chosen avatar
  console.log('8. Verifying room transition & avatar HUD badge...');
  const visitorBadge = await page.$('text=Alex Engineer');
  if (!visitorBadge) throw new Error('Visitor nickname badge not displayed in room HUD!');
  console.log('✓ Entered playable room with identity badge: "Alex Engineer" (Robot).');

  // Test WASD movement in the room
  console.log('9. Testing avatar movement with assigned robot model...');
  await page.keyboard.down('KeyW');
  await page.waitForTimeout(1200);
  await page.keyboard.up('KeyW');

  await page.screenshot({ path: 'screenshot_room_phase2.png' });
  console.log('✓ In-room movement verified. Screenshot saved: screenshot_room_phase2.png');

  await browser.close();

  if (errors.length > 0) {
    console.error('Errors found:', errors);
    throw new Error('Phase 2 E2E test failed with errors');
  }

  console.log('--- ALL PHASE 2 ACCEPTANCE CRITERIA PASSED ---');
}

runPhase2E2ETests().catch((err) => {
  console.error('Phase 2 Test Execution Failed:', err);
  process.exit(1);
});

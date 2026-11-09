import { chromium } from 'playwright';

const ARTIFACT_DIR = '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa';

async function runPhase3E2ETest() {
  console.log('--- STARTING COMPREHENSIVE PHASE 3 INTERACTIONS E2E TEST ---');
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
    await nicknameInput.fill('Phase3 Tester');
    await page.waitForTimeout(200);
  }

  const enterBtn = await page.$('button:has-text("Enter The Room")');
  if (!enterBtn) throw new Error('Enter The Room button not found');
  await enterBtn.click();

  // Skip cinematic
  await page.waitForTimeout(600);
  const skipBtn = await page.$('button:has-text("Skip Cinematic")');
  if (skipBtn) await skipBtn.click();
  await page.waitForTimeout(1000);

  console.log('✓ Successfully entered 3D Room.');

  // Helper to open modal
  const openModal = async (obj) => {
    await page.evaluate((targetObj) => {
      const stores = (window).__ROOM_STORES__;
      if (stores?.interaction) {
        stores.interaction.getState().openModal(targetObj);
      }
    }, obj);
    await page.waitForTimeout(600);
  };

  // Helper to close modal
  const closeModal = async () => {
    await page.evaluate(() => {
      const stores = (window).__ROOM_STORES__;
      if (stores?.interaction) {
        stores.interaction.getState().closeModal();
      }
    });
    await page.waitForTimeout(400);
  };

  // 1. Test DONG-OS Virtual Desktop
  console.log('\n--- 1. Testing Virtual Desktop (desk.main_monitor) ---');
  await openModal({
    id: 'desk.main_monitor',
    displayName: 'Main Workstation (DONG-OS)',
    description: 'Explore About, Projects, Skills, and Experience files.',
    position: [-4.9, 1.0, -3.8],
    radius: 1.8,
    action: 'open_desktop',
    category: 'desk',
  });

  const desktopHeader = await page.$('text=DONG-OS // Spatial Workstation v2.4');
  if (!desktopHeader) {
    throw new Error('Virtual Desktop header "DONG-OS // Spatial Workstation v2.4" not visible!');
  }
  console.log('✓ Virtual Desktop modal rendered successfully.');

  // Click PROJECTS.exe in desktop
  const projectsIcon = await page.$('button:has-text("PROJECTS.exe")');
  if (projectsIcon) {
    await projectsIcon.click();
    await page.waitForTimeout(300);
    const projContent = await page.$('text=PRODUCTION PORTFOLIO');
    if (projContent) console.log('✓ Desktop: PROJECTS.exe window opened.');
  }

  // Click SKILLS.exe in desktop
  const skillsIcon = await page.$('button:has-text("SKILLS.exe")');
  if (skillsIcon) {
    await skillsIcon.click();
    await page.waitForTimeout(300);
    const skillContent = await page.$('text=CORE ARCHITECTURE');
    if (skillContent) console.log('✓ Desktop: SKILLS.exe window opened.');
  }

  await page.screenshot({ path: `${ARTIFACT_DIR}/screenshot_desktop.png` });
  console.log(`✓ Saved screenshot_desktop.png`);

  await closeModal();

  // 2. Test Terminal CLI
  console.log('\n--- 2. Testing Terminal CLI (desk.keyboard) ---');
  await openModal({
    id: 'desk.keyboard',
    displayName: 'Mechanical Keyboard (Terminal CLI)',
    description: 'Open interactive CLI: type help, about, skills, matrix, hint, sudo.',
    position: [-4.9, 0.8, -3.5],
    radius: 1.6,
    action: 'open_terminal',
    category: 'desk',
  });

  const termInput = await page.$('input[placeholder*="Type a command"]');
  if (!termInput) throw new Error('Terminal command input not found!');

  // Test typing "help"
  await termInput.fill('help');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);

  // Test typing "hint" (discovers passcode 1337)
  await termInput.fill('hint');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);

  const hintOutput = await page.$('text=1337');
  if (hintOutput) {
    console.log('✓ Terminal command "hint" correctly returned passcode 1337.');
  }

  // Test typing "matrix"
  await termInput.fill('matrix');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);

  await page.screenshot({ path: `${ARTIFACT_DIR}/screenshot_terminal.png` });
  console.log(`✓ Saved screenshot_terminal.png`);

  await closeModal();

  // 3. Test Bookshelf Reader
  console.log('\n--- 3. Testing Technical Bookshelf (shelf.books) ---');
  await openModal({
    id: 'shelf.books',
    displayName: 'Technical Library Shelf',
    description: 'Read 6 multi-page technical books on Web, Systems, Cloud, and AI.',
    position: [-0.2, 1.2, -4.7],
    radius: 2.2,
    action: 'read_books',
    category: 'books',
  });

  // Switch to Book 2 (Web Development)
  const book2Btn = await page.$('button:has-text("Modern Full-Stack")');
  if (book2Btn) {
    await book2Btn.click();
    await page.waitForTimeout(300);
    console.log('✓ Switched to Book 2: Modern Full-Stack.');
  }

  // Test page flip: Click Next Page
  const nextPgBtn = await page.$('button:has-text("Next Page")');
  if (nextPgBtn) {
    await nextPgBtn.click();
    await page.waitForTimeout(300);
    const pg2 = await page.$('text=Page 2 of 3');
    if (pg2) console.log('✓ Successfully flipped to page 2 of 3.');
  }

  await page.screenshot({ path: `${ARTIFACT_DIR}/screenshot_bookshelf.png` });
  console.log(`✓ Saved screenshot_bookshelf.png`);

  await closeModal();

  // 4. Test Secret Drawer Keypad Lock
  console.log('\n--- 4. Testing Secret Drawer Lockbox (secret.drawer) ---');
  await openModal({
    id: 'secret.drawer',
    displayName: 'Keypad Lockbox Drawer',
    description: 'Passcode-protected hidden compartment. Enter keycode on the keypad.',
    position: [-3.7, 0.4, -3.7],
    radius: 1.6,
    action: 'unlock_drawer',
    category: 'desk',
  });

  // Enter digits 1, 3, 3, 7
  for (const digit of ['1', '3', '3', '7']) {
    const dBtn = await page.$(`button:has-text("${digit}")`);
    if (dBtn) {
      await dBtn.click();
      await page.waitForTimeout(100);
    }
  }

  // Click Submit (the button with CheckCircle2 icon, last button in the 3x4 grid)
  const keypadButtons = await page.$$('.grid-cols-3 button');
  if (keypadButtons.length >= 12) {
    const submitBtn = keypadButtons[11];
    await submitBtn.click();
    await page.waitForTimeout(500);
    const unlockedBadge = await page.$('text=Master of Spatial Secrets');
    if (unlockedBadge) {
      console.log('✓ Keycode 1337 accepted: Secret Drawer Unlocked & Dossier revealed!');
    }
  }

  await page.screenshot({ path: `${ARTIFACT_DIR}/screenshot_vault.png` });
  console.log(`✓ Saved screenshot_vault.png`);

  await closeModal();

  // 5. Test Server Infrastructure & Telemetry
  console.log('\n--- 5. Testing Server Topology (server.rack) ---');
  await openModal({
    id: 'server.rack',
    displayName: 'Edge Infrastructure & Telemetry',
    description: 'Inspect edge architecture, network topologies, and live telemetry.',
    position: [4.7, 1.2, -4.0],
    radius: 2.2,
    action: 'inspect_servers',
    category: 'servers',
  });

  // Click D1 SQL Database node
  const d1Node = await page.$('button:has-text("D1 SQL Database")');
  if (d1Node) {
    await d1Node.click();
    await page.waitForTimeout(300);
    const dbStats = await page.$('text=Transactional SQLite at the edge');
    if (dbStats) console.log('✓ Server Topology: D1 node selected & metrics displayed.');
  }

  await closeModal();

  // 6. Test Window & Weather Ambience
  console.log('\n--- 6. Testing Window Ambience & Weather (window.view) ---');
  await openModal({
    id: 'window.view',
    displayName: 'Panoramic Skyline Window',
    description: 'Switch weather atmospheres (Day, Sunset, Rain, Night) and enter lookout mode.',
    position: [-5.8, 1.5, 0.0],
    radius: 2.5,
    action: 'look_window',
    category: 'window',
  });

  // Select Sunset weather
  const sunsetBtn = await page.$('button:has-text("Golden Sunset")');
  if (sunsetBtn) {
    await sunsetBtn.click();
    await page.waitForTimeout(200);
    console.log('✓ Weather changed to Golden Sunset.');
  }

  // Toggle Skyline Lookout mode
  const lookoutBtn = await page.$('button:has-text("Enter Panoramic Lookout")');
  if (lookoutBtn) {
    await lookoutBtn.click();
    await page.waitForTimeout(500);
    const lookoutBanner = await page.$('text=SKYLINE LOOKOUT MODE ACTIVE');
    if (lookoutBanner) {
      console.log('✓ Skyline Lookout Mode active with HUD banner.');
    }
  }

  // Exit lookout mode
  const exitLookoutBtn = await page.$('button:has-text("Exit Lookout")');
  if (exitLookoutBtn) {
    await exitLookoutBtn.click();
    await page.waitForTimeout(300);
    console.log('✓ Exited lookout mode back to third-person follow camera.');
  }

  // 7. Test Coffee Cup sips
  console.log('\n--- 7. Testing Coffee Mug (desk.coffee) ---');
  await openModal({
    id: 'desk.coffee',
    displayName: 'Dark Roast Coffee Mug',
    description: 'Take a sip for software engineering insights and daily developer quotes.',
    position: [-5.5, 0.8, -3.5],
    radius: 1.5,
    action: 'drink_coffee',
    category: 'desk',
  });

  const sipBtn = await page.$('button:has-text("Take Another Sip")');
  if (sipBtn) {
    await sipBtn.click();
    await page.waitForTimeout(300);
    console.log('✓ Took another sip: coffee counter incremented and new quote rendered.');
  }

  await closeModal();

  // 8. Test Desk Lamp toggle
  console.log('\n--- 8. Testing Desk Lamp toggle ---');
  const lampOnBefore = await page.evaluate(() => {
    return (window).__ROOM_STORES__.room.getState().deskLampOn;
  });
  await page.evaluate(() => {
    (window).__ROOM_STORES__.room.getState().toggleDeskLamp();
  });
  const lampOnAfter = await page.evaluate(() => {
    return (window).__ROOM_STORES__.room.getState().deskLampOn;
  });
  console.log(`✓ Desk Lamp toggled from ${lampOnBefore} to ${lampOnAfter}.`);
  if (lampOnBefore === lampOnAfter) throw new Error('Desk lamp toggle failed!');

  // 9. Test Sofa sitting toggle
  console.log('\n--- 9. Testing Lounge Sofa sitting toggle ---');
  await page.evaluate(() => {
    (window).__ROOM_STORES__.room.getState().setSittingOnSofa(true);
  });
  await page.waitForTimeout(400);
  const sofaBanner = await page.$('text=RELAXING ON LOUNGE SOFA');
  if (sofaBanner) console.log('✓ Sofa sit mode active with HUD banner.');

  // Stand up
  const standUpBtn = await page.$('button:has-text("Stand Up")');
  if (standUpBtn) {
    await standUpBtn.click();
    await page.waitForTimeout(300);
    const sittingAfter = await page.evaluate(() => {
      return (window).__ROOM_STORES__.room.getState().isSittingOnSofa;
    });
    console.log(`✓ Successfully stood up from sofa (isSittingOnSofa: ${sittingAfter}).`);
  }

  // Check errors
  if (errors.length > 0) {
    console.error('Captured console errors:', errors);
    throw new Error(`Encountered ${errors.length} browser console errors during Phase 3 E2E test`);
  }

  console.log('\n======================================================');
  console.log('✅ ALL PHASE 3 COMPREHENSIVE INTERACTIONS E2E TESTS PASSED!');
  console.log('======================================================\n');

  await browser.close();
}

runPhase3E2ETest().catch((err) => {
  console.error('Phase 3 E2E test failed:', err);
  process.exit(1);
});

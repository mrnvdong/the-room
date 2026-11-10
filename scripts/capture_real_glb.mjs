import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  page.on('console', msg => console.log('PAGE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('Navigating to http://localhost:4173...');
  await page.goto('http://localhost:4173');
  await page.waitForTimeout(3000);

  // 1. Capture Identity Modal Turntable Preview
  await page.screenshot({ path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/real_avatar_modal_preview.png' });
  console.log('Captured modal preview');

  // Fill in name
  const nameInput = page.locator('input[type="text"]');
  if (await nameInput.isVisible()) {
    await nameInput.fill('Alex Metaverse');
    await page.waitForTimeout(500);
  }

  // Click Enter button
  const enterBtn = page.getByRole('button', { name: /Vào tham quan|Enter/i });
  if (await enterBtn.isVisible()) {
    await enterBtn.click();
    console.log('Clicked Enter button');
    await page.waitForTimeout(3500);
  }

  // 2. Capture Avatar in the room
  await page.screenshot({ path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/real_avatar_in_room.png' });
  console.log('Captured avatar in room');

  // 3. Move character with 'w'
  console.log('Walking forward...');
  await page.keyboard.down('KeyW');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/real_avatar_walking.png' });
  await page.keyboard.up('KeyW');
  await page.waitForTimeout(1000);

  // 4. Trigger Emote/Action (press '1' for Wave / Emote)
  console.log('Triggering action Wave...');
  await page.keyboard.press('Digit1');
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/real_avatar_action.png' });

  await browser.close();
  console.log('All captures complete!');
})();

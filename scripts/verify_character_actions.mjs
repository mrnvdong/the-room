import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

// Serve dist locally on 5234
const server = http.createServer((req, res) => {
  let p = './dist' + (req.url === '/' ? '/index.html' : req.url);
  if (fs.existsSync(p) && fs.statSync(p).isFile()) {
    const ext = path.extname(p);
    const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.glb': 'model/gltf-binary' };
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    fs.createReadStream(p).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(5234, async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  await page.goto('http://localhost:5234/');
  await page.waitForTimeout(2000);
  
  // Enter room
  const enterBtn = page.getByRole('button', { name: /Enter|Vào/i });
  await enterBtn.click();
  await page.waitForTimeout(3000);

  // 1. Sitting down test (Press F)
  console.log('Testing Sit Down...');
  await page.keyboard.press('KeyF');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/test_seated_action.png' });
  
  // Stand back up
  await page.keyboard.press('KeyF');
  await page.waitForTimeout(1000);

  // 2. Open Emotes Bar (Press B)
  console.log('Testing Emotes Bar...');
  await page.keyboard.press('KeyB');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/test_emote_bar_open.png' });

  // Click first emote button in bar (e.g. Wave or Look Around)
  const firstEmote = page.locator('button:has-text("Vẫy tay chào"), button:has-text("Wave")').first();
  if (await firstEmote.isVisible()) {
    await firstEmote.click();
    console.log('Clicked Wave emote');
    await page.waitForTimeout(1200);
    await page.screenshot({ path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/test_waving_live_avatar.png' });
  }

  await browser.close();
  server.close();
  console.log('Verification finished successfully!');
});

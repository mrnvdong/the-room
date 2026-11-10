import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const server = http.createServer((req, res) => {
  let p = '.' + req.url;
  if (req.url === '/') p = './test_kin.html';
  if (req.url.startsWith('/models/')) p = './public' + req.url;
  
  if (fs.existsSync(p)) {
    const ext = path.extname(p);
    const types = { '.html': 'text/html', '.glb': 'model/gltf-binary', '.js': 'text/javascript' };
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    fs.createReadStream(p).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

await new Promise(r => server.listen(4580, r));

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script type="importmap">
    {
      "imports": {
        "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
        "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
      }
    }
  </script>
  <style>body { margin:0; background:#0b0f19; overflow:hidden; }</style>
</head>
<body>
  <div id="c" style="width:700px;height:800px"></div>
  <script type="module">
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

    const container = document.getElementById('c');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 700/800, 0.1, 100);
    camera.position.set(0, 1.4, 2.4);
    camera.lookAt(0, 1.1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(700, 800);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const dir = new THREE.DirectionalLight(0xffffff, 2.4);
    dir.position.set(3, 5, 4);
    scene.add(dir);

    const loader = new GLTFLoader();
    loader.load('/models/xbot.glb', (gltf) => {
      const root = gltf.scene;
      scene.add(root);

      const mixer = new THREE.AnimationMixer(root);
      const idle = gltf.animations.find(a => a.name === 'idle');
      mixer.clipAction(idle).play();

      const rightArm = root.getObjectByName('mixamorigRightArm');
      const rightForeArm = root.getObjectByName('mixamorigRightForeArm');
      const leftArm = root.getObjectByName('mixamorigLeftArm');

      const clock = new THREE.Clock();
      function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        mixer.update(delta);

        // Kinematic Wave override after mixer update!
        const t = clock.getElapsedTime();
        if (rightArm) {
          // Raise arm up and wave
          rightArm.rotation.x = 0.2;
          rightArm.rotation.z = -2.0 + Math.sin(t * 10) * 0.3;
          rightForeArm.rotation.x = -0.2;
          rightForeArm.rotation.z = -0.8;
        }
        if (rightForeArm) {
          rightForeArm.rotation.z = 0.6;
        }

        renderer.render(scene, camera);
      }
      animate();
    });
  </script>
</body>
</html>`;

fs.writeFileSync('test_kin.html', html);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:4580');
await page.waitForTimeout(2000);
await page.screenshot({ path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/test_wave_bone.png' });
await browser.close();
server.close();
console.log('Kinematics test complete');

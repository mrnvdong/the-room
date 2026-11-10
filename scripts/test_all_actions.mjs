import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const server = http.createServer((req, res) => {
  let p = '.' + req.url;
  if (req.url === '/') p = './test_actions.html';
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

await new Promise(r => server.listen(4581, r));

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
  <style>
    body { margin:0; background:#0b0f19; display:flex; flex-wrap:wrap; font-family:sans-serif; }
    .card { width:350px; height:450px; position:relative; }
    .title { position:absolute; top:8px; left:8px; background:rgba(0,0,0,0.7); color:#38bdf8; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold; z-index:10; }
  </style>
</head>
<body>
  <div class="card" id="c1"><div class="title">1. Wave (Vẫy tay)</div></div>
  <div class="card" id="c2"><div class="title">2. Handshake (Bắt tay)</div></div>
  <div class="card" id="c3"><div class="title">3. Drink Coffee (Uống cà phê)</div></div>
  <div class="card" id="c4"><div class="title">4. Sit Down (Ngồi ghế)</div></div>

  <script type="module">
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

    const loader = new GLTFLoader();

    function setup(id, actionType) {
      const container = document.getElementById(id);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 350/450, 0.1, 100);
      camera.position.set(0, 1.2, 2.5);
      camera.lookAt(0, 1.0, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(350, 450);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 1.4));
      const dir = new THREE.DirectionalLight(0xffffff, 2.2);
      dir.position.set(3, 5, 4);
      scene.add(dir);

      loader.load('/models/xbot.glb', (gltf) => {
        const root = gltf.scene;
        scene.add(root);

        const mixer = new THREE.AnimationMixer(root);
        const idle = gltf.animations.find(a => a.name === 'idle');
        mixer.clipAction(idle).play();

        const rightArm = root.getObjectByName('mixamorigRightArm');
        const rightForeArm = root.getObjectByName('mixamorigRightForeArm');
        const rightHand = root.getObjectByName('mixamorigRightHand');
        const leftArm = root.getObjectByName('mixamorigLeftArm');
        const head = root.getObjectByName('mixamorigHead');
        const hips = root.getObjectByName('mixamorigHips');
        const leftUpLeg = root.getObjectByName('mixamorigLeftUpLeg');
        const rightUpLeg = root.getObjectByName('mixamorigRightUpLeg');
        const leftLeg = root.getObjectByName('mixamorigLeftLeg');
        const rightLeg = root.getObjectByName('mixamorigRightLeg');

        // Add Coffee Prop if action is coffee
        if (actionType === 'coffee' && rightHand) {
          const cupGeo = new THREE.CylinderGeometry(0.04, 0.03, 0.08, 16);
          const cupMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
          const cup = new THREE.Mesh(cupGeo, cupMat);
          cup.scale.setScalar(100);
          cup.position.set(0, 0.05, 0.02);
          rightHand.add(cup);
        }

        const clock = new THREE.Clock();
        function animate() {
          requestAnimationFrame(animate);
          const delta = clock.getDelta();
          mixer.update(delta);
          const t = clock.getElapsedTime();

          if (actionType === 'wave') {
            if (rightArm) rightArm.rotation.set(0.1, 0, -2.1 + Math.sin(t * 10) * 0.35);
            if (rightForeArm) rightForeArm.rotation.set(-0.2, 0, -0.7);
            if (head) head.rotation.z = Math.sin(t * 5) * 0.1;
          } else if (actionType === 'handshake') {
            if (rightArm) rightArm.rotation.set(-1.4, -0.2, 0.2 + Math.sin(t * 10) * 0.12);
            if (rightForeArm) rightForeArm.rotation.set(0, 0.2, 0);
          } else if (actionType === 'coffee') {
            const sip = Math.sin(t * 3);
            if (rightArm) rightArm.rotation.set(-1.6 + sip * 0.3, -0.4, 0.3);
            if (rightForeArm) rightForeArm.rotation.set(-0.8, 0, 0);
            if (head) head.rotation.x = -sip * 0.15;
          } else if (actionType === 'sit') {
            if (hips) { hips.position.y = 60; hips.position.z = -5; }
            if (leftUpLeg) leftUpLeg.rotation.set(-Math.PI / 2.05, 0, -0.05);
            if (rightUpLeg) rightUpLeg.rotation.set(-Math.PI / 2.05, 0, 0.05);
            if (leftLeg) leftLeg.rotation.set(Math.PI / 2.05, 0, 0);
            if (rightLeg) rightLeg.rotation.set(Math.PI / 2.05, 0, 0);
            if (leftArm) leftArm.rotation.set(0.2, 0, 1.35);
            if (rightArm) rightArm.rotation.set(0.2, 0, -1.35);
          }

          renderer.render(scene, camera);
        }
        animate();
      });
    }

    setup('c1', 'wave');
    setup('c2', 'handshake');
    setup('c3', 'coffee');
    setup('c4', 'sit');
  </script>
</body>
</html>`;

fs.writeFileSync('test_actions.html', html);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:4581');
await page.waitForTimeout(2500);
await page.screenshot({ path: '/Users/dongnv/.gemini/antigravity-cli/brain/d6604972-c6ac-499d-bfae-a57868b00ffa/all_actions_test.png' });
await browser.close();
server.close();
console.log('Done all actions test');

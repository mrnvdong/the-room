# ASSET_GUIDE.md — 3D Asset, Geometry & Material Guidelines

## 1. Modeling Principles
- **Aesthetic**: Cozy, modern minimalist architectural interior with tactile materials (dark walnut wood, acoustic slats, matte metals, soft fabrics).
- **Asset Strategy**:
  - Current implementation uses optimized procedural Three.js primitives (`<boxGeometry>`, `<cylinderGeometry>`, `<planeGeometry>`) assembled into modular components.
  - Future Blender GLB assets must adhere to strict polygon and draw call budgets.

---

## 2. Technical Asset Budgets

| Asset Category | Max Poly Count | Texture Resolution | Material Types |
|---|---|---|---|
| Room Shell (Floor/Walls/Ceiling) | 500 tris | 1024 x 1024 or Procedural | MeshStandardMaterial |
| Desk Set & Monitors | 2,500 tris | Shared 1024x1024 Atlas | Metalness/Roughness PBR |
| Bookshelf & Books | 1,800 tris | Shared Atlas | Matte non-reflective |
| Server Cabinet | 1,200 tris | Procedural emissive | Emissive LED strips |
| Sectional Sofa & Lounge | 2,000 tris | Fabric roughness (0.8) | Diffuse only |
| Avatar Model | 1,500 tris | Solid vertex colors | Stylized untextured or simple PBR |
| Total Scene Target | < 15,000 tris | < 8 MB total VRAM | < 45 Draw Calls |

---

## 3. Lighting & Performance Optimization
1. **Dynamic Shadow Management**:
   - Only 1 primary directional light casts real-time shadows (from window).
   - Shadow map resolution scales dynamically based on `qualityPreset`:
     - Low: Shadows disabled, single ambient light.
     - Medium: 512x512 shadow map.
     - High: 2048x2048 shadow map with PCFSoftShadowMap.
2. **Material Sharing**:
   - Colors and materials reuse Three.js instances to avoid redundant GPU state changes.
3. **Draco & Meshopt Compression**:
   - Any external GLB models imported in production should be compressed via `@gltf-transform/cli` with Draco or Meshopt.

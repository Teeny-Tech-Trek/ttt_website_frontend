import { useEffect, RefObject } from 'react';
import * as THREE from 'three';
import { OrbitDot, NeuralMat, Streamer } from '../types/hero.types';

function brainDisplace(x: number, y: number, z: number, r: number): number {
  const nx = x / r, ny = y / r, nz = z / r;
  let d = 0;
  // Primary gyri (large folds)
  d += Math.sin(nx * 6 + ny * 4.5) * Math.cos(nz * 5.5) * 0.16;
  d += Math.sin(nx * 9 - nz * 7) * Math.cos(ny * 8) * 0.09;
  // Secondary sulci (smaller creases)
  d += Math.cos(nx * 14 + ny * 11) * Math.sin(nz * 12) * 0.05;
  d += Math.sin(nx * 19 - ny * 16 + nz * 17) * 0.028;
  // Micro-texture
  d += Math.sin(nx * 28 + nz * 25) * Math.cos(ny * 24) * 0.014;
  // Sagittal fissure
  d -= Math.exp(-nx * nx * 30) * 0.15;
  // Flatten base
  d += Math.max(0, -ny - 0.3) * -0.18;
  // Frontal lobe bulge
  d += Math.max(0, nz) * 0.07;
  // Temporal lobes
  d += Math.max(0, Math.abs(nx) - 0.5) * 0.06;
  return d;
}

function randSpherePoint(r: number): THREE.Vector3 {
  const t = Math.random() * Math.PI * 2;
  const p = Math.acos(2 * Math.random() - 1);
  return new THREE.Vector3(
    r * Math.sin(p) * Math.cos(t),
    r * Math.cos(p),
    r * Math.sin(p) * Math.sin(t)
  );
}

function makeRing(
  radius: number,
  tube: number,
  tx: number,
  ty: number,
  col: number,
  op: number
): THREE.Mesh {
  const g = new THREE.TorusGeometry(radius, tube, 8, 128);
  const m = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op });
  const mesh = new THREE.Mesh(g, m);
  mesh.rotation.x = tx;
  mesh.rotation.y = ty;
  return mesh;
}

export function useBrainScene(
  canvasRef: RefObject<HTMLCanvasElement>,
  wrapperRef: RefObject<HTMLDivElement>
): void {
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const W = wrapper.clientWidth;
    const H = wrapper.clientHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 200);
    camera.position.set(0, 0.4, 6.8);

    // Lighting
    scene.add(new THREE.AmbientLight(0x000a22, 1.5));
    const dL = new THREE.DirectionalLight(0x3377ff, 2.5);
    dL.position.set(4, 6, 4);
    scene.add(dL);
    const pL1 = new THREE.PointLight(0x0055ff, 5, 18);
    pL1.position.set(-4, 2, 3);
    scene.add(pL1);
    const pL2 = new THREE.PointLight(0x00ccff, 4, 18);
    pL2.position.set(4, -1, 3);
    scene.add(pL2);
    const pL3 = new THREE.PointLight(0x0033aa, 3, 15);
    pL3.position.set(0, -4, 1);
    scene.add(pL3);
    const cL = new THREE.PointLight(0x00aaff, 7, 12);
    cL.position.set(0, 0, 0);
    scene.add(cL);

    // ── BRAIN GEOMETRY ──────────────────────────────────────────────
    const brainGeo = new THREE.IcosahedronGeometry(1.55, 6);
    const bArr = brainGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < bArr.length; i += 3) {
      const x = bArr[i], y = bArr[i + 1], z = bArr[i + 2];
      const r = Math.sqrt(x * x + y * y + z * z);
      const dn = brainDisplace(x, y, z, r);
      const nr = (r + dn) / r;
      bArr[i] *= nr; bArr[i + 1] *= nr; bArr[i + 2] *= nr;
    }
    brainGeo.computeVertexNormals();

    // Vertex colours — ridges = bright cyan, valleys = dark
    const vertCol = new Float32Array(bArr.length);
    for (let i = 0; i < bArr.length; i += 3) {
      const x = bArr[i], y = bArr[i + 1], z = bArr[i + 2];
      const r = Math.sqrt(x * x + y * y + z * z);
      const bright = Math.min(1, (r - 1.4) / 0.35);
      vertCol[i] = bright * 0.05;
      vertCol[i + 1] = bright * 0.15;
      vertCol[i + 2] = 0.2 + bright * 0.6;
    }
    brainGeo.setAttribute('color', new THREE.BufferAttribute(vertCol, 3));

    const brainMat = new THREE.MeshPhongMaterial({
      vertexColors: true,
      emissive: new THREE.Color(0x001155),
      emissiveIntensity: 0.55,
      specular: new THREE.Color(0x00ccff),
      shininess: 70,
      transparent: true,
      opacity: 0.96,
    });
    const brainMesh = new THREE.Mesh(brainGeo, brainMat);
    scene.add(brainMesh);

    // Outer glow shell
    scene.add(
      new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.75, 3),
        new THREE.MeshPhongMaterial({
          color: 0x0033aa,
          emissive: new THREE.Color(0x001144),
          emissiveIntensity: 0.4,
          transparent: true,
          opacity: 0.1,
          side: THREE.BackSide,
        })
      )
    );

    // Wireframe overlay
    const wireMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.57, 5),
      new THREE.MeshBasicMaterial({ color: 0x0088ff, wireframe: true, transparent: true, opacity: 0.04 })
    );
    scene.add(wireMesh);

    // ── NEURAL PATHWAYS ─────────────────────────────────────────────
    const neuralGroup = new THREE.Group();
    const neuralMats: NeuralMat[] = [];
    for (let i = 0; i < 90; i++) {
      const p1 = randSpherePoint(1.57);
      const ctrl = p1.clone()
        .add(randSpherePoint(1.57))
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(1.95 + Math.random() * 0.5);
      const p2 = randSpherePoint(1.57);
      const curve = new THREE.QuadraticBezierCurve3(p1, ctrl, p2);
      const pts = curve.getPoints(32);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const base = 0.12 + Math.random() * 0.5;
      const col = Math.random() > 0.45 ? 0x00ddff : 0x0055ff;
      const mat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: base });
      neuralMats.push({ mat, base, phase: Math.random() * Math.PI * 2 });
      neuralGroup.add(new THREE.Line(geo, mat));
    }
    scene.add(neuralGroup);

    // ── SYNAPTIC NODES ──────────────────────────────────────────────
    const nodeGroup = new THREE.Group();
    for (let i = 0; i < 50; i++) {
      const pt = randSpherePoint(1.58);
      const sz = 0.022 + Math.random() * 0.022;
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(sz, 8, 8),
        new THREE.MeshBasicMaterial({
          color: Math.random() > 0.5 ? 0x00ffee : 0x4488ff,
          transparent: true,
          opacity: 0.95,
        })
      );
      mesh.position.copy(pt);
      const sp = new THREE.Sprite(
        new THREE.SpriteMaterial({ color: 0x00aaff, transparent: true, opacity: 0.3 })
      );
      sp.scale.setScalar(0.2);
      mesh.add(sp);
      nodeGroup.add(mesh);
    }
    scene.add(nodeGroup);

    // ── DATA STREAMERS ──────────────────────────────────────────────
    const streamers: Streamer[] = [];
    for (let i = 0; i < 20; i++) {
      const p1 = randSpherePoint(1.57);
      const ctrl = p1.clone()
        .add(randSpherePoint(1.57))
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(1.9 + Math.random() * 0.4);
      const p2 = randSpherePoint(1.57);
      const curve = new THREE.QuadraticBezierCurve3(p1, ctrl, p2);
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 6, 6),
        new THREE.MeshBasicMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.9 })
      );
      scene.add(mesh);
      streamers.push({ mesh, curve, t: Math.random(), spd: 0.003 + Math.random() * 0.005 });
    }

    // ── ORBIT RINGS ──────────────────────────────────────────────────
    const ring1 = makeRing(2.2, 0.012, Math.PI / 2.4, 0.25, 0x0077ff, 0.55);
    const ring2 = makeRing(2.7, 0.009, Math.PI / 5.5, -0.45, 0x00aaff, 0.3);
    const ring3 = makeRing(3.1, 0.007, Math.PI * 0.44, 0.75, 0x0044bb, 0.18);
    scene.add(ring1, ring2, ring3);

    // ── ORBIT DOTS ───────────────────────────────────────────────────
    const orbitDots: OrbitDot[] = [];
    const addDot = (r: number, spd: number, col: number, tx: number) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 8, 8),
        new THREE.MeshBasicMaterial({ color: col })
      );
      const sp = new THREE.Sprite(
        new THREE.SpriteMaterial({ color: col, transparent: true, opacity: 0.4 })
      );
      sp.scale.setScalar(0.3);
      mesh.add(sp);
      scene.add(mesh);
      orbitDots.push({ mesh, r, spd, ang: Math.random() * Math.PI * 2, tx });
    };
    addDot(2.2, 0.65, 0x00eeff, Math.PI / 2.4);
    addDot(2.2, -0.85, 0xffffff, Math.PI / 2.4);
    addDot(2.7, 0.42, 0x0066ff, Math.PI / 5.5);
    addDot(3.1, 0.28, 0x00aaff, Math.PI * 0.44);
    addDot(3.1, -0.48, 0x00ffcc, Math.PI * 0.44);

    // Floating ambient particles
    const fGeo = new THREE.BufferGeometry();
    const fPos = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const r = 1.85 + Math.random() * 3;
      const t = Math.random() * Math.PI * 2;
      const p = Math.random() * Math.PI;
      fPos[i * 3] = r * Math.sin(p) * Math.cos(t);
      fPos[i * 3 + 1] = r * Math.cos(p) * 0.55;
      fPos[i * 3 + 2] = r * Math.sin(p) * Math.sin(t);
    }
    fGeo.setAttribute('position', new THREE.BufferAttribute(fPos, 3));
    scene.add(new THREE.Points(fGeo, new THREE.PointsMaterial({ size: 0.032, color: 0x3399ff, transparent: true, opacity: 0.6 })));

    // Platform glow ring
    const platMesh = new THREE.Mesh(
      new THREE.TorusGeometry(2.25, 0.07, 8, 80),
      new THREE.MeshBasicMaterial({ color: 0x0088ff, transparent: true, opacity: 0.35 })
    );
    platMesh.rotation.x = Math.PI / 2;
    platMesh.position.y = -2.15;
    scene.add(platMesh);
    const platMat = platMesh.material as THREE.MeshBasicMaterial;

    let mx = 0, my = 0, time = 0, animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      const W2 = wrapper.clientWidth;
      const H2 = wrapper.clientHeight;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    };

    const loop = () => {
      animId = requestAnimationFrame(loop);
      time += 0.011;

      // Brain follows mouse
      brainMesh.rotation.y += (mx * 0.45 - brainMesh.rotation.y) * 0.04;
      brainMesh.rotation.x += (my * 0.2 - brainMesh.rotation.x) * 0.04;
      wireMesh.rotation.y = brainMesh.rotation.y + time * 0.05;
      wireMesh.rotation.x = brainMesh.rotation.x;
      neuralGroup.rotation.copy(brainMesh.rotation);
      nodeGroup.rotation.copy(brainMesh.rotation);

      // Breathe
      const s = 1 + Math.sin(time * 0.9) * 0.012;
      brainMesh.scale.setScalar(s);

      // Neural pulse
      neuralMats.forEach(({ mat, base, phase }) => {
        mat.opacity = base * (0.55 + 0.45 * Math.sin(time * 1.6 + phase));
      });

      // Streamers
      streamers.forEach((d) => {
        d.t = (d.t + d.spd) % 1;
        const pt = d.curve.getPoint(d.t);
        pt.applyEuler(new THREE.Euler(brainMesh.rotation.x, brainMesh.rotation.y, 0));
        d.mesh.position.copy(pt);
      });

      // Rings spin
      ring1.rotation.z = time * 0.38;
      ring2.rotation.z = -time * 0.22;
      ring3.rotation.z = time * 0.13;

      // Orbit dots
      orbitDots.forEach((d) => {
        d.ang += d.spd * 0.011;
        d.mesh.position.set(
          d.r * Math.cos(d.ang),
          d.r * Math.sin(d.ang) * Math.sin(d.tx) * 0.55,
          d.r * Math.sin(d.ang) * Math.cos(d.tx) * 0.8
        );
      });

      platMat.opacity = 0.27 + Math.sin(time * 1.4) * 0.12;
      cL.intensity = 6 + Math.sin(time * 2.2) * 2.5;

      renderer.render(scene, camera);
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);
    loop();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [canvasRef, wrapperRef]);
}

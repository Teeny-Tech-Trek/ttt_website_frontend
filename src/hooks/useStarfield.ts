import { useEffect, RefObject } from 'react';
import * as THREE from 'three';

export function useStarfield(canvasRef: RefObject<HTMLCanvasElement>): void {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 400;

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const starCount = 5000;
    const starPos = new Float32Array(starCount * 3);
    const starCol = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 2000;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 1500;
      const b = 0.5 + Math.random() * 0.5;
      starCol[i * 3] = b * 0.5;
      starCol[i * 3 + 1] = b * 0.75;
      starCol[i * 3 + 2] = 1;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ size: 1.1, vertexColors: true, transparent: true, opacity: 0.9 })
    );
    scene.add(stars);

    // Nebula cloud
    const nebGeo = new THREE.BufferGeometry();
    const nebPos = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.random() * Math.PI;
      const r = 150 + Math.random() * 350;
      nebPos[i * 3] = r * Math.sin(p) * Math.cos(t);
      nebPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.35;
      nebPos[i * 3 + 2] = r * Math.cos(p);
    }
    nebGeo.setAttribute('position', new THREE.BufferAttribute(nebPos, 3));
    scene.add(
      new THREE.Points(
        nebGeo,
        new THREE.PointsMaterial({ size: 2.5, color: 0x0044cc, transparent: true, opacity: 0.1 })
      )
    );

    let mx = 0;
    let my = 0;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 0.4;
      my = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const loop = () => {
      animId = requestAnimationFrame(loop);
      camera.rotation.x += (my - camera.rotation.x) * 0.04;
      camera.rotation.y += (mx - camera.rotation.y) * 0.04;
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
  }, [canvasRef]);
}

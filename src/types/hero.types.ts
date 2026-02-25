import * as THREE from 'three';

export interface OrbitDot {
  mesh: THREE.Mesh;
  r: number;
  spd: number;
  ang: number;
  tx: number;
}

export interface NeuralMat {
  mat: THREE.LineBasicMaterial;
  base: number;
  phase: number;
}

export interface Streamer {
  mesh: THREE.Mesh;
  curve: THREE.QuadraticBezierCurve3;
  t: number;
  spd: number;
}

export interface StatItem {
  target: number;
  unit: string;
  label: string;
}

export interface CardItem {
  icon: string;
  title: string;
  description: string;
  tag: string;
  side: 'left' | 'right';
}

export interface OrbitBadge {
  label: string;
  style: React.CSSProperties;
}

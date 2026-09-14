"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, PerspectiveCamera, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function DataCore({ systemMode = false }: { systemMode?: boolean }) {
  const core = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!core.current || !ring.current) return;
    core.current.rotation.y += delta * 0.12;
    core.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
    ring.current.rotation.z += delta * (systemMode ? 0.8 : 0.32);
  });

  return (
    <group ref={core}>
      <mesh>
        <icosahedronGeometry args={[0.85, 2]} />
        <meshStandardMaterial color={systemMode ? "#f4b860" : "#72e5e0"} emissive={systemMode ? "#5b3214" : "#164d55"} emissiveIntensity={2.2} roughness={0.28} metalness={0.72} wireframe />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.38, 0.008, 8, 128]} />
        <meshBasicMaterial color={systemMode ? "#f4b860" : "#72e5e0"} transparent opacity={0.8} />
      </mesh>
      <mesh rotation={[0.4, 0.2, 0.7]}>
        <torusGeometry args={[1.7, 0.006, 8, 128]} />
        <meshBasicMaterial color="#496aa4" transparent opacity={0.7} />
      </mesh>
      <pointLight color={systemMode ? "#f4b860" : "#72e5e0"} intensity={3} distance={6} />
    </group>
  );
}

function Network({ systemMode = false }: { systemMode?: boolean }) {
  const points = useMemo(() => Array.from({ length: 38 }, (_, index) => {
    const angle = (index / 38) * Math.PI * 2;
    const radius = 2.5 + (index % 4) * 0.42;
    return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle * 1.7) * 1.6, Math.sin(angle) * radius);
  }), []);
  const connections = useMemo(() => points.flatMap((point, index) => {
    const next = points[(index + 3) % points.length];
    return [[point, next]];
  }), [points]);

  return (
    <group rotation={[0.12, 0, 0]}>
      {points.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[index % 5 === 0 ? 0.045 : 0.022, 8, 8]} />
          <meshBasicMaterial color={index % 5 === 0 ? (systemMode ? "#f4b860" : "#72e5e0") : "#496aa4"} />
        </mesh>
      ))}
      {connections.map(([start, end], index) => <Line key={index} points={[start, end]} color={systemMode ? "#7c5b31" : "#244b6d"} transparent opacity={0.32} lineWidth={0.45} />)}
    </group>
  );
}

export default function DataUniverse({ systemMode = false }: { systemMode?: boolean }) {
  return (
    <div className="universe-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0.6, 8.5]} fov={42} />
        <color attach="background" args={["#070b13"]} />
        <fog attach="fog" args={["#070b13", 5, 14]} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 4, 3]} intensity={1.4} color="#d8e6ff" />
        <Stars radius={16} depth={10} count={systemMode ? 500 : 260} factor={1.4} saturation={0.3} fade speed={0.25} />
        <Float speed={0.7} rotationIntensity={0.18} floatIntensity={0.25}>
          <DataCore systemMode={systemMode} />
        </Float>
        <Network systemMode={systemMode} />
      </Canvas>
    </div>
  );
}
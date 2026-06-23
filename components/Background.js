'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef } from 'react';

function RotatingStars() {
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      // Base rotation
      ref.current.rotation.x -= delta / 30;
      ref.current.rotation.y -= delta / 40;

      // Scroll-based interaction (parallax & speed up)
      const scrollY = window.scrollY;
      ref.current.rotation.z = scrollY * 0.0002;
      ref.current.position.y = -scrollY * 0.0005;
    }
  });

  return (
    <group ref={ref}>
      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

export default function Background() {
  return (
    <div className="background-container">
      {/* 2. Animated Glowing Orbs (Aurora Effect) */}
      <div className="background-orb background-orb--1"></div>
      <div className="background-orb background-orb--2"></div>
      <div className="background-orb background-orb--3"></div>

      {/* 1. Subtle Animated Grid */}
      <div className="background-grid"></div>

      {/* 3. 3D Particles */}
      <div className="background-particles">
        <Canvas
          camera={{ position: [0, 0, 1] }}
          dpr={[1, 1]}
          gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}
        >
          <RotatingStars />
        </Canvas>
      </div>
    </div>
  );
}

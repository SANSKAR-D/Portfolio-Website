'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Base tilt in radians — tips the model forward so the top face is visible
const BASE_X = -0.3;

function GamingSetup({ mousePos }) {
    const group = useRef();
    const { scene } = useGLTF('/gaming_setup.glb');

    useFrame((state, delta) => {
        if (!group.current) return;

        // Target rotations: Y from horizontal mouse, X from vertical + base tilt
        const targetY = mousePos.current.x * 0.5;
        const targetX = BASE_X + (-mousePos.current.y * 0.4);

        // Smooth lerp toward target
        group.current.rotation.y = THREE.MathUtils.lerp(
            group.current.rotation.y,
            targetY,
            delta * 3
        );
        group.current.rotation.x = THREE.MathUtils.lerp(
            group.current.rotation.x,
            targetX,
            delta * 3
        );

        // Floating animation — bob up/down + gentle wobble
        group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
        group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    });

    return (
        <group ref={group}>
            <primitive
                object={scene}
                scale={80.0}
                position={[3.0, -2.2, 0]}
            />
        </group>
    );
}

function LoadingFallback() {
    return (
        <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#818cf8" wireframe />
        </mesh>
    );
}

export default function Model3D({ mousePos }) {
    return (
        <Canvas
            camera={{ position: [0, 8, 8], fov: 80 }}
            style={{ width: '100%', height: '100%' }}
            gl={{ antialias: true, alpha: true }}
        >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
            <directionalLight position={[-5, 2, -5]} intensity={0.4} color="#818cf8" />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#22d3ee" />

            <Suspense fallback={<LoadingFallback />}>
                <GamingSetup mousePos={mousePos} />
                <Environment preset="city" />
                <ContactShadows
                    position={[0, -1.4, 0]}
                    opacity={0.3}
                    scale={8}
                    blur={2}
                    far={4}
                />
            </Suspense>
        </Canvas>
    );
}

useGLTF.preload('/gaming_setup.glb');

'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { MathUtils } from 'three';

const BASE_X = -0.3;

function GamingSetup({ mousePos }) {
    const group = useRef();
    const { scene } = useGLTF('/gaming_setup.glb', true);

    useFrame((state, delta) => {
        if (!group.current) return;

        const targetY = mousePos.current.x * 0.5;
        const targetX = BASE_X + (-mousePos.current.y * 0.4);

        group.current.rotation.y = MathUtils.lerp(
            group.current.rotation.y,
            targetY,
            delta * 3
        );
        group.current.rotation.x = MathUtils.lerp(
            group.current.rotation.x,
            targetX,
            delta * 3
        );

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
            <sphereGeometry args={[0.5, 12, 12]} />
            <meshStandardMaterial color="#818cf8" wireframe />
        </mesh>
    );
}

export default function Model3D({ mousePos }) {
    return (
        <Canvas
            camera={{ position: [0, 8, 8], fov: 80 }}
            style={{ width: '100%', height: '100%' }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            performance={{ min: 0.5 }}
        >
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1.4} />
            <directionalLight position={[-5, 2, -5]} intensity={0.4} color="#818cf8" />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#22d3ee" />

            <Suspense fallback={<LoadingFallback />}>
                <GamingSetup mousePos={mousePos} />
            </Suspense>
        </Canvas>
    );
}

useGLTF.preload('/gaming_setup.glb', true);

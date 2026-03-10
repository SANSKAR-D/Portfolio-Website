'use client';

import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
    SiCplusplus, SiC, SiPython, SiNodedotjs,
    SiExpress, SiJavascript
} from 'react-icons/si';
import { HiDownload, HiArrowDown } from 'react-icons/hi';

// Dynamically import the 3D model to avoid SSR issues with WebGL
const Model3D = dynamic(() => import('./Model3D'), { ssr: false });

const techStack = [
    { icon: <SiCplusplus />, name: 'C++' },
    { icon: <SiC />, name: 'C' },
    { icon: <SiPython />, name: 'Python' },
    { icon: <SiNodedotjs />, name: 'Node.js' },
    { icon: <SiExpress />, name: 'Express.js' },
    { icon: <SiJavascript />, name: 'JavaScript' },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.3 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Hero() {
    const modelRef = useRef(null);
    // Use a ref for mouse position to avoid re-renders
    const mousePos = useRef({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e) => {
        const rect = modelRef.current?.getBoundingClientRect();
        if (!rect) return;
        // Normalize to -1 ... +1 within the model container only
        mousePos.current = {
            x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
            y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
        };
    }, []);

    const handleMouseLeave = useCallback(() => {
        mousePos.current = { x: 0, y: 0 };
    }, []);

    return (
        <section className="hero" id="hero">
            {/* Ambient Glow Blobs */}
            <div className="hero__blob hero__blob--1" />
            <div className="hero__blob hero__blob--2" />
            <div className="hero__blob hero__blob--3" />

            {/* Left: Text Content */}
            <motion.div
                className="hero__content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Avatar photo placeholder — above the name */}
                <motion.div className="hero__avatar" variants={itemVariants}>
                    <div className="hero__avatar-ring" />
                    <div className="hero__avatar-frame">
                        <div className="hero__avatar-inner">
                            <span className="hero__avatar-label">Your Photo</span>
                        </div>
                    </div>
                </motion.div>

                <motion.p className="hero__greeting" variants={itemVariants}>
                    Hey there, I&apos;m
                </motion.p>

                <motion.h1 className="hero__name" variants={itemVariants}>
                    Sanskar <span className="gradient-text">Gupta</span>
                </motion.h1>

                <motion.p className="hero__tagline" variants={itemVariants}>
                    Backend Developer &amp; Competitive Programmer
                </motion.p>

                <motion.p className="hero__description" variants={itemVariants}>
                    I build performant web applications and love solving algorithmic problems.
                    Passionate about clean code, scalable architecture, and open-source.
                </motion.p>

                <motion.div className="hero__ctas" variants={itemVariants}>
                    <a href="/resume.pdf" className="btn btn--primary" download>
                        <HiDownload size={18} />
                        Download Resume
                    </a>
                    <a href="#projects" className="btn btn--secondary">
                        <HiArrowDown size={18} />
                        View Projects
                    </a>
                </motion.div>

                <motion.div className="hero__tech" variants={itemVariants}>
                    <p className="hero__tech-label">Tech Stack</p>
                    <div className="hero__tech-icons">
                        {techStack.map((tech) => (
                            <motion.div
                                key={tech.name}
                                className="hero__tech-icon"
                                title={tech.name}
                                whileHover={{ y: -6, scale: 1.15 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            >
                                {tech.icon}
                                <span className="hero__tech-name">{tech.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Right: 3D Model — mouse tracking scoped to this container only */}
            <motion.div
                className="hero__model"
                ref={modelRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
                <div className="hero__model-glow" />
                <Model3D mousePos={mousePos} />
            </motion.div>
        </section>
    );
}

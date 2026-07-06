'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const highlights = [
    { value: '800+', label: 'Problems Solved' },
    { value: '4+', label: 'Projects Built' },
    { value: '1+', label: 'Year Coding' },
    { value: '2', label: 'Hackathons Participated' },
];

export default function About() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="section" id="about">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section__heading">About Me</h2>
                <p className="section__subheading">
                    A little about who I am and what I work with.
                </p>
            </motion.div>

            <div className={`about__grid ${isExpanded ? 'about__grid--expanded' : ''}`}>
                {/* Left: Text Content */}
                <motion.div 
                    className="about__content"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <p className="about__text">
                        Hi, I&apos;m <strong>Sanskar Gupta</strong>, a Computer Science & Engineering student at <strong>Motilal Nehru National Institute of Technology (MNNIT) Allahabad</strong> (Class of 2029). I specialize in building intelligent AI systems, custom backend architectures, and solving complex algorithmic challenges.
                    </p>
                    
                    <AnimatePresence initial={false}>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <p className="about__text" style={{ marginTop: '1rem' }}>
                                    My engineering journey is driven by a deep passion for problem-solving. As a competitive programmer, I have earned the <strong>Knight badge on LeetCode</strong> (solving over 800+ DSA questions), achieved a <strong>2-Star rating on CodeChef</strong>, and rank as a <strong>Pupil on Codeforces</strong>. This rigorous training shapes my analytical mindset and helps me write highly optimized, clean code.
                                </p>
                                <p className="about__text" style={{ marginTop: '1rem' }}>
                                    Beyond competitive coding, I love developing end-to-end applications. From designing isolated Docker sandboxes for custom code execution engines in projects like <em>KnightCode</em> to creating interactive 3D landing pages using Three.js and Monaco Editor, I enjoy tackling complex systems and UI styling.
                                </p>
                                <p className="about__text" style={{ marginTop: '1rem' }}>
                                    Currently, my primary focus lies in the field of Artificial Intelligence and Machine Learning. I enjoy developing local RAG pipelines, working with agentic LLM structures using LangChain, and orchestrating vector databases like ChromaDB. I am also fascinated by hardware-level integration, having secured <strong>3rd Position in the Robomania Trail Blitz</strong> robotics competition at MNNIT.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div style={{ marginTop: 'var(--space-md)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)} 
                            className="btn btn--secondary"
                            style={{ cursor: 'pointer' }}
                        >
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                        <a href="#contact" className="btn btn--primary">
                            Get In Touch
                        </a>
                    </div>
                </motion.div>

                {/* Right: Stats Grid */}
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={isExpanded ? 'expanded' : 'collapsed'}
                        className={`about__stats-grid ${isExpanded ? 'about__stats-grid--expanded' : ''}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.25 }}
                    >
                        {highlights.map((stat, i) => (
                            <div key={i} className="glass-card about__stat-card">
                                <div className="about__stat-value">{stat.value}</div>
                                <div className="about__stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

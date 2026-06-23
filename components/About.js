'use client';

import { motion } from 'framer-motion';

const highlights = [
    { value: '500+', label: 'Problems Solved' },
    { value: '10+', label: 'Projects Built' },
    { value: '2+', label: 'Years Coding' },
    { value: '1st', label: 'Hackathon Prize' },
];

export default function About() {
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

            <div className="about__grid">
                {/* Left: Text Content */}
                <motion.div 
                    className="about__content"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <p className="about__text">
                        Hi, I&apos;m <strong>Sanskar Gupta</strong> — a passionate AI Engineer
                        and Competitive Programmer. I enjoy designing intelligent, scalable systems
                        and love the intellectual challenge of algorithmic problem-solving.
                    </p>
                    <p className="about__text">
                        I&apos;m currently pursuing my studies in Computer Science, building a solid
                        foundation in data structures, algorithms, and AI systems. Outside
                        of coursework, I actively participate in coding contests on platforms like
                        Codeforces and LeetCode.
                    </p>
                    <p className="about__text">
                        My primary focus these days is building robust AI architectures using LLMs, Langchain, Langgraph, RAG, and FastAPI, while continuing to level up my problem-solving skills.
                    </p>
                    <div style={{ marginTop: 'var(--space-md)' }}>
                        <a href="#contact" className="btn btn--primary">
                            Get In Touch
                        </a>
                    </div>
                </motion.div>

                {/* Right: Stats Grid */}
                <motion.div 
                    className="about__stats-grid"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {highlights.map((stat, i) => (
                        <div key={i} className="glass-card about__stat-card">
                            <div className="about__stat-value">{stat.value}</div>
                            <div className="about__stat-label">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

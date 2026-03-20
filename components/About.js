'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    SiCplusplus, SiC, SiPython, SiJavascript, SiNodedotjs,
    SiExpress, SiMysql, SiMongodb, SiGit, SiLinux, SiPostman,
    SiHtml5, SiCss
} from 'react-icons/si';
import { FaJava, FaCode, FaServer, FaDatabase, FaBrain, FaLaptopCode, FaCogs } from 'react-icons/fa';

const skillCategories = [
    {
        label: 'Languages',
        icon: <FaCode />,
        skills: [
            { name: 'C++', icon: <SiCplusplus /> },
            { name: 'C', icon: <SiC /> },
            { name: 'Python', icon: <SiPython /> },
            { name: 'JavaScript', icon: <SiJavascript /> },
            { name: 'Java', icon: <FaJava /> },
            { name: 'HTML', icon: <SiHtml5 /> },
            { name: 'CSS', icon: <SiCss /> },
        ],
    },
    {
        label: 'Backend & Web',
        icon: <FaServer />,
        skills: [
            { name: 'Node.js', icon: <SiNodedotjs /> },
            { name: 'Express.js', icon: <SiExpress /> },
            { name: 'REST APIs', icon: <FaServer /> },
        ],
    },
    {
        label: 'Databases',
        icon: <FaDatabase />,
        skills: [
            { name: 'MySQL', icon: <SiMysql /> },
            { name: 'MongoDB', icon: <SiMongodb /> },
        ],
    },
    {
        label: 'Tools & OS',
        icon: <SiGit />,
        skills: [
            { name: 'Git', icon: <SiGit /> },
            { name: 'Linux', icon: <SiLinux /> },
            { name: 'Postman', icon: <SiPostman /> },
        ],
    },
];

const highlights = [
    { value: '500+', label: 'Problems Solved' },
    { value: '10+', label: 'Projects Built' },
    { value: '2+', label: 'Years Coding' },
];

const CardOverlay = ({ index, scrollYProgress, title, logo, children }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // 4 cards in total => center scroll progress values: 0, 0.33, 0.66, 1
    const center = index / 3;
    
    // Closer spacing: offsets of 70vw instead of 100vw
    const input = [
        center - 3/3, center - 2/3, center - 1/3, 
        center, 
        center + 1/3, center + 2/3, center + 3/3
    ];
    
    const xOut = [
        "210vw", "140vw", "70vw", 
        "0vw", 
        "-70vw", "-140vw", "-210vw"
    ];
    
    const rotOut = [
        60, 50, 40, 
        0, 
        -40, -50, -60
    ];
    
    const scaleOut = [
        0.5, 0.6, 0.8, 
        1, 
        0.8, 0.6, 0.5
    ];
    
    const zOut = [
        -900, -600, -300, 
        0, 
        -300, -600, -900
    ];
    
    const opacOut = [
        0, 0, 0.5, 
        1, 
        0.5, 0, 0
    ];

    const x = useTransform(scrollYProgress, input, xOut);
    const rotateY = useTransform(scrollYProgress, input, rotOut);
    const scale = useTransform(scrollYProgress, input, scaleOut);
    const z = useTransform(scrollYProgress, input, zOut);
    const opacity = useTransform(scrollYProgress, input, opacOut);
    const pointerEvents = useTransform(opacity, (o) => (o > 0.1 ? "auto" : "none"));

    return (
        <motion.div
            style={{ 
                x, rotateY, scale, z, opacity, pointerEvents,
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                transformStyle: 'preserve-3d'
            }}
        >
            <motion.div 
                onClick={() => setIsFlipped(!isFlipped)}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 200, damping: 20 }}
                style={{
                    width: '100%',
                    maxWidth: '800px',
                    height: '65vh', // uniform size for all cards
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    cursor: 'pointer'
                }}
            >
                {/* Back of Card (Shown Initially - physical back) */}
                <div className="glass-card" style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backfaceVisibility: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2.5rem',
                    boxSizing: 'border-box',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                }}>
                    <div style={{ fontSize: '6rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {logo}
                    </div>
                    <h4 className="gradient-text" style={{ position: 'absolute', bottom: '2.5rem', fontSize: '1.75rem', fontWeight: 'bold', textAlign: 'center' }}>{title}</h4>
                </div>

                {/* Front of Card (Content, Shown when Flipped) */}
                <div className="glass-card" style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    padding: '2.5rem',
                    boxSizing: 'border-box',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                }}>
                    <div 
                        onClick={(e) => isFlipped && e.stopPropagation()} 
                        style={{ 
                            width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' 
                        }}
                    >
                        {children}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function About() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    return (
        <section id="about" style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
            {/* The 400vh container to give scrolling space */}
            <div ref={targetRef} style={{ height: '400vh', position: 'relative' }}>
                
                {/* The sticky container that holds the viewport and cards */}
                <div style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    width: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    
                    {/* Fixed Header */}
                    <div style={{
                        position: 'absolute',
                        top: '8vh',
                        left: '0',
                        width: '100%',
                        textAlign: 'center',
                        zIndex: 10
                    }}>
                        <h2 className="section__heading" style={{ marginBottom: '0.5rem' }}>About Me</h2>
                        <p className="section__subheading" style={{ margin: '0 auto', fontSize: '1.125rem' }}>
                            A little about who I am and what I work with.
                        </p>
                    </div>

                    {/* Cards Container */}
                    <div style={{ 
                        position: 'absolute', 
                        top: '20vh', 
                        bottom: '5vh',
                        left: 0,
                        width: '100%', 
                        perspective: '1200px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transformStyle: 'preserve-3d'
                    }}>

                        {/* Card 0: Intro & Journey */}
                        <CardOverlay 
                            index={0} 
                            scrollYProgress={scrollYProgress} 
                            title="Intro & Journey"
                            // A stylish S logo using italic serif text
                            logo={<span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>S</span>}
                        >
                            <h3 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }} className="gradient-text">Hello & My Journey</h3>
                            <p className="about__text" style={{ fontSize: '1.125rem', lineHeight: '1.7' }}>
                                Hi, I&apos;m <strong>Sanskar Gupta</strong> — a passionate Backend Developer
                                and Competitive Programmer. I enjoy designing clean, scalable server-side
                                systems and love the intellectual challenge of algorithmic problem-solving.
                            </p>
                            <p className="about__text" style={{ fontSize: '1.125rem', lineHeight: '1.7' }}>
                                I&apos;m currently pursuing my studies in Computer Science, building a solid
                                foundation in data structures, algorithms, and systems programming. Outside
                                of coursework, I actively participate in coding contests on platforms like
                                Codeforces and LeetCode.
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                                {highlights.map(h => (
                                    <div key={h.label} style={{ textAlign: 'center' }}>
                                        <div className="gradient-text" style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{h.value}</div>
                                        <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>{h.label}</div>
                                    </div>
                                ))}
                            </div>
                        </CardOverlay>

                        {/* Card 1: Web Dev */}
                        <CardOverlay 
                            index={1} 
                            scrollYProgress={scrollYProgress} 
                            title="Web Dev"
                            logo={<FaLaptopCode />}
                        >
                            <h3 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }} className="gradient-text">Web Development</h3>
                            <p className="about__text" style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1rem' }}>
                                Crafting robust backend architectures and seamless frontend experiences. 
                                Focused on delivering reliable REST APIs, database management, and scalable web solutions.
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                                {skillCategories.find(c => c.label === 'Backend & Web').skills.map(s => (
                                    <span key={s.name} className="glass-card" style={{ padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{s.icon} {s.name}</span>
                                ))}
                                {skillCategories.find(c => c.label === 'Databases').skills.map(s => (
                                    <span key={s.name} className="glass-card" style={{ padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{s.icon} {s.name}</span>
                                ))}
                                <span className="glass-card" style={{ padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><SiJavascript /> JavaScript</span>
                                <span className="glass-card" style={{ padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><SiHtml5 /> HTML/CSS</span>
                            </div>
                        </CardOverlay>

                        {/* Card 2: AI & ML */}
                        <CardOverlay 
                            index={2} 
                            scrollYProgress={scrollYProgress} 
                            title="AI & ML"
                            logo={<FaBrain />}
                        >
                            <h3 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }} className="gradient-text">AI & Machine Learning</h3>
                            <p className="about__text" style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1rem' }}>
                                Exploring data analysis, predictive modeling, and intelligent systems. 
                                Leveraging modern libraries and frameworks to solve complex problems and extract meaningful insights.
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                                <span className="glass-card" style={{ padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><SiPython /> Python</span>
                                <span className="glass-card" style={{ padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Data Analysis</span>
                                <span className="glass-card" style={{ padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Model Training</span>
                                <span className="glass-card" style={{ padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Predictive Algorithms</span>
                            </div>
                        </CardOverlay>

                        {/* Card 3: Software */}
                        <CardOverlay 
                            index={3} 
                            scrollYProgress={scrollYProgress} 
                            title="Software"
                            logo={<FaCogs />}
                        >
                            <h3 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }} className="gradient-text">Software Engineering</h3>
                            <p className="about__text" style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1rem' }}>
                                Deep dive into low-level systems programming, algorithms, and application development.
                                Building efficient solutions with a focus on performance and clean code principles.
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                                {skillCategories.find(c => c.label === 'Languages').skills.filter(s => ['C++', 'C', 'Java'].includes(s.name)).map(s => (
                                    <span key={s.name} className="glass-card" style={{ padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{s.icon} {s.name}</span>
                                ))}
                                {skillCategories.find(c => c.label === 'Tools & OS').skills.map(s => (
                                    <span key={s.name} className="glass-card" style={{ padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{s.icon} {s.name}</span>
                                ))}
                            </div>
                        </CardOverlay>

                    </div>
                </div>
            </div>
        </section>
    );
}

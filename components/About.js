'use client';

import { motion } from 'framer-motion';
import {
    SiCplusplus, SiC, SiPython, SiJavascript, SiNodedotjs,
    SiExpress, SiMysql, SiMongodb, SiGit, SiLinux, SiPostman,
    SiHtml5, SiCss
} from 'react-icons/si';
import { FaJava, FaCode, FaServer, FaDatabase } from 'react-icons/fa';

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

export default function About() {
    return (
        <section className="section about" id="about">
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
                {/* Left — Bio */}
                <motion.div
                    className="about__bio"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <p className="about__text">
                        Hi, I&apos;m <strong>Sanskar Gupta</strong> — a passionate Backend Developer
                        and Competitive Programmer. I enjoy designing clean, scalable server-side
                        systems and love the intellectual challenge of algorithmic problem-solving.
                    </p>
                    <p className="about__text">
                        I&apos;m currently pursuing my studies in Computer Science, where I&apos;ve
                        built a solid foundation in data structures, algorithms, and systems programming.
                        Outside of coursework, I actively participate in coding contests on platforms
                        like Codeforces and LeetCode to sharpen my problem-solving skills.
                    </p>
                    <p className="about__text">
                        When I&apos;m not coding, I enjoy exploring open-source projects,
                        contributing to community discussions, and keeping up with the latest
                        in backend technologies.
                    </p>

                    {/* Highlights */}
                    <div className="about__highlights">
                        {highlights.map((h) => (
                            <div key={h.label} className="about__highlight glass-card">
                                <span className="about__highlight-value gradient-text">{h.value}</span>
                                <span className="about__highlight-label">{h.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right — Skills */}
                <motion.div
                    className="about__skills"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {skillCategories.map((cat, i) => (
                        <motion.div
                            key={cat.label}
                            className="about__skill-group glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                        >
                            <div className="about__skill-group-header">
                                <span className="about__skill-group-icon">{cat.icon}</span>
                                <h4 className="about__skill-group-label">{cat.label}</h4>
                            </div>
                            <div className="about__skill-pills">
                                {cat.skills.map((skill) => (
                                    <div key={skill.name} className="about__skill-pill">
                                        <span className="about__skill-pill-icon">{skill.icon}</span>
                                        {skill.name}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

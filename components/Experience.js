'use client';

import { motion } from 'framer-motion';
import { HiAcademicCap, HiBriefcase, HiBadgeCheck } from 'react-icons/hi';
import { FaExternalLinkAlt } from 'react-icons/fa';

const timeline = [
    {
        type: 'education',
        icon: <HiAcademicCap size={22} />,
        title: 'B.Tech in Computer Science',
        org: 'MNNIT Allahabad',
        date: '2025 — Present',
        description: 'Coursework in Data Structures, Algorithms, Operating Systems, and Database Management. SGPA: 9.14/10.',
    },
    {
        type: 'education',
        icon: <HiAcademicCap size={22} />,
        title: 'Higher Secondary (XII)',
        org: 'Modern Public School',
        date: '2024 — 2025',
        description: 'Science stream with Mathematics. Scored 93% in board examinations.',
    },
];

const certifications = [
    {
        title: 'Frontend Developer (React)',
        subtitle: 'Certificate of Accomplishment',
        issuer: 'HackerRank',
        date: 'Issued Jun 2026',
        credentialId: '2746EF02D8FB',
        link: 'https://www.hackerrank.com/certificates/2746EF02D8FB',
        skills: ['React.js', 'Front-End Development']
    },
    {
        title: 'JavaScript (Intermediate)',
        issuer: 'HackerRank',
        date: 'Issued Jun 2026',
        credentialId: 'CB6671B47DF7',
        link: 'https://www.hackerrank.com/certificates/CB6671B47DF7',
        skills: ['JavaScript']
    },
    {
        title: '3rd Position in Robotics Competition',
        issuer: 'MNNIT Allahabad',
        date: '2025',
        skills: ['Robotics', 'Embedded Systems']
    }
];

export default function Experience() {
    return (
        <section className="section experience" id="experience">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section__heading">Experience & Education</h2>
                <p className="section__subheading">
                    My journey so far — milestones, roles, and certifications.
                </p>
            </motion.div>

            <div className="timeline">
                {timeline.map((item, i) => (
                    <motion.div
                        key={i}
                        className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: i * 0.12 }}
                    >
                        <div className="timeline__dot">
                            {item.icon}
                        </div>
                        <div className="timeline__card glass-card">
                            <span className="timeline__date">{item.date}</span>
                            <h3 className="timeline__title">{item.title}</h3>
                            <p className="timeline__org">{item.org}</p>
                            <p className="timeline__desc">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Certifications */}
            <motion.div
                className="certs"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h3 className="certs__heading">
                    <HiBadgeCheck size={24} /> Certifications
                </h3>
                <div className="certs__grid">
                    {certifications.map((cert) => (
                        <div key={cert.title} className="certs__card glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                            <div style={{ width: '100%' }}>
                                <h4 className="certs__title" style={{ marginBottom: '0.25rem' }}>
                                    {cert.title}
                                    {cert.subtitle && (
                                        <span className="certs__subtitle" style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 'normal', opacity: 0.8, marginTop: '0.1rem' }}>
                                            {cert.subtitle}
                                        </span>
                                    )}
                                </h4>
                                <p className="certs__issuer" style={{ margin: '0' }}>{cert.issuer}</p>
                                <span className="certs__year" style={{ marginTop: '0.25rem', fontSize: 'var(--text-xs)' }}>{cert.date}</span>
                                {cert.credentialId && (
                                    <p className="certs__id" style={{ fontSize: 'var(--text-xs)', opacity: 0.7, margin: '0.25rem 0 0 0' }}>
                                        Credential ID: <code style={{ color: 'var(--accent-secondary)' }}>{cert.credentialId}</code>
                                    </p>
                                )}
                            </div>
                            
                            {cert.skills && (
                                <div className="certs__skills" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', margin: '0.5rem 0' }}>
                                    {cert.skills.map((skill) => (
                                        <span key={skill} className="tag" style={{ fontSize: '10px', padding: '0.15rem 0.4rem' }}>{skill}</span>
                                    ))}
                                </div>
                            )}

                            {cert.link && (
                                <a 
                                    href={cert.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn btn--secondary" 
                                    style={{ 
                                        padding: '0.4rem 0.8rem', 
                                        fontSize: 'var(--text-xs)', 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        gap: '0.4rem',
                                        marginTop: '0.5rem'
                                    }}
                                >
                                    <span>Show credential</span>
                                    <FaExternalLinkAlt size={10} />
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

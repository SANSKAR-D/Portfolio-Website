'use client';

import { motion } from 'framer-motion';
import { HiAcademicCap, HiBriefcase, HiBadgeCheck } from 'react-icons/hi';

const timeline = [
    {
        type: 'education',
        icon: <HiAcademicCap size={22} />,
        title: 'B.Tech in Computer Science',
        org: 'University Name',
        date: '2021 — 2025',
        description: 'Coursework in Data Structures, Algorithms, Operating Systems, and Database Management. CGPA: 8.5/10.',
    },
    {
        type: 'work',
        icon: <HiBriefcase size={22} />,
        title: 'Software Engineering Intern',
        org: 'Company Name',
        date: 'Summer 2024',
        description: 'Built microservices for a real-time analytics dashboard. Reduced API response time by 40% using Redis caching.',
    },
    {
        type: 'work',
        icon: <HiBriefcase size={22} />,
        title: 'Open-Source Contributor',
        org: 'Various Projects',
        date: '2023 — Present',
        description: 'Contributed to 10+ open-source repos including React ecosystem libraries. Merged 25+ pull requests.',
    },
    {
        type: 'education',
        icon: <HiAcademicCap size={22} />,
        title: 'Higher Secondary (XII)',
        org: 'School Name',
        date: '2019 — 2021',
        description: 'Science stream with Mathematics. Scored 95% in board examinations.',
    },
];

const certifications = [
    { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024' },
    { title: 'Full-Stack Web Development', issuer: 'Coursera', year: '2023' },
    { title: 'Data Structures & Algorithms', issuer: 'Udemy', year: '2023' },
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
                <div className="timeline__line" />
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
                        <div key={cert.title} className="certs__card glass-card">
                            <h4 className="certs__title">{cert.title}</h4>
                            <p className="certs__issuer">{cert.issuer}</p>
                            <span className="certs__year">{cert.year}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

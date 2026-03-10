'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';

const projects = [
    {
        title: 'Portfolio Website',
        description: 'This very portfolio — a modern, animated Next.js site with dark mode, scroll animations, and live coding profile stats.',
        tags: ['Next.js', 'Framer Motion', 'CSS'],
        github: 'https://github.com/SANSKAR-D',
        live: 'https://example.com',
        featured: true,
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

export default function Projects() {
    return (
        <section className="section projects" id="projects">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section__heading">Projects</h2>
                <p className="section__subheading">
                    A collection of things I&apos;ve built — from game engines to full-stack apps.
                </p>
            </motion.div>

            <div className="projects__grid">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.title}
                        className={`projects__card glass-card ${project.featured ? 'projects__card--featured' : ''}`}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -6 }}
                    >
                        {project.featured && (
                            <span className="badge">
                                <FaStar size={10} /> Featured
                            </span>
                        )}
                        <h3 className="projects__title">{project.title}</h3>
                        <p className="projects__desc">{project.description}</p>
                        <div className="projects__tags">
                            {project.tags.map((tag) => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                        <div className="projects__links">
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="projects__link">
                                    <FaGithub size={18} />
                                </a>
                            )}
                            {project.live && (
                                <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" className="projects__link">
                                    <FaExternalLinkAlt size={16} />
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

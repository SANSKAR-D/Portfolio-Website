'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';

const projects = [
  {
    title: 'KnightCode',
    year: '2026',
    description: 'A full-stack competitive programming judge built from scratch with a custom isolated Docker-based code execution engine supporting parallel evaluation.',
    tags: ['React', 'Node.js', 'Docker', 'MongoDB', 'Three.js', 'Monaco Editor'],
    github: 'https://github.com/SANSKAR-D/Web-Dev-Projects/tree/main/KnightCode',
    live: 'https://knightcode-xi.vercel.app/',
    image: '/knightcode.png'
  },
  {
    title: 'YT RAG Assistant',
    year: '2026',
    description: 'A local full-stack AI application that ingests YouTube video transcripts and enables semantic Q&A using Ollama, ChromaDB, and a FastAPI backend pipeline.',
    tags: ['Python', 'FastAPI', 'React', 'Ollama', 'ChromaDB', 'LangChain'],
    github: 'https://github.com/SANSKAR-D/youtube-rag-assistant',
    image: '/rag_assistant.png'
  },
  {
    title: 'Portfolio Website',
    year: '2026',
    description: 'This very portfolio — a modern, animated Next.js site with dark mode, scroll animations, and minimalist aesthetic.',
    tags: ['Next.js', 'Framer Motion', 'CSS'],
    live:'https://sanskar-gupta-portfolio.vercel.app/',
    github: 'https://github.com/SANSKAR-D/Portfolio-Website',
    image: '/computer.png'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
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
        <h2 className="section__heading">Selected Work</h2>
        <p className="section__subheading">
          Things I&apos;ve built - from web apps to AI projects.
        </p>
      </motion.div>

      <div className="projects__grid">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            className="projects__card glass-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.1 }}
          >
            {project.image && (
              <div className="projects__image-container">
                <Image src={project.image} alt={project.title} width={500} height={312} className="projects__image" />
              </div>
            )}
            
            <h3 className="projects__title">{project.title}</h3>
            {project.year && <p className="projects__year">{project.year}</p>}
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

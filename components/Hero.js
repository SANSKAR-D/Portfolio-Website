'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiCplusplus, SiC, SiPython, SiNodedotjs,
  SiJavascript, SiFastapi, SiLangchain
} from 'react-icons/si';
import { FaProjectDiagram, FaBrain } from 'react-icons/fa';
import { HiDownload, HiArrowRight } from 'react-icons/hi';

const techStack = [
  { icon: <SiPython />, name: 'Python' },
  { icon: <SiLangchain />, name: 'Langchain' },
  { icon: <FaProjectDiagram />, name: 'Langgraph' },
  { icon: <FaBrain />, name: 'RAG' },
  { icon: <SiFastapi />, name: 'FastAPI' },
  { icon: <SiCplusplus />, name: 'C++' },
  { icon: <SiNodedotjs />, name: 'Node.js' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const roles = ["AI Engineer", "Competitive Programmer", "Problem Solver"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" id="hero">
      {/* Left: Text Content */}
      <motion.div
        className="hero__content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero__greeting" variants={itemVariants}>
          Hi, I&apos;m
        </motion.p>

        <motion.h1 className="hero__name" variants={itemVariants}>
          Sanskar Gupta
        </motion.h1>

        <motion.div className="hero__tagline-container" variants={itemVariants}>
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              className="hero__tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.p className="hero__description" variants={itemVariants}>
          I build intelligent AI systems and love solving algorithmic problems.
          Passionate about Large Language Models, scalable architecture, and open-source.
        </motion.p>

        <motion.div className="hero__ctas" variants={itemVariants}>
          <a href="#projects" className="btn btn--primary">
            View Projects
            <HiArrowRight size={18} />
          </a>
          <a href="/NIT_Allahabad_Resume.pdf" className="btn btn--secondary" download="Sanskar_Gupta_Resume.pdf">
            <HiDownload size={18} />
            Download Resume
          </a>
        </motion.div>

        <motion.div className="hero__tech" variants={itemVariants}>
          <div className="hero__tech-icons">
            {techStack.map((tech) => (
              <div key={tech.name} className="hero__tech-icon" title={tech.name}>
                {tech.icon}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Right: Image Container */}
      <motion.div
        className="hero__image-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      >
        <Image 
          src="/hero.png" 
          alt="Sanskar Gupta" 
          width={800} 
          height={1000} 
          className="hero__image" 
          priority
        />
      </motion.div>
    </section>
  );
}

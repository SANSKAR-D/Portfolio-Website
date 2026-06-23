'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Scroll3DWrapper({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 60, scale: 0.95, rotateX: 15 }}
      whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={isMobile ? {
        position: "relative",
        zIndex: 1
      } : {
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
        position: "relative",
        zIndex: 1
      }}
      className="scroll-3d-wrapper"
    >
      {children}
    </motion.div>
  );
}

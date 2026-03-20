'use client';

import { motion } from 'framer-motion';

export default function Scroll3DWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
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

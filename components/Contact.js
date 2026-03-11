'use client';

import { motion } from 'framer-motion';
import { useState, Suspense } from 'react';
import { HiPaperAirplane } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';

const socials = [
    { icon: <FaGithub size={20} />, href: 'https://github.com/SANSKAR-D', label: 'GitHub' },
    { icon: <FaLinkedinIn size={20} />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <HiOutlineMail size={20} />, href: 'mailto:sethsanskar@gmail.com', label: 'Email' },
];

function PlanetModel() {
    const { scene } = useGLTF('/stylized_planet.glb');
    return (
        <primitive
            object={scene}
            scale={1.8}
            position={[0, 0.4, 0]}
        />
    );
}

function RotatingPlanet() {
    return (
        <Canvas
            camera={{ fov: 45, position: [0, 0, 5] }}
            style={{ width: '100%', height: '100%' }}
        >
            <ambientLight intensity={0.6} />
            <directionalLight position={[4, 6, 4]} intensity={1.4} color="#a78bfa" />
            <pointLight position={[-4, -2, -4]} intensity={0.5} color="#6366f1" />
            <Suspense fallback={null}>
                <PlanetModel />
                <Environment preset="night" />
            </Suspense>
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={1.8}
            />
        </Canvas>
    );
}

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | sent

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('sent');
            setForm({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <section className="section contact" id="contact">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section__heading">Get In Touch</h2>
                <p className="section__subheading">
                    Have a project in mind or just want to say hi? Drop me a message!
                </p>
            </motion.div>

            <div className="contact__grid">
                {/* ── Left: form + social icons below ── */}
                <motion.div
                    className="contact__left"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <form className="contact__form glass-card" onSubmit={handleSubmit}>
                        <div className="contact__field">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="contact__field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="your@email.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="contact__field">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="Your message..."
                                value={form.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <motion.button
                            type="submit"
                            className="btn btn--primary contact__submit"
                            disabled={status === 'sending'}
                            whileTap={{ scale: 0.97 }}
                        >
                            {status === 'sending' ? (
                                <span className="contact__spinner" />
                            ) : status === 'sent' ? (
                                'Sent ✓'
                            ) : (
                                <>
                                    <HiPaperAirplane size={18} />
                                    Send Message
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Social links — now below the form */}
                    <div className="contact__socials-row">
                        <span className="contact__socials-label">Find me on</span>
                        <div className="contact__social-links">
                            {socials.map((s) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact__social-pill glass-card"
                                    whileHover={{ y: -3, scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                    aria-label={s.label}
                                >
                                    {s.icon}
                                    <span>{s.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ── Right: rotating 3D planet ── */}
                <motion.div
                    className="contact__planet"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    <div className="contact__planet-glow" />
                    <RotatingPlanet />
                    <p className="contact__planet-label">Somewhere in the universe…</p>
                </motion.div>
            </div>
        </section>
    );
}

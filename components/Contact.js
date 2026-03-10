'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiPaperAirplane } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';

const socials = [
    { icon: <FaGithub size={22} />, href: 'https://github.com/SANSKAR-D', label: 'GitHub' },
    { icon: <FaLinkedinIn size={22} />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaXTwitter size={22} />, href: 'https://x.com', label: 'X / Twitter' },
    { icon: <HiOutlineMail size={22} />, href: 'mailto:hello@example.com', label: 'Email' },
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | sent

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate send
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
                <motion.form
                    className="contact__form glass-card"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
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
                </motion.form>

                <motion.div
                    className="contact__socials"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    <h3 className="contact__socials-title">Or find me on</h3>
                    <div className="contact__social-links">
                        {socials.map((s) => (
                            <motion.a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact__social-card glass-card"
                                whileHover={{ y: -4, scale: 1.03 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                            >
                                {s.icon}
                                <span>{s.label}</span>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

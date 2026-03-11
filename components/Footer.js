'use client';

import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';

const socials = [
    { icon: <FaGithub size={20} />, href: 'https://github.com/SANSKAR-D', label: 'GitHub' },
    { icon: <FaLinkedinIn size={20} />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <HiOutlineMail size={20} />, href: 'mailto:sethsanskar@gmail.com', label: 'Email' },
];

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__gradient-border" />
            <div className="footer__inner">
                <div className="footer__brand">
                    <span className="footer__logo">
                        <span className="navbar__logo-bracket">&lt;</span>
                        <span className="navbar__logo-name">Sanskar</span>
                        <span className="navbar__logo-bracket">/&gt;</span>
                    </span>
                    <p className="footer__tagline">Building things for the web.</p>
                </div>

                <div className="footer__socials">
                    {socials.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__social-link"
                            aria-label={s.label}
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>

                <p className="footer__copy">
                    &copy; {new Date().getFullYear()} Sanskar. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

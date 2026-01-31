import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import IeeeIcon from '../components/CustomIcons';

const Contact = () => {
    const contactLinks = [
        { icon: <Mail size={24} />, label: 'Email', href: `mailto:${resumeData.email}`, value: resumeData.email },
        { icon: <Linkedin size={24} />, label: 'LinkedIn', href: resumeData.linkedIn, value: 'Connect on LinkedIn' },
        { icon: <Github size={24} />, label: 'GitHub', href: resumeData.github, value: 'Follow on GitHub' },
        { icon: <IeeeIcon size={24} />, label: 'IEEE Xplore', href: resumeData.ieee, value: 'View Publications' }
    ];

    return (
        <div className="section container" style={{ paddingTop: '8rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="section-title">Get in Touch</h1>
                <div className="glass" style={{ padding: '3rem', textAlign: 'center', marginBottom: '3rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '1.5rem',
                        marginTop: '2rem'
                    }}>
                        {contactLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="glass"
                                style={{
                                    padding: '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    transition: 'transform 0.3s ease',
                                    textDecoration: 'none'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{ color: 'var(--primary)' }}>{link.icon}</div>
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>{link.label}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{link.value}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;

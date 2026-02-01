import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const Contact = () => {
    const contactLinks = [
        {
            icon: <Mail size={24} />,
            label: 'Email',
            href: `mailto:${resumeData.email}`,
            value: resumeData.email
        },
        {
            icon: <img src="/linkedin-logo.png" alt="LinkedIn" style={{ height: '24px', width: 'auto' }} />,
            label: 'LinkedIn',
            href: resumeData.linkedIn,
            value: 'Connect on LinkedIn'
        },
        {
            icon: (
                <div style={{ backgroundColor: '#fff', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src="/github-logo.png" alt="GitHub" style={{ width: '20px', height: '20px' }} />
                </div>
            ),
            label: 'GitHub',
            href: resumeData.github,
            value: 'Follow on GitHub'
        },
        {
            icon: <img src="/ieee-logo.png" alt="IEEE" style={{ height: '24px', width: 'auto' }} />,
            label: 'IEEE Xplore',
            href: resumeData.ieee,
            value: 'View Publications'
        },
        {
            icon: (
                <div style={{ backgroundColor: '#fff', borderRadius: '4px', padding: '4px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="https://atsqa.org/assets/images/atsqa-logo-header.svg" alt="ATSQA" style={{ height: '20px', width: 'auto' }} />
                </div>
            ),
            label: 'AT*SQA Profile',
            href: resumeData.atsqaProfile,
            value: 'View Certified Tester Profile'
        }
    ];

    return (
        <div className="section container page-header-padding">
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

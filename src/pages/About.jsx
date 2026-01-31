import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { User, Target, Zap, Github, Linkedin, Phone, Mail } from 'lucide-react';

const About = () => {
    return (
        <div className="section container page-header-padding">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="section-title">About Me</h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '4rem',
                    alignItems: 'start'
                }}>
                    {/* Left Side: Bio Text */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div className="glass" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {resumeData.about.map((paragraph, i) => (
                                    <p key={i} style={{
                                        color: 'var(--text-muted)',
                                        fontSize: '1.1rem',
                                        lineHeight: '1.7'
                                    }}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Contact Details in requested format */}
                            <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ borderTop: '1px solid rgba(var(--primary-rgb), 0.2)', marginBottom: '1rem' }} />

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingLeft: '0.5rem', marginBottom: '0.8rem' }}>
                                    <Github size={24} color="var(--primary)" />
                                    <a href={resumeData.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontSize: '1.1rem', textDecoration: 'none' }}>
                                        @{resumeData.github.split('/').pop()}
                                    </a>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingLeft: '0.5rem', marginBottom: '0.8rem' }}>
                                    <Linkedin size={24} color="var(--primary)" />
                                    <a href={resumeData.linkedIn} target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontSize: '1.1rem', textDecoration: 'none' }}>
                                        @{resumeData.linkedIn.split('/').pop()}
                                    </a>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingLeft: '0.5rem', marginBottom: '0.4rem' }}>
                                    <Phone size={24} color="var(--primary)" />
                                    <span style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>{resumeData.mobile}</span>
                                </div>

                                <div style={{ borderTop: '1px solid rgba(var(--primary-rgb), 0.2)', margin: 0 }} />

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingLeft: '0.5rem', marginTop: '0.4rem', marginBottom: '0.8rem' }}>
                                    <Mail size={24} color="var(--primary)" />
                                    <a href={`mailto:${resumeData.email}`} style={{ color: 'var(--text-main)', fontSize: '1.1rem', textDecoration: 'none' }}>
                                        {resumeData.email}
                                    </a>
                                </div>

                                <div style={{ borderTop: '1px solid rgba(var(--primary-rgb), 0.2)' }} />
                            </div>
                        </div>

                        {/* Quick Highlights */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <div className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                <Zap size={24} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Fast Execution</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Reducing execution from hours to minutes.</p>
                            </div>
                            <div className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                <Target size={24} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Maintained Code</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Stable, clean, and reliable test suites.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Profile Image & Stats */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{
                                    width: '100%',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '0.75rem'
                                }}>
                                    <img
                                        src="https://lh3.googleusercontent.com/d/1BlPdr2IeVY27ariXXSDuiUTgxrzC3UGE"
                                        alt={`${resumeData.name} - Professional`}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block',
                                            borderRadius: '8px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </div>
                                <div style={{
                                    width: '100%',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '0.75rem'
                                }}>
                                    <img
                                        src="https://lh3.googleusercontent.com/d/1P2ZGuFyJVUCVMHp7HpGS6qzuU_P3eTJ0"
                                        alt={`${resumeData.name} - Original`}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block',
                                            borderRadius: '8px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </div>
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{resumeData.name}</h3>
                            <p style={{ color: 'var(--primary)', fontWeight: 600 }}>{resumeData.role}</p>
                        </div>

                        <div className="glass" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <User size={20} color="var(--primary)" /> QA Philosophy
                            </h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                My goal in QA is simple: reduce risk, increase confidence, and keep releases smooth.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default About;

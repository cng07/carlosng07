import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { Target, Zap, Github, Linkedin, Mail, Lightbulb } from 'lucide-react';

const About = () => {
    return (
        <div className="section container page-header-padding">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="section-title">About Me</h1>

                <div className="about-layout">
                    {/* Left Side: Story + Highlights */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <section id="about-intro" className="glass" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                                    <span style={{ fontSize: '1.8rem', display: 'inline-block', position: 'relative', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                                        <span className="wave" role="img" aria-label="Waving hand" style={{ position: 'absolute', left: '-3.5rem', top: '-0.2rem', fontSize: '2.2rem' }}>👋</span>
                                        Hello there!
                                    </span>
                                    <h2 style={{ fontSize: '3rem', lineHeight: '1.1' }}>
                                        I'm <span style={{ color: 'var(--primary)' }}>Carlos Ng</span>
                                    </h2>
                                </div>
                                {resumeData.about.map((paragraph, i) => (
                                    <p key={i} style={{
                                        color: 'var(--text-main)',
                                        fontSize: '1.1rem',
                                        lineHeight: '1.7'
                                    }}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Contact Details */}
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

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingLeft: '0.5rem', marginBottom: '0.8rem' }}>
                                    <Mail size={24} color="var(--primary)" />
                                    <a href={`mailto:${resumeData.email}`} style={{ color: 'var(--text-main)', fontSize: '1.1rem', textDecoration: 'none' }}>
                                        {resumeData.email}
                                    </a>
                                </div>

                                <div style={{ borderTop: '1px solid rgba(var(--primary-rgb), 0.2)' }} />
                            </div>
                        </section>

                        {/* Quick Highlights */}
                        <section id="about-highlights" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <div className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                <Zap size={24} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Fast Execution</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Reduced execution time from 19 hours to 4 hours for 300+ test cases.</p>
                            </div>
                            <div className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                <Target size={24} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Maintained Code</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Stable, clean, and reliable test suites.</p>
                            </div>
                        </section>
                    </div>

                    {/* Right Side: Philosophy + Gallery */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <section id="about-philosophy" className="glass" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Lightbulb size={20} color="var(--primary)" /> QA Philosophy
                            </h3>
                            <p style={{ color: 'var(--text-main)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                My goal in QA is simple: reduce risk, increase confidence, and keep releases smooth.
                            </p>
                        </section>

                        <section id="about-gallery" className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{
                                    width: '100%',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    background: 'var(--surface-muted)',
                                    border: '1px solid var(--border)',
                                    padding: '0.75rem'
                                }}>
                                    <img
                                        src="https://lh3.googleusercontent.com/d/1BlPdr2IeVY27ariXXSDuiUTgxrzC3UGE"
                                        alt={`${resumeData.name} - Professional`}
                                        loading="lazy"
                                        decoding="async"
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
                                    background: 'var(--surface-muted)',
                                    border: '1px solid var(--border)',
                                    padding: '0.75rem'
                                }}>
                                    <img
                                        src="https://lh3.googleusercontent.com/d/1ZCtIgL7-l0jWczW0jcPhbBQkLzXE4dD9"
                                        alt={`${resumeData.name} - Original`}
                                        loading="lazy"
                                        decoding="async"
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
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', marginTop: '1rem' }}>{resumeData.name}</h3>
                            <p style={{ color: 'var(--primary)', fontWeight: 600 }}>{resumeData.role}</p>
                        </section>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default About;

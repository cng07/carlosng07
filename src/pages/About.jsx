import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { User, Target, Zap } from 'lucide-react';

const About = () => {
    return (
        <div className="section container" style={{ paddingTop: '8rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="section-title">About Me</h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                    alignItems: 'start'
                }}>
                    {/* Left Side: Bio Text */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div className="glass" style={{ padding: '2.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {resumeData.about.map((paragraph, i) => (
                                    <p key={i} style={{
                                        color: 'var(--text-muted)',
                                        fontSize: '1.1rem',
                                        lineHeight: '1.7',
                                        marginBottom: i === resumeData.about.length - 1 ? 0 : '0.5rem'
                                    }}>
                                        {paragraph}
                                    </p>
                                ))}
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
                            <div style={{
                                width: '100%',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                marginBottom: '1.5rem',
                                padding: '1rem'
                            }}>
                                <img
                                    src="https://lh3.googleusercontent.com/d/1P2ZGuFyJVUCVMHp7HpGS6qzuU_P3eTJ0"
                                    alt={resumeData.name}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                        borderRadius: '8px',
                                        objectFit: 'contain'
                                    }}
                                />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{resumeData.name}</h3>
                            <p style={{ color: 'var(--primary)', fontWeight: 600 }}>{resumeData.role}</p>
                        </div>

                        <div className="glass" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <User size={20} color="var(--primary)" /> QA Philosophy
                            </h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                I believe automation should provide immediate value to dev teams. My goal is always to create test frameworks that serve as a "safety net," not a burden.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default About;

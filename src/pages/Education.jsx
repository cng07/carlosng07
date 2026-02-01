import React from 'react';
import { motion } from 'framer-motion';
import {
    GraduationCap,
    Calendar,
    MapPin,
    Award,
    Star,
    BookOpen,
    School
} from 'lucide-react';
import { resumeData } from '../data/resumeData';

const Education = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <main className="container page-header-padding" style={{ minHeight: '100vh', position: 'relative' }}>
            {/* Background Decorative Glows */}
            <div style={{
                position: 'fixed',
                top: '20%',
                right: '-10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: -1,
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'fixed',
                bottom: '10%',
                left: '-5%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.05) 0%, transparent 70%)',
                filter: 'blur(50px)',
                zIndex: -1,
                pointerEvents: 'none'
            }} />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            display: 'inline-flex',
                            padding: '1rem',
                            borderRadius: '20px',
                            background: 'rgba(var(--primary-rgb), 0.1)',
                            marginBottom: '1.5rem',
                            color: 'var(--primary)'
                        }}
                    >
                        <GraduationCap size={40} />
                    </motion.div>
                    <motion.h1
                        style={{
                            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                            fontWeight: 800,
                            marginBottom: '1rem',
                            letterSpacing: '-0.02em'
                        }}
                        variants={itemVariants}
                    >
                        Academic <span style={{ color: 'var(--primary)' }}>Journey</span>
                    </motion.h1>
                    <motion.p
                        style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}
                        variants={itemVariants}
                    >
                        Foundation of my engineering expertise and professional growth.
                    </motion.p>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4rem',
                    position: 'relative',
                    maxWidth: '900px',
                    margin: '0 auto'
                }}>
                    {resumeData.education.map((edu, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            style={{ position: 'relative' }}
                        >
                            {/* Card Content */}
                            <div className="glass" style={{
                                padding: 'clamp(1.5rem, 5vw, 3.5rem)',
                                borderRadius: '32px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {/* Subtle Type Indicator */}
                                <div style={{
                                    position: 'absolute',
                                    top: '2rem',
                                    right: '2rem',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    color: 'rgba(var(--primary-rgb), 0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    {edu.type === 'Tertiary' ? <BookOpen size={14} /> : <School size={14} />}
                                    {edu.type}
                                </div>

                                <div style={{ marginBottom: '2.5rem' }}>
                                    <h2 style={{
                                        fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
                                        marginBottom: '0.75rem',
                                        color: 'var(--text-main)',
                                        lineHeight: 1.2
                                    }}>
                                        {edu.school}
                                    </h2>
                                    {edu.degree && (
                                        <div style={{
                                            display: 'inline-block',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '12px',
                                            background: 'linear-gradient(90deg, rgba(var(--primary-rgb), 0.2), transparent)',
                                            borderLeft: '4px solid var(--primary)',
                                            color: '#fff',
                                            fontWeight: 600,
                                            fontSize: '1.1rem'
                                        }}>
                                            {edu.degree}
                                        </div>
                                    )}
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: '1.5rem',
                                    marginBottom: '3rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
                                        <Calendar size={20} color="var(--primary)" />
                                        <span style={{ fontWeight: 500 }}>{edu.period}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
                                        <MapPin size={20} color="var(--primary)" />
                                        <span style={{ fontWeight: 500 }}>{edu.fullAddress}</span>
                                    </div>
                                </div>

                                {edu.highlights && (
                                    <div style={{ marginBottom: edu.scholarship ? '3rem' : '0' }}>
                                        <h4 style={{
                                            color: 'var(--text-main)',
                                            marginBottom: '1.5rem',
                                            fontSize: '1.2rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.6rem'
                                        }}>
                                            <Award size={22} color="var(--primary)" /> Honors & Achievements
                                        </h4>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                            gap: '1.25rem'
                                        }}>
                                            {edu.highlights.map((h, i) => (
                                                <div key={i} style={{
                                                    display: 'flex',
                                                    gap: '1rem',
                                                    padding: '1.25rem',
                                                    background: 'rgba(255,255,255,0.03)',
                                                    borderRadius: '16px',
                                                    border: '1px solid rgba(255,255,255,0.05)',
                                                    transition: 'all 0.3s ease'
                                                }}>
                                                    <Star size={18} style={{ color: '#ffd700', flexShrink: 0, marginTop: '0.1rem' }} />
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>{h}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {edu.scholarship && (
                                    <div style={{
                                        marginTop: '1rem',
                                        padding: '2rem',
                                        background: 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.12) 0%, rgba(var(--primary-rgb), 0.05) 100%)',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(var(--primary-rgb), 0.2)',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: '-12px',
                                            left: '2rem',
                                            background: 'var(--primary)',
                                            color: '#000',
                                            padding: '4px 12px',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            fontWeight: 800,
                                            textTransform: 'uppercase'
                                        }}>
                                            Scholarship
                                        </div>
                                        <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{edu.scholarship.name}</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <MapPin size={14} /> {edu.scholarship.fullAddress}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </main>
    );
};

export default Education;

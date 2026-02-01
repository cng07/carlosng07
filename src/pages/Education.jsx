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
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                {/* Subtle Type Indicator */}
                                <div style={{
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    color: 'var(--primary)',
                                    marginBottom: '1rem',
                                    opacity: 0.8
                                }}>
                                    {edu.type}
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
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
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '0.5rem 0',
                                            color: '#fff',
                                            fontWeight: 600,
                                            fontSize: '1.1rem',
                                            width: 'fit-content'
                                        }}>
                                            <GraduationCap size={24} color="var(--primary)" />
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
                                        <Calendar size={24} color="var(--primary)" />
                                        <span style={{ fontWeight: 500 }}>{edu.period}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
                                        <MapPin size={edu.type === 'Tertiary' ? 28 : 24} color="var(--primary)" />
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
                                            <Award size={24} color="var(--primary)" /> Honors & Achievements
                                        </h4>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                            gap: '1.25rem'
                                        }}>
                                            {(edu.fullHighlights || edu.highlights).map((h, i) => (
                                                <div key={i} style={{
                                                    display: 'flex',
                                                    gap: '1rem',
                                                    padding: '1.25rem',
                                                    background: 'rgba(255,255,255,0.03)',
                                                    borderRadius: '16px',
                                                    border: '1px solid rgba(255,255,255,0.05)',
                                                    transition: 'all 0.3s ease'
                                                }}>
                                                    <Star size={24} style={{ color: '#ffd700', flexShrink: 0, marginTop: '0.1rem' }} />
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
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', lineHeight: '1.5' }}>
                                            <MapPin size={24} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.25rem' }} /> {edu.scholarship.fullAddress}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Publications Section */}
                <div style={{ marginTop: '6rem', maxWidth: '900px', margin: '6rem auto 0' }}>
                    <motion.h2
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
                            fontWeight: 800,
                            marginBottom: '2.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            color: 'var(--text-main)'
                        }}
                    >
                        <BookOpen size={32} color="var(--primary)" />
                        Publications
                    </motion.h2>

                    <motion.div
                        variants={itemVariants}
                        className="glass"
                        style={{
                            padding: 'clamp(1.5rem, 5vw, 3rem)',
                            borderRadius: '24px',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}
                    >
                        <h3 style={{
                            fontSize: '1.3rem',
                            fontWeight: 700,
                            marginBottom: '1.5rem',
                            color: 'var(--text-main)',
                            lineHeight: 1.4
                        }}>
                            A Development of a Low-Cost 12-Lead Electrocardiogram Monitoring Device Using Android-Based Smartphone
                        </h3>

                        {/* Publication Metadata */}
                        <div style={{ marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                            <p style={{ marginBottom: '0.5rem' }}>
                                <strong>Published in:</strong> <a href="https://ieeexplore.ieee.org/xpl/conhome/8555972/proceeding" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>2018 IEEE 7th Global Conference on Consumer Electronics (GCCE)</a>
                            </p>
                            <p style={{ marginBottom: '0.5rem' }}>
                                <strong>Date of Conference:</strong> 09-12 October 2018
                            </p>
                            <p style={{ marginBottom: '0.5rem' }}>
                                <strong>Date Added to IEEE Xplore:</strong> 13 December 2018
                            </p>
                            <p style={{ marginBottom: '0.5rem' }}>
                                <strong>Conference Location:</strong> Nara, Japan
                            </p>
                            <p style={{ marginBottom: '0.5rem' }}>
                                <strong>Publisher:</strong> IEEE
                            </p>
                            <p style={{ marginBottom: '0.5rem' }}>
                                <strong>DOI:</strong> 10.1109/GCCE.2018.8574836
                            </p>
                            
                            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <p style={{ marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    ISBN Information:
                                </p>
                                <p style={{ marginBottom: '0.3rem', marginLeft: '0.5rem' }}>
                                    Electronic ISBN: 978-1-5386-6309-7
                                </p>
                                <p style={{ marginBottom: '0.3rem', marginLeft: '0.5rem' }}>
                                    CD: 978-1-5386-6308-0
                                </p>
                                <p style={{ marginBottom: '0.3rem', marginLeft: '0.5rem' }}>
                                    Print on Demand (PoD) ISBN: 978-1-5386-6310-3
                                </p>
                                <p style={{ marginLeft: '0.5rem' }}>
                                    Print on Demand (PoD) ISSN: 2378-8143
                                </p>
                            </div>

                            <p style={{ marginTop: '1.5rem' }}>
                                <a href="https://ieeexplore.ieee.org/document/8574836" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline', fontSize: '0.95rem', fontWeight: 600 }}>
                                    View on IEEE Xplore →
                                </a>
                            </p>
                        </div>

                        {/* Abstract Section */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: 700,
                                marginBottom: '0.75rem',
                                color: 'var(--primary)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                Abstract
                            </h4>
                            <p style={{
                                color: 'var(--text-muted)',
                                fontSize: '0.95rem',
                                lineHeight: 1.7,
                                background: 'rgba(var(--primary-rgb), 0.05)',
                                padding: '1.25rem',
                                borderLeft: '3px solid var(--primary)',
                                borderRadius: '8px'
                            }}>
                                The ECG3Gs+ is an alternative to the 12-Lead conventional electrocardiogram (ECG) device interfaced with Android smartphone via Bluetooth module. Several 12-Lead ECGs are commercially available, but are very costly. ECG3Gs+, on the other hand, is developed to have functions similar to the conventional ECG. The device is accurate, and power efficient that provides a pre-diagnostic readings and interpretation. This project targets financially-challenged people from remote areas who have heart ailments and who wanted their ECGs checked. It is capable of reading the R-R Interval, QRS Interval, Heart Rate, and Heart Rhythm. Through Bluetooth Module, ECG3Gs+ is connected to Android smartphone. An Android-based application was developed to display the ECG waveform and readings. The parallel testing of ECG3Gs+ and the conventional ECG machine yielded 92.43% accuracy for R-R Interval, 89.24% for QRS Interval, 91.62% for Heart Rate, and 100% for Heart Rhythm. The prototype is power efficient with 815.85 mW power rating.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </main>
    );
};

export default Education;

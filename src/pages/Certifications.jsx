import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, CheckCircle2, Calendar } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const Certifications = () => {
    return (
        <div className="section container page-header-padding">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="section-title">Certifications</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', textAlign: 'center', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
                    My professional credentials and certifications.
                </p>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4rem',
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    {resumeData.certifications.map((cert, i) => (
                        <motion.div
                            key={i}
                            className="glass"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '0',
                                borderRadius: '32px',
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            {/* Certificate Image Preview */}
                            <div style={{
                                position: 'relative',
                                background: 'rgba(0,0,0,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1rem',
                                minHeight: '300px',
                                borderRight: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    {cert.image ? (
                                        <img
                                            src={cert.image}
                                            alt={cert.title}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: '90%',
                                            aspectRatio: '1.414/1',
                                            background: 'rgba(255,255,255,0.03)',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '1rem',
                                            border: '2px dashed rgba(var(--primary-rgb), 0.2)',
                                            color: 'var(--text-muted)'
                                        }}>
                                            <Award size={48} opacity={0.2} />
                                            <p style={{ fontSize: '0.9rem' }}>Image Preview Pending</p>
                                        </div>
                                    )}
                                </motion.div>
                            </div>

                            {/* Certificate Details */}
                            <div style={{
                                padding: 'clamp(1.5rem, 5vw, 3rem)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                gap: '2rem'
                            }}>
                                <div>
                                    <h2 style={{
                                        color: 'var(--text-main)',
                                        fontSize: '1.8rem',
                                        fontWeight: 800,
                                        lineHeight: 1.2,
                                        marginBottom: '0.75rem'
                                    }}>
                                        {cert.title}
                                    </h2>
                                    {cert.subtitle && (
                                        <p style={{
                                            color: 'var(--primary)',
                                            fontWeight: 600,
                                            fontSize: '1.2rem',
                                            marginBottom: '1.5rem'
                                        }}>
                                            {cert.subtitle}
                                        </p>
                                    )}

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                            <span style={{
                                                fontSize: '0.85rem',
                                                color: '#fff',
                                                fontWeight: 700,
                                                background: 'var(--primary)',
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '6px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.4rem'
                                            }}>
                                                <Calendar size={14} /> {cert.period}
                                            </span>
                                            {cert.noExpiry && (
                                                <span style={{
                                                    fontSize: '0.85rem',
                                                    color: '#fff',
                                                    fontWeight: 700,
                                                    background: 'rgba(59, 130, 246, 0.5)',
                                                    padding: '0.4rem 0.8rem',
                                                    borderRadius: '6px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.4rem',
                                                    backdropFilter: 'blur(4px)'
                                                }}>
                                                    No Expiry
                                                </span>
                                            )}
                                        </div>
                                        <div style={{
                                            fontSize: '1rem',
                                            color: 'var(--text-muted)',
                                            fontWeight: 600,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.6rem'
                                        }}>
                                            <Award size={20} color="var(--primary)" /> {cert.issuer}
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    paddingTop: '2rem',
                                    borderTop: '1px solid rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                                        <span style={{ fontWeight: 600 }}>{cert.idLabel || 'Credential ID'}:</span><br />
                                        <span style={{ color: 'var(--primary)', fontWeight: 500, wordBreak: 'break-all' }}>{cert.credentialId}</span>
                                    </p>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="glass"
                                            style={{
                                                padding: '0.75rem 1.5rem',
                                                borderRadius: '12px',
                                                color: '#fff',
                                                fontSize: '0.95rem',
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.6rem',
                                                background: 'rgba(var(--primary-rgb), 0.2)',
                                                border: '1px solid rgba(var(--primary-rgb), 0.3)'
                                            }}
                                        >
                                            <ExternalLink size={18} /> View Certificate
                                        </a>

                                        {cert.additionalLinks && cert.additionalLinks.map((al, idx) => (
                                            <a
                                                key={idx}
                                                href={al.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="glass"
                                                style={{
                                                    padding: '0.75rem 1.5rem',
                                                    borderRadius: '12px',
                                                    color: 'var(--text-muted)',
                                                    fontSize: '0.95rem',
                                                    fontWeight: 600,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.6rem'
                                                }}
                                            >
                                                <ExternalLink size={18} /> {al.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Certifications;

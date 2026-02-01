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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
                    {resumeData.certifications.map((cert, i) => (
                        <motion.div
                            key={i}
                            className="glass"
                            style={{
                                padding: '2.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem'
                            }}
                            whileHover={{ y: -5 }}
                        >
                            <div>
                                <h3 style={{
                                    color: 'var(--text-main)',
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    lineHeight: 1.2,
                                    marginBottom: '0.5rem'
                                }}>
                                    {cert.title}
                                </h3>

                                {cert.subtitle && (
                                    <p style={{
                                        color: 'var(--primary)',
                                        fontWeight: 600,
                                        fontSize: '1.1rem',
                                        marginBottom: '1rem'
                                    }}>
                                        {cert.subtitle}
                                    </p>
                                )}

                                <div style={{ marginTop: '1.25rem' }}>
                                    {/* Dates Row */}
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '0.75rem',
                                        marginBottom: '0.75rem'
                                    }}>
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

                                    {/* Issuer Row */}
                                    <div style={{
                                        fontSize: '0.95rem',
                                        color: 'var(--text-muted)',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        opacity: 0.9
                                    }}>
                                        <Award size={18} color="var(--primary)" /> {cert.issuer}
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                marginTop: 'auto',
                                paddingTop: '1.5rem',
                                borderTop: '1px solid rgba(255,255,255,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.8rem'
                            }}>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                                    <span style={{ fontWeight: 600 }}>{cert.idLabel || 'Credential ID'}:</span> {' '}
                                    {cert.link ? (
                                        <a href={cert.link} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: 500, wordBreak: 'break-all' }}>
                                            {cert.credentialId}
                                        </a>
                                    ) : cert.credentialId}
                                </p>

                                {cert.additionalLinks && cert.additionalLinks.map((al, idx) => (
                                    <a
                                        key={idx}
                                        href={al.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            fontSize: '0.95rem',
                                            color: 'var(--primary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontWeight: 500,
                                            width: 'fit-content'
                                        }}
                                    >
                                        <ExternalLink size={16} /> {al.label}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Certifications;

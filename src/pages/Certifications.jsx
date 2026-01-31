import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, CheckCircle2 } from 'lucide-react';
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {resumeData.certifications.map((cert, i) => (
                        <motion.div
                            key={i}
                            className="glass"
                            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}
                            whileHover={{ y: -5 }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '0.3rem', textDecoration: 'underline' }}>{cert.title}</h3>
                                    {cert.subtitle && <p style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.3rem' }}>{cert.subtitle}</p>}
                                    <p style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 600 }}>{cert.issuer}</p>
                                </div>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontWeight: 600, marginTop: '0.3rem' }}>{cert.period}</span>
                            </div>

                            <div style={{ marginTop: '0.5rem' }}>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                    {cert.idLabel || 'Credential ID'}: {cert.link ? (
                                        <a href={cert.link} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                                            {cert.credentialId}
                                        </a>
                                    ) : cert.credentialId}
                                </p>

                                {cert.additionalLinks && cert.additionalLinks.map((al, idx) => (
                                    <p key={idx} style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                        <a href={al.url} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <ExternalLink size={14} /> {al.label}
                                        </a>
                                    </p>
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

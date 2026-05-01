import React from 'react';
import {
    ExternalLink,
    CheckCircle2,
    MapPin,
    Briefcase,
} from 'lucide-react';
import { motion } from 'framer-motion';
import CompanyLogo from '../components/CompanyLogo';
import { resumeData } from '../data/resumeData';

const Experience = () => {
    return (
        <div className="section container page-header-padding">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="section-title">
                    <Briefcase size={28} color="var(--primary)" /> Work Experience
                </h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {resumeData.experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="glass"
                            style={{ padding: '2rem' }}
                            whileHover={{ y: -4, transition: { duration: 0.3 } }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="experience-company-row">
                                    {exp.logo && (
                                        <motion.div
                                            className="company-logo-container"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <CompanyLogo
                                                company={exp.company}
                                                logo={exp.logo}
                                                website={exp.website}
                                            />
                                        </motion.div>
                                    )}
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                                        {exp.website ? (
                                            <a href={exp.website} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                                {exp.company}
                                                <ExternalLink size={14} style={{ marginLeft: '0.5rem', verticalAlign: 'middle' }} />
                                            </a>
                                        ) : (
                                            exp.company
                                        )}
                                    </h3>
                                </div>
                                {!exp.roles && <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem', paddingLeft: '4px' }}>{exp.role}</p>}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingLeft: '4px' }}>
                                    <p style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '1rem' }}>{exp.period}</p>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <MapPin size={14} color="var(--primary)" /> {exp.location}
                                    </p>
                                </div>
                            </div>

                            {exp.roles ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                    {exp.roles.map((role, ri) => (
                                        <motion.div
                                            key={ri}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: ri * 0.1 }}
                                        >
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem' }}>
                                                <h4 style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 600 }}>{role.title}</h4>
                                                <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600 }}>{role.period}</span>
                                            </div>
                                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                {role.achievements.map((item, i) => (
                                                    <motion.li
                                                        key={i}
                                                        style={{ display: 'flex', gap: '1rem', color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.5' }}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                                    >
                                                        <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                                                        <span>{item}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {exp.achievements.map((item, i) => (
                                        <motion.li
                                            key={i}
                                            style={{ display: 'flex', gap: '1rem', color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.5' }}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: i * 0.05 }}
                                        >
                                            <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                                            <span>{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Experience;

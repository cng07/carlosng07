import React from 'react';
import {
    ExternalLink,
    CheckCircle2,
    Award,
    BookOpen,
    Cpu,
    Code2,
    Terminal,
    MapPin,
    Briefcase,
    GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

const Home = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <main className="container">
            {/* Hero Section */}
            <section id="home" className="section page-header-padding" style={{ textAlign: 'center' }}>
                <motion.div {...fadeIn}>
                    <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 2rem' }}>
                        <div style={{
                            position: 'absolute', inset: '-5px',
                            background: 'linear-gradient(to bottom, var(--primary), transparent)',
                            borderRadius: '50%', filter: 'blur(10px)', opacity: 0.5
                        }} />
                        <img
                            src="/profile.png"
                            alt={resumeData.name}
                            style={{
                                width: '100%', height: '100%', borderRadius: '50%',
                                objectFit: 'cover', position: 'relative', border: '2px solid var(--border)'
                            }}
                        />
                    </div>
                    <motion.h2
                        className="hero-name"
                        style={{
                            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                            marginBottom: '1rem'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {resumeData.name}
                    </motion.h2>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <span className="badge" style={{
                            display: 'inline-block',
                            color: '#fff',
                            borderColor: 'var(--primary)',
                            padding: '0.4rem 1.25rem'
                        }}>
                            Senior Quality Assurance Automation Engineer at Datacom
                        </span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                        Automating Quality <br />
                        <span style={{ color: 'var(--primary)' }}>Delivering Excellence</span>
                    </h1>
                    <p id="about" style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Hi, I'm <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Carlos Ng</span>.
                        A Senior QA Automation Engineer specialized in building robust,
                        scalable testing frameworks that accelerate delivery.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href={resumeData.linkedIn} target="_blank" rel="noreferrer" className="glass" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ backgroundColor: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px' }}>
                                <img
                                    src="/linkedin-logo.png"
                                    alt="LinkedIn Logo"
                                    style={{ height: '18px', width: 'auto' }}
                                />
                            </div>
                            LinkedIn
                        </a>
                        <a href={resumeData.github} target="_blank" rel="noreferrer" className="glass" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                                backgroundColor: '#fff',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}>
                                <img
                                    src="/github-logo.png"
                                    alt="GitHub Logo"
                                    style={{ width: '18px', height: '18px' }}
                                />
                            </div>
                            GitHub
                        </a>
                        <a href={resumeData.ieee} target="_blank" rel="noreferrer" className="glass" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <img
                                src="/ieee-logo.png"
                                alt="IEEE Logo"
                                style={{ height: '20px', width: 'auto' }}
                            />
                            IEEE Xplore
                        </a>
                        <a href={resumeData.atsqaProfile} target="_blank" rel="noreferrer" className="glass" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <img
                                src="https://astqb.org/assets/images/certified-tester-list-logo.png"
                                alt="ASTQB Logo"
                                style={{ height: '20px', width: 'auto', borderRadius: '2px' }}
                            />
                            Official U.S. List of Certified & Credentialed Software Testers™ Profile
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="section" style={{ paddingTop: '1rem' }}>
                <h2 className="section-title"><Briefcase size={28} color="var(--primary)" /> Experience</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {resumeData.experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass"
                            style={{ padding: '2rem' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{exp.company}</h3>
                                    {!exp.roles && <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.1rem' }}>{exp.role}</p>}
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <p style={{ fontWeight: 500 }}>{exp.period}</p>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.25rem' }}>
                                        <MapPin size={14} /> {exp.location}
                                    </p>
                                </div>
                            </div>

                            {exp.roles ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                    {exp.roles.map((role, ri) => (
                                        <div key={ri} style={{ borderLeft: '2px solid rgba(var(--primary-rgb), 0.2)', paddingLeft: '2rem', marginLeft: '0.25rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                                                <h4 style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 600 }}>{role.title}</h4>
                                                <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600 }}>{role.period}</span>
                                            </div>
                                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                {role.achievements.map((item, i) => (
                                                    <li key={i} style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.5' }}>
                                                        <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {exp.achievements.map((item, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.5' }}>
                                            <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="section">
                <h2 className="section-title"><Cpu size={28} color="var(--primary)" /> Technical Skills</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem'
                }}>
                    <div className="glass" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                            <CheckCircle2 size={20} color="var(--primary)" /> Test Automation
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {resumeData.skills.testAutomation.map(s => <span key={s} className="badge">{s}</span>)}
                        </div>
                    </div>
                    <div className="glass" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                            <Code2 size={20} color="var(--primary)" /> Programming Languages
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {resumeData.skills.programmingLanguages.map(s => <span key={s} className="badge">{s}</span>)}
                        </div>
                    </div>
                    <div className="glass" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                            <Terminal size={20} color="var(--primary)" /> CI/CD
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {resumeData.skills.cicd.map(s => <span key={s} className="badge">{s}</span>)}
                        </div>
                    </div>
                    <div className="glass" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                            <MapPin size={20} color="var(--primary)" /> Manual Testing
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {resumeData.skills.manualTesting.map(s => <span key={s} className="badge">{s}</span>)}
                        </div>
                    </div>
                    <div className="glass" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                            <Cpu size={20} color="var(--primary)" /> Other Tools
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {resumeData.skills.otherTools.map(s => <span key={s} className="badge">{s}</span>)}
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications & Publications */}
            <section id="certifications" className="section">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                    <div>
                        <h2 className="section-title"><Award size={28} color="var(--primary)" /> Certifications</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {resumeData.certifications.map((cert, i) => (
                                <div key={i} className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '0.2rem', textDecoration: 'underline' }}>{cert.title}</h4>
                                            {cert.subtitle && <p style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>{cert.subtitle}</p>}
                                            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600 }}>{cert.issuer}</p>
                                        </div>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontWeight: 600, marginTop: '0.2rem' }}>{cert.period}</span>
                                    </div>

                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        {cert.idLabel || 'Credential ID'}: {cert.link ? (
                                            <a href={cert.link} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                                                {cert.credentialId}
                                            </a>
                                        ) : cert.credentialId}
                                    </p>

                                    {cert.additionalLinks && cert.additionalLinks.map((al, idx) => (
                                        <p key={idx} style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
                                            <a href={al.url} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>{al.label}</a>
                                        </p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="section-title"><BookOpen size={28} color="var(--primary)" /> Publications</h2>
                        {resumeData.publications.map((pub, i) => (
                            <div key={i} className="glass" style={{ padding: '1.5rem' }}>
                                <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>{pub.title}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Published in {pub.publisher}, {pub.date}</p>
                                <a href={pub.link} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                                    View Paper <ExternalLink size={14} />
                                </a>
                            </div>
                        ))}

                        <h2 className="section-title" style={{ marginTop: '3rem' }}><GraduationCap size={28} color="var(--primary)" /> Education</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {resumeData.education.map((edu, i) => (
                                <div key={i} className="glass" style={{ padding: '2rem' }}>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                                        {edu.type}
                                    </p>
                                    <h3 style={{ color: 'var(--text-main)', fontSize: '1.4rem', marginBottom: '0.25rem' }}>{edu.school}</h3>
                                    {edu.degree && <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>{edu.degree}</h4>}

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <Terminal size={14} color="var(--primary)" /> {edu.period}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <MapPin size={14} color="var(--primary)" /> {edu.address}
                                        </span>
                                    </div>

                                    {edu.highlights && (
                                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                                            {edu.highlights.map((h, idx) => (
                                                <li key={idx} style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                                                    <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                                                    {h}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {edu.scholarship && (
                                        <div style={{ marginTop: '1.5rem', padding: '1rem', borderLeft: '3px solid var(--primary)', background: 'rgba(var(--primary-rgb), 0.05)', borderRadius: '0 8px 8px 0' }}>
                                            <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>College scholarship: {edu.scholarship.name}</p>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <MapPin size={14} /> {edu.scholarship.address}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;

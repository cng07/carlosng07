import React from 'react';
import {
    Github,
    Linkedin,
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
            <section id="home" className="section" style={{ paddingTop: '8rem', textAlign: 'center' }}>
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
                    <span className="badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                        Senior Quality Assurance Automation Engineer at Datacom
                    </span>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                        Automating Quality <br />
                        <span style={{ color: 'var(--primary)' }}>Delivering Excellence</span>
                    </h1>
                    <p id="about" style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Hi, I'm <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{resumeData.name}</span>.
                        A Senior QA Automation Engineer specialized in building robust,
                        scalable testing frameworks that accelerate delivery.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <a href={resumeData.linkedIn} className="glass" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Linkedin size={20} /> LinkedIn
                        </a>
                        <a href={resumeData.github} className="glass" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Github size={20} /> GitHub
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="section">
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
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{exp.role}</h3>
                                    <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.1rem' }}>{exp.company}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontWeight: 500 }}>{exp.period}</p>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.25rem' }}>
                                        <MapPin size={14} /> {exp.location}
                                    </p>
                                </div>
                            </div>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {exp.achievements.map((item, i) => (
                                    <li key={i} style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)' }}>
                                        <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="section">
                <h2 className="section-title"><Cpu size={28} color="var(--primary)" /> Technical Skills</h2>
                <div style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', display: 'grid', gap: '1.5rem' }}>
                    <div className="glass" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Terminal size={20} color="var(--primary)" /> Automation
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {resumeData.skills.automation.map(s => <span key={s} className="badge">{s}</span>)}
                        </div>
                    </div>
                    <div className="glass" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Code2 size={20} color="var(--primary)" /> Languages
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {resumeData.skills.languages.map(s => <span key={s} className="badge">{s}</span>)}
                        </div>
                    </div>
                    <div className="glass" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Cpu size={20} color="var(--primary)" /> Tools & Others
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {[...resumeData.skills.tools, ...resumeData.skills.other].map(s => <span key={s} className="badge">{s}</span>)}
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
                                <div key={i} className="glass" style={{ padding: '1.25rem' }}>
                                    <h4 style={{ color: 'var(--text-main)', marginBottom: '0.25rem' }}>{cert.title}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{cert.issuer}</p>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        Credential ID: {cert.link ? (
                                            <a href={cert.link} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                                                {cert.credentialId}
                                            </a>
                                        ) : cert.credentialId}
                                    </p>
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
                        {resumeData.education.map((edu, i) => (
                            <div key={i} className="glass" style={{ padding: '1.5rem' }}>
                                <h4 style={{ marginBottom: '0.25rem' }}>{edu.degree}</h4>
                                <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{edu.school}</p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{edu.period}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;

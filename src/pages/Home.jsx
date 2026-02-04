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
    GraduationCap,
    Bot,
    Search,
    Infinity,
    Wrench
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
                            fontSize: 'clamp(1.8rem, 8vw, 4rem)',
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
                            background: 'var(--primary-glow)',
                            color: '#fff',
                            borderColor: 'var(--primary)',
                            padding: '0.4rem 1.25rem',
                            boxShadow: 'none'
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
                            <div className="linkedin-logo-container">
                                <img
                                    src="/linkedin-logo.png"
                                    alt="LinkedIn Logo"
                                />
                            </div>
                            LinkedIn
                        </a>
                        <a href={resumeData.github} target="_blank" rel="noreferrer" className="glass" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div className="github-logo-container">
                                <img
                                    src="/github-logo.png"
                                    alt="GitHub Logo"
                                />
                            </div>
                            GitHub
                        </a>
                        <a href={resumeData.ieee} target="_blank" rel="noreferrer" className="glass" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div className="social-logo-container">
                                <img
                                    src="/ieee-logo.png"
                                    alt="IEEE Logo"
                                    className="external-logo"
                                />
                            </div>
                            IEEE Xplore
                        </a>
                        <a href={resumeData.atsqaProfile} target="_blank" rel="noreferrer" className="glass" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div className="social-logo-container">
                                <img
                                    src="https://astqb.org/assets/images/certified-tester-list-logo.png"
                                    alt="ASTQB Logo"
                                    className="external-logo"
                                    style={{ borderRadius: '2px' }}
                                />
                            </div>
                            Official U.S. List of Certified & Credentialed Software Testers™ Profile
                        </a>
                    </div>
                </motion.div>
            </section>

             {/* Skills Section */}
            <section id="skills" className="section">
                <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <Cpu size={28} color="var(--primary)" /> Technical Skills
                </motion.h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {[
                        { icon: Bot, title: 'Test Automation', skills: resumeData.skills.testAutomation },
                        { icon: Code2, title: 'Programming Languages', skills: resumeData.skills.programmingLanguages },
                        { icon: Infinity, title: 'CI/CD', skills: resumeData.skills.cicd },
                        { icon: Search, title: 'Manual Testing', skills: resumeData.skills.manualTesting },
                        { icon: Wrench, title: 'Other Tools', skills: resumeData.skills.otherTools }
                    ].map((category, idx) => (
                        <motion.div
                            key={category.title}
                            className="glass"
                            style={{ padding: '2rem' }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        >
                            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                                <category.icon size={20} color="var(--primary)" /> {category.title}
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {category.skills.map(s => (
                                    <motion.span
                                        key={s.name}
                                        className="badge"
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                    >
                                        {s.logos ? (
                                            s.logos.map((logo, idx) => (
                                                <img key={idx} src={logo} alt={s.name} style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                            ))
                                        ) : (
                                            <img src={s.logo} alt={s.name} style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        )}
                                        {s.name}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="section" style={{ paddingTop: '1rem' }}>
                <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <Briefcase size={28} color="var(--primary)" /> Experience
                </motion.h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {resumeData.experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
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
                                            {exp.website ? (
                                                <a href={exp.website} target="_blank" rel="noreferrer" style={{ display: 'block', height: '100%' }}>
                                                    <img 
                                                        src={exp.logo} 
                                                        alt={`${exp.company} logo`}
                                                    />
                                                </a>
                                            ) : (
                                                <img 
                                                    src={exp.logo} 
                                                    alt={`${exp.company} logo`}
                                                />
                                            )}
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
            </section>

            {/* Certifications & Publications */}
            <section id="certifications" className="section">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                    <div>
                        <motion.h2 
                            className="section-title"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <Award size={28} color="var(--primary)" /> Certifications
                        </motion.h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {resumeData.certifications.map((cert, i) => (
                                <motion.div
                                    key={i}
                                    className="glass"
                                    style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                                >
                                    <div style={{ marginBottom: '0.5rem' }}>
                                        <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '0.2rem', textDecoration: 'underline' }}>{cert.title}</h4>
                                        {cert.subtitle && <p style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>{cert.subtitle}</p>}
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {cert.period}
                                            {cert.expired && (
                                                <span style={{
                                                    fontSize: '0.7rem',
                                                    color: '#fff',
                                                    background: 'rgba(239, 68, 68, 0.7)',
                                                    padding: '0.1rem 0.6rem',
                                                    borderRadius: '4px',
                                                    border: '1px solid rgba(239, 68, 68, 0.5)',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.05em',
                                                    fontWeight: 700
                                                }}>
                                                    Expired
                                                </span>
                                            )}
                                            {cert.noExpiry && (
                                                <span style={{
                                                    fontSize: '0.7rem',
                                                    color: '#fff',
                                                    background: 'rgba(59, 130, 246, 0.7)',
                                                    padding: '0.1rem 0.6rem',
                                                    borderRadius: '4px',
                                                    border: '1px solid rgba(59, 130, 246, 0.5)',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.05em',
                                                    fontWeight: 700
                                                }}>
                                                    No Expiry
                                                </span>
                                            )}
                                        </p>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600 }}>{cert.issuer}</p>
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
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <motion.h2 
                            className="section-title"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <BookOpen size={28} color="var(--primary)" /> Publications
                        </motion.h2>
                        {resumeData.publications.map((pub, i) => (
                            <motion.div
                                key={i}
                                className="glass"
                                style={{ padding: '1.5rem', marginBottom: '1.5rem' }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                            >
                                <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>{pub.title}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Published in {pub.publisher}, {pub.date}</p>
                                <a href={pub.link} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                                    View Paper <ExternalLink size={14} />
                                </a>
                            </motion.div>
                        ))}

                        <motion.h2 
                            className="section-title"
                            style={{ marginTop: '3rem' }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <GraduationCap size={28} color="var(--primary)" /> Education
                        </motion.h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {resumeData.education.map((edu, i) => (
                                <motion.div
                                    key={i}
                                    className="glass"
                                    style={{ padding: '2rem' }}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                                >
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                                        {edu.type}
                                    </p>
                                    <h3 style={{ color: 'var(--text-main)', fontSize: '1.4rem', marginBottom: '0.25rem' }}>{edu.school}</h3>
                                    {edu.degree && <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>{edu.degree}</h4>}

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        <span style={{ fontWeight: 600 }}>{edu.period}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <MapPin size={14} color="var(--primary)" /> {edu.address}
                                        </span>
                                    </div>

                                    {edu.highlights && (
                                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                                            {edu.highlights.map((h, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.4rem' }}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                                >
                                                    <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                                                    {h}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    )}

                                    {edu.scholarship && (
                                        <motion.div
                                            style={{ marginTop: '1.5rem', padding: '1rem', borderLeft: '3px solid var(--primary)', background: 'rgba(var(--primary-rgb), 0.05)', borderRadius: '0 8px 8px 0' }}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>College scholarship: {edu.scholarship.name}</p>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '0.4rem', lineHeight: '1.4' }}>
                                                <MapPin size={14} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} /> {edu.scholarship.address}
                                            </p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;

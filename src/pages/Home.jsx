import React from 'react';
import { Link } from 'react-router-dom';
import {
    ExternalLink,
    Award,
    BookOpen,
    Cpu,
    Code2,
    Terminal,
    MapPin,
    Briefcase,
    Bot,
    Search,
    Infinity,
    Wrench,
    Sparkles,
    Github,
    FolderGit2,
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
        <div className="container">
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
                            width="150"
                            height="150"
                            fetchPriority="high"
                            decoding="async"
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
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            LinkedIn
                        </a>
                        <a href={resumeData.github} target="_blank" rel="noreferrer" className="glass" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div className="github-logo-container">
                                <img
                                    src="/github-logo.png"
                                    alt="GitHub Logo"
                                    loading="lazy"
                                    decoding="async"
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
                                    loading="lazy"
                                    decoding="async"
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
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            Official U.S. List of Certified &amp; Credentialed Software Testers™ Profile
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Featured Projects */}
            <section id="featured-projects" className="section">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <FolderGit2 size={28} color="var(--primary)" /> Featured Projects
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {[
                        {
                            title: 'Portfolio Automation (TypeScript)',
                            description: 'Playwright + TypeScript framework with Page Object Model, Docker containerization, and multi-platform CI/CD support via Jenkins & GitHub Actions.',
                            tech: ['Playwright', 'TypeScript', 'Docker', 'Jenkins', 'GitHub Actions'],
                            github: 'https://github.com/cng07/playwright_portfolio_automation_typescript',
                        },
                        {
                            title: 'Portfolio Automation (JavaScript)',
                            description: 'Playwright automation suite covering navigation, cross-browser testing, and link integrity checks with CI/CD via GitHub Actions.',
                            tech: ['Playwright', 'JavaScript', 'GitHub Actions'],
                            github: 'https://github.com/cng07/playwright_portfolio_automation_javascript',
                        },
                    ].map((project, idx) => (
                        <motion.div
                            key={idx}
                            className="glass"
                            style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -6, transition: { duration: 0.25 } }}
                        >
                            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: 1.3 }}>{project.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>{project.description}</p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                {project.tech.map(t => (
                                    <span key={t} className="badge" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', background: 'rgba(59,130,246,0.1)', color: 'var(--primary)', borderColor: 'var(--primary)' }}>
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                    padding: '0.55rem 1.1rem', borderRadius: '7px',
                                    background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                                    color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.875rem',
                                    fontWeight: 600, transition: 'all 0.2s ease', alignSelf: 'flex-start'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-glow)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                            >
                                <Github size={15} /> Repository
                            </a>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    style={{ textAlign: 'center', marginTop: '2.5rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Link
                        to="/projects"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.8rem 2rem',
                            background: 'var(--primary-glow)', border: '1px solid var(--primary)',
                            borderRadius: '8px', color: '#fff', fontWeight: 600,
                            fontSize: '0.95rem', textDecoration: 'none', transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                    >
                        View All Projects <ExternalLink size={16} />
                    </Link>
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
                        { icon: Wrench, title: 'Other Tools', skills: resumeData.skills.otherTools },
                        { icon: Sparkles, title: 'AI Tools', skills: resumeData.skills.aiTools }
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
                                                <img key={idx} src={logo} alt={s.name} loading="lazy" decoding="async" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                            ))
                                        ) : (
                                            <img src={s.logo} alt={s.name} loading="lazy" decoding="async" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                        )}
                                        {s.name}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Highlights: Certifications & Publications */}
            <section id="certifications" className="section">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>

                    {/* Key Certification Spotlight */}
                    <div>
                        <motion.h2
                            className="section-title"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6 }}
                        >
                            <Award size={28} color="var(--primary)" /> Certifications
                        </motion.h2>

                        {/* Show only the primary (ISTQB) cert as a spotlight */}
                        {resumeData.certifications.slice(0, 1).map((cert, i) => (
                            <motion.div
                                key={i}
                                className="glass"
                                style={{
                                    padding: '1.75rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem',
                                    borderLeft: '3px solid var(--primary)'
                                }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <Award size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                                    <h4 style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: 1.3 }}>{cert.title}</h4>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>{cert.issuer}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cert.period}</span>
                                    {cert.noExpiry && (
                                        <span style={{
                                            fontSize: '0.7rem', color: '#fff',
                                            background: 'rgba(59, 130, 246, 0.7)',
                                            padding: '0.1rem 0.55rem', borderRadius: '4px',
                                            border: '1px solid rgba(59, 130, 246, 0.5)',
                                            textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700
                                        }}>No Expiry</span>
                                    )}
                                </div>
                                {cert.link && (
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', fontWeight: 600, marginTop: '0.25rem' }}
                                    >
                                        View Certificate <ExternalLink size={13} />
                                    </a>
                                )}
                            </motion.div>
                        ))}

                        <motion.div
                            style={{ marginTop: '1.25rem', textAlign: 'center' }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <Link
                                to="/certifications"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                style={{
                                    color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem',
                                    textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem'
                                }}
                            >
                                View All {resumeData.certifications.length} Certifications <ExternalLink size={13} />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Publication */}
                    <div>
                        <motion.h2
                            className="section-title"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
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
                                viewport={{ once: true, margin: '-100px' }}
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
                    </div>
                </div>
            </section>

            {/* Experience Timeline Section */}
            <section id="experience" className="section" style={{ paddingTop: '1rem' }}>
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <Briefcase size={28} color="var(--primary)" /> Experience
                </motion.h2>

                {/* Vertical timeline */}
                <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                    {/* Timeline spine */}
                    <div style={{
                        position: 'absolute',
                        left: '7px',
                        top: '8px',
                        bottom: '8px',
                        width: '2px',
                        background: 'linear-gradient(to bottom, var(--primary), transparent)',
                        borderRadius: '2px'
                    }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {resumeData.experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                style={{ position: 'relative', paddingBottom: index < resumeData.experience.length - 1 ? '2rem' : '0' }}
                            >
                                {/* Timeline dot */}
                                <div style={{
                                    position: 'absolute',
                                    left: 'calc(-2rem + 1px)',
                                    top: index < resumeData.experience.length - 1 ? 'calc(50% - 1rem)' : '50%',
                                    width: '14px',
                                    height: '14px',
                                    borderRadius: '50%',
                                    background: index === 0 ? 'var(--primary)' : 'var(--background)',
                                    border: '2px solid var(--primary)',
                                    boxShadow: index === 0 ? '0 0 8px var(--primary)' : 'none',
                                    transform: 'translateY(-50%)',
                                    zIndex: 1
                                }} />

                                <motion.div
                                    className="glass"
                                    style={{
                                        padding: '1.25rem 1.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        flexWrap: 'wrap'
                                    }}
                                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                                >
                                    {/* Company logo */}
                                    {exp.logo && (
                                        <div className="company-logo-container">
                                            {exp.website ? (
                                                <a href={exp.website} target="_blank" rel="noreferrer" style={{ display: 'block', height: '100%' }}>
                                                    <img
                                                        src={exp.logo}
                                                        alt={`${exp.company} logo`}
                                                        loading="lazy"
                                                        decoding="async"
                                                    />
                                                </a>
                                            ) : (
                                                <img
                                                    src={exp.logo}
                                                    alt={`${exp.company} logo`}
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                            )}
                                        </div>
                                    )}

                                    {/* Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap' }}>
                                            <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)', whiteSpace: 'nowrap' }}>
                                                {exp.website ? (
                                                    <a href={exp.website} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                                        {exp.company}
                                                    </a>
                                                ) : exp.company}
                                            </span>
                                            {index === 0 && (
                                                <span style={{
                                                    fontSize: '0.7rem',
                                                    color: '#fff',
                                                    background: 'var(--primary-glow)',
                                                    padding: '0.1rem 0.55rem',
                                                    borderRadius: '4px',
                                                    border: '1px solid var(--primary)',
                                                    fontWeight: 700,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.05em'
                                                }}>Current</span>
                                            )}
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600, margin: '0.1rem 0' }}>
                                            {exp.roles ? exp.roles[0].title : exp.role}
                                        </p>
                                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                                                {exp.period}
                                            </span>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <MapPin size={11} color="var(--primary)" /> {exp.location}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    style={{ textAlign: 'center', marginTop: '2.5rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Link
                        to="/experience"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.8rem 2rem',
                            background: 'var(--primary-glow)',
                            border: '1px solid var(--primary)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                    >
                        View Full Experience <ExternalLink size={16} />
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;

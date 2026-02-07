import React from 'react';
import { ExternalLink, Github, Code2, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const projects = [
        {
            id: 1,
            title: "Portfolio Website Automation",
            description: "Comprehensive Playwright automation test suite for this portfolio website. Tests critical user flows including navigation, form submissions, and responsive design across browsers.",
            tech: ["Playwright", "JavaScript", "GitHub Actions", "Cypress Report", "Web Automation"],
            highlights: [
                "Cross-browser testing (Chrome, Firefox, Safari, Edge)",
                "Link integrity checks",
                "CI/CD integration with GitHub Actions"
            ],
            github: "https://github.com/cng07/playwright_portfolio_automation_javascript",
            features: [
                {
                    icon: <Code2 size={20} />,
                    label: "Modern Stack",
                    value: "Playwright + JavaScript ES6+"
                },
                {
                    icon: <Target size={20} />,
                    label: "Test Coverage",
                    value: "E2E & Responsive Design"
                },
                {
                    icon: <Zap size={20} />,
                    label: "Execution",
                    value: "Fast & Reliable"
                }
            ],
            status: "Active"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="section container page-header-padding">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="section-title">Projects</h1>

                {/* Projects Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            className="glass"
                            style={{
                                padding: '2rem',
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Header */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{project.title}</h3>
                                    <span className="badge" style={{
                                        background: 'var(--primary-glow)',
                                        color: '#fff',
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.75rem',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {project.status}
                                    </span>
                                </div>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
                                    {project.description}
                                </p>
                            </div>

                            {/* Highlights */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                                    Highlights
                                </h4>
                                <ul style={{ list: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {project.highlights.map((highlight, idx) => (
                                        <li key={idx} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                            <span style={{ color: 'var(--primary)', marginTop: '0.2rem' }}>→</span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Features */}
                            <div style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                {project.features.map((feature, idx) => (
                                    <div key={idx} style={{ textAlign: 'center' }}>
                                        <div style={{ color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                                            {feature.icon}
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                                            {feature.label}
                                        </p>
                                        <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                                            {feature.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Technologies */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                                    Technologies
                                </h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {project.tech.map((tech, idx) => (
                                        <span key={idx} className="badge" style={{
                                            background: 'rgba(59, 130, 246, 0.1)',
                                            color: 'var(--primary)',
                                            borderColor: 'var(--primary)',
                                            fontSize: '0.8rem',
                                            padding: '0.4rem 0.75rem'
                                        }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Links */}
                            <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="glass"
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem 1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        fontSize: '0.95rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--primary-glow)';
                                        e.currentTarget.style.borderColor = 'var(--primary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '';
                                        e.currentTarget.style.borderColor = '';
                                    }}
                                >
                                    <Github size={20} />
                                    Repository
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Coming Soon Section */}
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <motion.div {...fadeIn}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>More Projects Coming</h2>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                            I'm continuously working on new automation frameworks, testing utilities, and performance optimization tools. Check back soon for updates!
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Projects;

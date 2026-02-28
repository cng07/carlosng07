import React from 'react';
import { ExternalLink, Github, Code2, Target, Zap, Bot, Database, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

const Projects = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const getTechLogo = (techName) => {
        // defined map for specific cases not in resumeData
        const customLogos = {
            "Web Automation": null,
            "Page Object Model": null,
            "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
            "CSV": null,
            "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            "pytest": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytest/pytest-original.svg"
        };

        if (techName in customLogos) return customLogos[techName];

        // Search in resumeData
        for (const category of Object.values(resumeData.skills)) {
            if (Array.isArray(category)) {
                const found = category.find(s => s && s.name && (s.name === techName || s.name.includes(techName)));
                if (found) return found.logo;
            }
        }
        return null;
    };

    const projects = [
        {
            id: 1,
            title: "Portfolio Website Automation (JavaScript)",
            description: "Comprehensive Playwright automation test suite for this portfolio website. Tests critical user flows including navigation, form submissions, and responsive design across browsers.",
            tech: ["Playwright", "JavaScript", "Node.js", "GitHub Actions", "Web Automation"],
            highlights: [
                "Cross-browser testing (Chrome, Firefox, Safari, Edge)",
                "Link integrity checks",
                "CI/CD integration with GitHub Actions"
            ],
            github: "https://github.com/cng07/playwright_portfolio_automation_javascript",

            status: "Active"
        },
        {
            id: 2,
            title: "Portfolio Website Automation (TypeScript)",
            description: "Advanced Playwright automation framework using TypeScript with containerization and CI/CD support. Implements Page Object Model (POM) architecture for better scalability, type safety, and maintainability. Features Docker containerization and flexible CI/CD options with Jenkins and GitHub Actions.",
            tech: ["Playwright", "TypeScript", "Node.js", "GitHub Actions", "Jenkins", "Docker", "Web Automation"],
            highlights: [
                "Strongly typed test architecture with TypeScript",
                "Page Object Model (POM) implementation",
                "Docker containerization for consistent test environments",
                "Multi-platform CI/CD support (Jenkins & GitHub Actions)"
            ],
            github: "https://github.com/cng07/playwright_portfolio_automation_typescript",

            status: "Active"
        },
        {
            id: 3,
            title: "Portfolio Website Automation (Python)",
            description: "UI automation for this portfolio site using Playwright and pytest. Implements a Page Object Model architecture covering Home and Projects page navigation, heading assertions, and HTML report generation.",
            tech: ["Playwright", "Python", "pytest", "Web Automation"],
            highlights: [
                "Page Object Model (POM) for Home & Projects pages",
                "pytest + playwright integration",
                "HTML report generation via pytest-html"
            ],
            github: "https://github.com/cng07/playwright_portfolio_automation_python",
            status: "Active"
        },
        {
            id: 4,
            title: "QA Practice Framework",
            description: "Automated end-to-end test suites written in TypeScript using Playwright. Features a structured approach to testing web applications with reusable components and data-driven tests.",
            tech: ["Playwright", "TypeScript", "Node.js", "Web Automation"],
            highlights: [
                "Data-driven testing via CSV integration",
                "Page Object Model (POM) architecture",
                "Automated form validation & edge case handling"
            ],
            github: "https://github.com/cng07/qaPractice",
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
                    className="projects-grid"
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
                                    <h3 style={{ fontSize: '1.35rem', margin: 0, lineHeight: 1.3 }}>{project.title}</h3>
                                    <span className="badge" style={{
                                        background: 'var(--primary-glow)',
                                        color: '#fff',
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.75rem',
                                        whiteSpace: 'nowrap',
                                        marginLeft: '1rem'
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
                                        <li key={idx} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ color: 'var(--primary)' }}>→</span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>



                            {/* Technologies */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                                    Technologies
                                </h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {project.tech.map((tech, idx) => {
                                        const logo = getTechLogo(tech);
                                        return (
                                            <span key={idx} className="badge" style={{
                                                background: 'rgba(59, 130, 246, 0.1)',
                                                color: 'var(--primary)',
                                                borderColor: 'var(--primary)',
                                                fontSize: '0.85rem',
                                                padding: '0.5rem 0.85rem',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}>
                                                {logo ? (
                                                    <img src={logo} alt={tech} style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                                                ) : (
                                                    <Layout size={14} />
                                                )}
                                                {tech}
                                            </span>
                                        );
                                    })}
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
                            Check back soon for updates!
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Projects;

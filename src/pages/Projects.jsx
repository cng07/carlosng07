import React, { useState } from 'react';
import { ExternalLink, Github, Code2, Target, Zap, Bot, Database, Layout, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

const Projects = () => {
    const [selectedProjectId, setSelectedProjectId] = useState(1);

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
            status: "Active",
            architecture: {
                description: "End-to-end test automation using Playwright and JavaScript with cross-browser support and GitHub Actions CI/CD integration.",
                frameworkStructure: [
                    "tests/",
                    "├── pages/          # Page Object Model classes",
                    "├── specs/          # Test specifications",
                    "├── utils/          # Helper functions",
                    "├── fixtures/       # Static test data",
                    "├── config/         # Configuration & constants",
                    "└── reports/        # Test results & artifacts"
                ],
                toolsUsed: [
                    "Playwright - Browser automation & testing",
                    "JavaScript - Test script language",
                    "Node.js - Runtime & package management",
                    "GitHub Actions - CI/CD pipeline"
                ],
                cicdPipeline: [
                    "GitHub Actions workflow triggers on push/PR",
                    "Tests run across multiple browsers (Chrome, Firefox, Safari, Edge)",
                    "Parallel test execution for faster feedback",
                    "Automated reporting with HTML artifacts"
                ],
                testLayers: [
                    "UI E2E Tests - Complete user workflows",
                    "Navigation Tests - Link integrity validation",
                    "Responsive Tests - Cross-browser compatibility"
                ]
            }
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
            status: "Active",
            architecture: {
                description: "Enterprise-grade test automation framework using TypeScript with Page Object Model, Docker containerization, and dual CI/CD pipeline support (Jenkins & GitHub Actions).",
                frameworkStructure: [
                    "src/",
                    "├── pages/               # Page Object Model classes",
                    "├── tests/               # Test specifications & suites",
                    "├── fixtures/            # Test data & fixtures",
                    "├── utils/               # Helper functions & utilities",
                    "├── config/              # Configuration management",
                    "├── reporters/           # Custom reporters",
                    "└── reports/             # Test results & artifacts"
                ],
                toolsUsed: [
                    "Playwright - Browser automation & assertions",
                    "TypeScript - Type-safe, scalable test code",
                    "Node.js - Runtime environment",
                    "Docker - Test environment containerization",
                    "Jenkins & GitHub Actions - CI/CD pipelines"
                ],
                cicdPipeline: [
                    "Docker container builds for isolated test environments",
                    "GitHub Actions for pull request validation",
                    "Jenkins for scheduled & manual test runs",
                    "Parallel test execution across multiple workers",
                    "HTML & JSON report generation with artifacts storage"
                ],
                testLayers: [
                    "Unit Tests - Utility function validation",
                    "Integration Tests - Page Object interactions",
                    "E2E Tests - Complete user workflows & scenarios"
                ]
            }
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
            status: "Active",
            architecture: {
                description: "Python-based test automation using Playwright and pytest with Page Object Model architecture and HTML report generation.",
                frameworkStructure: [
                    "tests/",
                    "├── pages/           # Page Object Model classes",
                    "├── test_cases/      # Test specifications",
                    "├── conftest.py      # pytest configuration & fixtures",
                    "├── utils/           # Helper functions",
                    "├── data/            # Test data files",
                    "└── reports/         # HTML test reports"
                ],
                toolsUsed: [
                    "Playwright - Cross-browser automation",
                    "Python - Test scripting language",
                    "pytest - Testing framework & runner",
                    "pytest-html - HTML report generation"
                ],
                cicdPipeline: [
                    "Local: pytest -v (verbose execution)",
                    "pytest-html generates comprehensive reports",
                    "CI/CD integration ready for GitHub Actions",
                    "Automated test discovery & execution",
                    "HTML artifacts for result visualization"
                ],
                testLayers: [
                    "UI Page Tests - Page object validation",
                    "Navigation Tests - Link & page routing",
                    "Assertion Tests - Content & element validation"
                ]
            }
        },
        {
            id: 4,
            title: "Portfolio Website Automation (C#)",
            description: "Playwright test automation framework using C# with NUnit. Implements advanced test scenarios with strong typing and robust assertion strategies.",
            tech: ["Playwright", "C#", "NUnit", ".NET"],
            highlights: [
                "NUnit testing framework integration",
                "Strong type safety with C#",
                "Advanced test assertions & validation",
                "Async/await pattern for test execution"
            ],
            github: "https://github.com/cng07/playwright_portfolio_automation_csharp",
            status: "Active",
            architecture: {
                description: "C#-based test automation framework using Playwright with NUnit testing framework, featuring async test execution and strong type safety.",
                frameworkStructure: [
                    "PlaywrightTests/",
                    "├── Pages/           # Page Object Model classes",
                    "├── Tests/           # NUnit test suites",
                    "├── Fixtures/        # Test fixtures & setup",
                    "├── Utilities/       # Helper functions & extensions",
                    "├── Config/          # Configuration management",
                    "└── Reports/         # Test results & logs"
                ],
                toolsUsed: [
                    "Playwright - Browser automation",
                    "C# - Type-safe test language",
                    ".NET - Framework & runtime",
                    "NUnit - Testing framework"
                ],
                cicdPipeline: [
                    "Build: dotnet build command",
                    "Test: dotnet test with NUnit runner",
                    "GitHub Actions integration for CI/CD",
                    "Parallel test execution support",
                    "XML & HTML report generation"
                ],
                testLayers: [
                    "Unit Tests - Helper function validation",
                    "Integration Tests - Page Object interactions",
                    "E2E Tests - Complete user scenarios"
                ]
            }
        },
        {
            id: 5,
            title: "Portfolio Website Automation (Java)",
            description: "Comprehensive Playwright test automation suite built with Java using TestNG framework. Features robust test execution, parallel execution, and detailed reporting capabilities.",
            tech: ["Playwright", "Java", "TestNG", "Maven"],
            highlights: [
                "TestNG framework with parameterized tests",
                "Maven build automation",
                "Parallel test execution across multiple threads",
                "Customizable test reports & logging"
            ],
            github: "https://github.com/cng07/playwright_portfolio_automation_java",
            status: "Active",
            architecture: {
                description: "Java-based test automation framework using Playwright and TestNG with Maven, supporting parallel execution and comprehensive reporting.",
                frameworkStructure: [
                    "src/test/java/",
                    "├── pages/           # Page Object Model classes",
                    "├── tests/           # TestNG test classes",
                    "├── listeners/       # Custom test listeners",
                    "├── utils/           # Helper utilities",
                    "├── data/            # Test data & fixtures",
                    "└── reports/         # Test results & logs"
                ],
                toolsUsed: [
                    "Playwright - Browser automation",
                    "Java - Test programming language",
                    "TestNG - Testing framework",
                    "Maven - Build & dependency management"
                ],
                cicdPipeline: [
                    "Maven build & compile: mvn clean test",
                    "TestNG parallel execution (threads/methods)",
                    "GitHub Actions for automated testing",
                    "JUnit XML reports for CI/CD integration",
                    "HTML report generation with Extent Reports"
                ],
                testLayers: [
                    "Unit Tests - Utility validation",
                    "Integration Tests - Page interactions",
                    "E2E Tests - Full workflow scenarios"
                ]
            }
        },
        {
            id: 6,
            title: "QA Practice Framework",
            description: "Automated end-to-end test suites written in TypeScript using Playwright. Features a structured approach to testing web applications with reusable components and data-driven tests.",
            tech: ["Playwright", "TypeScript", "Node.js", "Web Automation"],
            highlights: [
                "Data-driven testing via CSV integration",
                "Page Object Model (POM) architecture",
                "Automated form validation & edge case handling"
            ],
            github: "https://github.com/cng07/qaPractice",
            status: "Active",
            architecture: {
                description: "Data-driven test automation framework using TypeScript and Playwright with CSV-based test data management.",
                frameworkStructure: [
                    "src/",
                    "├── pages/          # Page Object Model classes",
                    "├── tests/          # Test specs and scenarios",
                    "├── fixtures/       # Test data and fixtures",
                    "├── utils/          # Helper functions & utilities",
                    "├── config/         # Configuration files",
                    "└── reports/        # HTML test reports"
                ],
                toolsUsed: [
                    "Playwright - Browser automation",
                    "TypeScript - Type-safe test code",
                    "Node.js - Runtime environment",
                    "CSV - Data-driven test inputs"
                ],
                cicdPipeline: [
                    "Local: npm run test",
                    "GitHub Actions trigger on push/PR",
                    "Parallel test execution",
                    "HTML report generation & artifacts"
                ],
                testLayers: [
                    "Unit Tests - Utility functions validation",
                    "Integration Tests - Page Object interactions",
                    "E2E Tests - Complete user workflows"
                ]
            }
        }
    ];

    const selectedProject = projects.find(p => p.id === selectedProjectId);

    return (
        <div className="section container page-header-padding">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="section-title" style={{ marginBottom: '2rem' }}>Projects</h1>

                {/* Mobile Horizontal Tab Bar */}
                <div className="projects-tab-bar">
                    {projects.map((project) => (
                        <button
                            key={project.id}
                            className={`projects-tab-btn ${selectedProjectId === project.id ? 'active' : ''}`}
                            onClick={() => setSelectedProjectId(project.id)}
                        >
                            {project.title}
                        </button>
                    ))}
                </div>

                {/* Two Column Layout - Responsive */}
                <div className="projects-layout" style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(280px, 0.25fr) 1fr',
                    gap: '2rem',
                    minHeight: '600px',
                    alignItems: 'start'
                }}>
                    {/* Left Sidebar - Project List (desktop only) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="projects-sidebar"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            position: 'sticky',
                            top: '2rem'
                        }}
                    >
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                            Projects
                        </p>
                        {projects.map((project) => (
                            <motion.button
                                key={project.id}
                                onClick={() => {
                                    setSelectedProjectId(project.id);
                                    setIsMobileSidebarOpen(false);
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ x: 4 }}
                                style={{
                                    padding: '1rem',
                                    background: selectedProjectId === project.id ? 'var(--primary)' : 'transparent',
                                    color: selectedProjectId === project.id ? 'var(--text-on-primary)' : 'var(--text-main)',
                                    border: selectedProjectId === project.id ? 'none' : '1px solid var(--border)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.3s ease',
                                    fontSize: '0.95rem',
                                    fontWeight: selectedProjectId === project.id ? 600 : 500,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedProjectId !== project.id) {
                                        e.currentTarget.style.background = 'var(--surface-soft)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedProjectId !== project.id) {
                                        e.currentTarget.style.background = 'transparent';
                                    }
                                }}
                            >
                                <span>{project.title}</span>
                                {selectedProjectId === project.id && <ChevronRight size={16} />}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Right Content - Project Details */}
                    {selectedProject && (
                        <motion.div
                            key={selectedProject.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="projects-content"
                            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                        >
                            {/* Project Header */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                    <h2 style={{ fontSize: '1.8rem', margin: 0, lineHeight: 1.3, flex: '1 1 auto', minWidth: 0 }}>
                                        {selectedProject.title}
                                    </h2>
                                    <span className="badge" style={{
                                        background: 'var(--primary)',
                                        color: 'var(--text-on-primary)',
                                        fontSize: '0.75rem',
                                        padding: '0.35rem 0.85rem',
                                        whiteSpace: 'nowrap',
                                        flexShrink: 0
                                    }}>
                                        {selectedProject.status}
                                    </span>
                                </div>
                                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1rem' }}>
                                    {selectedProject.description}
                                </p>
                            </div>

                            {/* Highlights */}
                            <div>
                                <h3 style={{ fontSize: '1rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                                    Key Features
                                </h3>
                                <ul style={{ list: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    {selectedProject.highlights.map((highlight, idx) => (
                                        <li key={idx} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                            <span style={{ color: 'var(--primary)', marginTop: '2px' }}>✓</span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Architecture Section */}
                            {selectedProject.architecture && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="glass projects-architecture"
                                    style={{ padding: '2rem', borderLeft: '4px solid var(--primary)' }}
                                >
                                    <h3 style={{ fontSize: '1rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
                                        Test Automation Architecture
                                    </h3>

                                    {/* Architecture Description */}
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                        {selectedProject.architecture.description}
                                    </p>

                                    {/* Framework Structure */}
                                    <div style={{ marginBottom: '1.75rem' }}>
                                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.75rem', fontWeight: 600 }}>
                                            Framework Structure
                                        </h4>
                                        <div style={{
                                            background: 'rgba(0, 0, 0, 0.2)',
                                            padding: '1rem',
                                            borderRadius: '6px',
                                            fontFamily: 'monospace',
                                            fontSize: '0.85rem',
                                            color: 'var(--primary)',
                                            overflowX: 'auto',
                                            whiteSpace: 'pre',
                                            lineHeight: 1.6,
                                            maxWidth: '100%',
                                            boxSizing: 'border-box'
                                        }}>
                                            {selectedProject.architecture.frameworkStructure.join('\n')}
                                        </div>
                                    </div>

                                    {/* Tools Used */}
                                    <div style={{ marginBottom: '1.75rem' }}>
                                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.75rem', fontWeight: 600 }}>
                                            Tools &amp; Technologies
                                        </h4>
                                        <ul style={{ list: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {selectedProject.architecture.toolsUsed.map((tool, idx) => (
                                                <li key={idx} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', gap: '0.5rem' }}>
                                                    <span style={{ color: 'var(--primary)' }}>→</span>
                                                    <span>{tool}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Test Layers */}
                                    <div style={{ marginBottom: '1.75rem' }}>
                                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.75rem', fontWeight: 600 }}>
                                            Test Layers
                                        </h4>
                                        <ul style={{ list: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {selectedProject.architecture.testLayers.map((layer, idx) => (
                                                <li key={idx} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', gap: '0.5rem' }}>
                                                    <span style={{ color: 'var(--primary)' }}>▸</span>
                                                    <span>{layer}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CI/CD Pipeline */}
                                    <div>
                                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.75rem', fontWeight: 600 }}>
                                            CI/CD Integration
                                        </h4>
                                        <ul style={{ list: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {selectedProject.architecture.cicdPipeline.map((step, idx) => (
                                                <li key={idx} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', gap: '0.5rem' }}>
                                                    <span style={{ color: 'var(--primary)' }}>◆</span>
                                                    <span>{step}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            )}

                            {/* Technologies */}
                            <div>
                                <h3 style={{ fontSize: '1rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                                    Tech Stack
                                </h3>
                                <div className="tech-stack-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                    {selectedProject.tech.map((tech, idx) => {
                                        const logo = getTechLogo(tech);
                                        return (
                                            <motion.span
                                                key={idx}
                                                className="badge tech-badge"
                                                whileHover={{ scale: 1.05 }}
                                                style={{
                                                    background: 'rgba(59, 130, 246, 0.1)',
                                                    color: 'var(--primary)',
                                                    borderColor: 'var(--primary)',
                                                    fontSize: '0.9rem',
                                                    padding: '0.6rem 1rem',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}
                                            >
                                                {logo ? (
                                                    <img src={logo} alt={tech} loading="lazy" decoding="async" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                                                ) : (
                                                    <Layout size={16} />
                                                )}
                                                {tech}
                                            </motion.span>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Repository Link */}
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <a
                                    href={selectedProject.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="glass"
                                    style={{
                                        padding: '1rem 1.5rem',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        transition: 'all 0.3s ease',
                                        border: '1px solid var(--primary)',
                                        background: 'transparent'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--primary)';
                                        e.currentTarget.style.color = 'var(--text-on-primary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = 'inherit';
                                    }}
                                >
                                    <Github size={20} />
                                    View Repository
                                    <ExternalLink size={16} />
                                </a>
                            </motion.div>
                        </motion.div>
                    )}
                </div>

                {/* Coming Soon Section */}
                <div style={{ textAlign: 'center', marginTop: '6rem' }}>
                    <motion.div {...fadeIn}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>More Projects Coming</h2>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                            Check back soon for updates!
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Responsive Styles */}
            <style>{`
                /* ── Tab bar: hidden on desktop ── */
                .projects-tab-bar {
                    display: none;
                }

                /* ── Desktop / Tablet wide: two-column layout ── */
                @media (min-width: 769px) {
                    .projects-layout {
                        overflow: visible;
                    }
                    .projects-sidebar {
                        display: flex;
                    }
                }

                /* ── Tablet (769–1024px): sidebar becomes a button grid ── */
                @media (max-width: 1024px) and (min-width: 769px) {
                    .projects-layout {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }
                    .projects-sidebar {
                        position: relative !important;
                        top: 0 !important;
                        display: grid !important;
                        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)) !important;
                        gap: 0.5rem !important;
                        width: 100% !important;
                        margin-bottom: 1rem !important;
                    }
                    .projects-sidebar p {
                        display: none !important;
                    }
                    .projects-sidebar button {
                        padding: 0.75rem !important;
                        font-size: 0.85rem !important;
                    }
                    .projects-sidebar button span:last-child {
                        display: none !important;
                    }
                }

                /* ── Mobile (≤768px): hide sidebar, show tab bar ── */
                @media (max-width: 768px) {
                    /* Tab bar */
                    .projects-tab-bar {
                        display: flex;
                        flex-direction: row;
                        gap: 0.5rem;
                        overflow-x: auto;
                        -webkit-overflow-scrolling: touch;
                        scroll-snap-type: x mandatory;
                        padding-bottom: 0.5rem;
                        margin-bottom: 1.25rem;
                        /* hide scrollbar but keep scrollable */
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                    }
                    .projects-tab-bar::-webkit-scrollbar {
                        display: none;
                    }
                    .projects-tab-btn {
                        flex-shrink: 0;
                        scroll-snap-align: start;
                        padding: 0.55rem 1rem;
                        border-radius: 999px;
                        border: 1.5px solid var(--border);
                        background: transparent;
                        color: var(--text-muted);
                        font-size: 0.82rem;
                        font-weight: 500;
                        cursor: pointer;
                        white-space: nowrap;
                        transition: all 0.2s ease;
                        font-family: var(--font-sans);
                    }
                    .projects-tab-btn.active {
                        background: var(--primary);
                        color: var(--text-on-primary);
                        border-color: var(--primary);
                        font-weight: 600;
                    }
                    .projects-tab-btn:not(.active):hover {
                        border-color: var(--primary);
                        color: var(--primary);
                    }

                    /* Hide the desktop sidebar */
                    .projects-sidebar {
                        display: none !important;
                    }

                    /* Stack layout to 1 column */
                    .projects-layout {
                        grid-template-columns: 1fr !important;
                        gap: 0 !important;
                        overflow: visible !important;
                    }

                    /* Content panel */
                    .projects-content {
                        padding: 0 !important;
                        grid-column: 1 / -1 !important;
                        overflow-x: hidden !important;
                        max-width: 100% !important;
                        box-sizing: border-box !important;
                        min-width: 0 !important;
                    }
                    .projects-content h2 {
                        font-size: 1.4rem !important;
                        margin-bottom: 0.5rem !important;
                        word-break: break-word !important;
                    }
                    .projects-content h3 {
                        font-size: 0.95rem !important;
                    }

                    /* Architecture card */
                    .projects-architecture {
                        padding: 1.25rem !important;
                        margin-bottom: 1.25rem !important;
                        border-left: 3px solid var(--primary) !important;
                    }
                    .projects-architecture h3 { font-size: 0.9rem !important; margin-bottom: 1rem !important; }
                    .projects-architecture h4 { font-size: 0.8rem !important; margin-bottom: 0.5rem !important; }
                    .projects-architecture p  { font-size: 0.85rem !important; line-height: 1.5 !important; }
                    .projects-architecture ul li { font-size: 0.8rem !important; gap: 0.4rem !important; }

                    /* Tech badges */
                    .tech-stack-container { gap: 0.4rem !important; }
                    .tech-badge { font-size: 0.75rem !important; padding: 0.4rem 0.6rem !important; }
                    .tech-badge img { width: 14px !important; height: 14px !important; }

                    /* Section title */
                    .section-title { font-size: 1.5rem !important; margin-bottom: 1rem !important; }
                }

                /* ── Very small mobile (≤480px) ── */
                @media (max-width: 480px) {
                    .projects-tab-btn {
                        font-size: 0.78rem !important;
                        padding: 0.5rem 0.85rem !important;
                    }
                    .projects-content h2 { font-size: 1.2rem !important; }
                    .projects-content h3 { font-size: 0.85rem !important; }
                    .projects-architecture { padding: 1rem !important; }
                    .projects-architecture h4 { font-size: 0.75rem !important; }
                    .projects-architecture ul li { font-size: 0.7rem !important; }
                }
            `}</style>
        </div>
    );
};

export default Projects;

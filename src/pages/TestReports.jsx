import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, ExternalLink, FlaskConical } from 'lucide-react';

const testProjects = [
    {
        name: 'playwright_typescript_qa_lab Test Report',
        description: 'API, DB, and UI tests from playwright_portfolio_automation_typescript project.',
        reportUrl: 'https://cng07.github.io/playwright_typescript_qa_lab/',
        embedUrl: 'https://cng07.github.io/playwright_typescript_qa_lab/',
        status: 'live'
    },
    {
        name: 'playwright_portfolio_automation_typescript Test Report',
        description: 'This report is generated from the playwright_portfolio_automation_typescript project and reflects the latest CI test execution.',
        reportUrl: 'https://cng07.github.io/playwright_portfolio_automation_typescript/',
        embedUrl: 'https://cng07.github.io/playwright_portfolio_automation_typescript/',
        status: 'live'
    }
];

const TestReports = () => {
    return (
        <div className="section container page-header-padding" style={{ minHeight: '100vh' }}>
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ marginBottom: '2rem' }}
            >
                <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>
                    <BarChart2 size={30} color="var(--primary)" style={{ display: 'inline', marginRight: '0.75rem', verticalAlign: 'middle' }} />
                    Test Reports
                </h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '900px' }}>
                    Automated test results from CI pipelines (GitHub Actions).
                </p>
            </motion.div>

            <div style={{ display: 'grid', gap: '1.75rem' }}>
                {testProjects.map((project, index) => (
                    <motion.section
                        key={project.name}
                        className="glass qa-card"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.4, delay: index * 0.06 }}
                        style={{ padding: '1.5rem' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                            <div>
                                <h2 className="qa-card-title" style={{ marginBottom: '0.5rem' }}>
                                    <FlaskConical size={20} color="var(--primary)" />
                                    {project.name}
                                </h2>
                                <p style={{ color: 'var(--text-secondary)', margin: 0, maxWidth: '760px' }}>
                                    {project.description}
                                </p>
                            </div>

                            {project.reportUrl ? (
                                <a
                                    href={project.reportUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="qa-btn qa-btn-primary"
                                    style={{ textDecoration: 'none', marginBottom: 0 }}
                                >
                                    <ExternalLink size={16} />
                                    View Full Report
                                </a>
                            ) : (
                                <span
                                    className="qa-btn qa-btn-ghost"
                                    style={{ opacity: 0.8, cursor: 'default', marginBottom: 0 }}
                                    aria-live="polite"
                                >
                                    Coming Soon
                                </span>
                            )}
                        </div>

                        {project.embedUrl ? (
                            <>
                                <div style={{ borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface)' }}>
                                    <iframe
                                        src={project.embedUrl}
                                        width="100%"
                                        height="800"
                                        style={{ border: 'none', display: 'block' }}
                                        title={`${project.name} Monocart report`}
                                        loading="lazy"
                                    />
                                </div>
                                {project.name === 'Portfolio Automation Test Report' && (
                                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                                        If the report does not load,{` `}
                                        <a href={project.reportUrl} target="_blank" rel="noopener noreferrer">
                                            click here to open the report
                                        </a>
                                        .
                                    </p>
                                )}
                            </>
                        ) : (
                            <div
                                style={{
                                    border: '1px dashed var(--border)',
                                    borderRadius: '0.75rem',
                                    padding: '2rem',
                                    background: 'var(--surface-muted)',
                                    color: 'var(--text-secondary)'
                                }}
                            >
                                Report embed will appear here once GitHub Actions publishing is connected for this project.
                            </div>
                        )}
                    </motion.section>
                ))}
            </div>
        </div>
    );
};

export default TestReports;

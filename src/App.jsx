import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Github,
    Linkedin,
    Mail,
    Menu,
    X,
    Eye,
    Users,
    Moon,
    Sun
} from 'lucide-react';
import IeeeIcon from './components/CustomIcons';
import Seo from './components/Seo';
import { resumeData } from './data/resumeData';

// Pages (lazy-loaded for code splitting)
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Resume = React.lazy(() => import('./pages/Resume'));
const Projects = React.lazy(() => import('./pages/Projects'));
const QALab = React.lazy(() => import('./pages/QALab'));
const Experience = React.lazy(() => import('./pages/Experience'));
const Certifications = React.lazy(() => import('./pages/Certifications'));
const Education = React.lazy(() => import('./pages/Education'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = React.lazy(() => import('./pages/TermsAndConditions'));

const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const PageLoader = () => (
    <div className="page-loader" role="status" aria-live="polite">
        Loading page...
    </div>
);

const PageShell = ({ meta, children }) => (
    <>
        <Seo {...meta} />
        {children}
    </>
);

const siteName = 'Carlos Ng';
const baseDescription = 'Senior QA Automation Engineer specializing in Playwright, TypeScript, and scalable test frameworks that speed up reliable releases.';
const baseImage = '/profile.png';

const routes = [
    {
        path: '/',
        label: 'Home',
        element: Home,
        meta: { title: 'Portfolio', description: baseDescription, image: baseImage, siteName }
    },
    {
        path: '/experience',
        label: 'Experience',
        element: Experience,
        meta: { title: 'Experience', description: 'Work history, roles, and impact across QA automation and testing.', image: baseImage, siteName }
    },
    {
        path: '/projects',
        label: 'Projects',
        element: Projects,
        meta: { title: 'Projects', description: 'Automation frameworks, test suites, and QA tooling projects with Playwright.', image: baseImage, siteName }
    },
    {
        path: '/qa-lab',
        label: 'QA Lab',
        element: QALab,
        meta: { title: 'QA Playground', description: 'Interactive playground for manual and automation testing experiments.', image: baseImage, siteName }
    },
    {
        path: '/resume',
        label: 'Resume',
        element: Resume,
        meta: { title: 'Resume', description: 'Download and review Carlos Ng’s resume and professional experience.', image: baseImage, siteName }
    },
    {
        path: '/certifications',
        label: 'Certifications',
        element: Certifications,
        meta: { title: 'Certifications', description: 'ISTQB and other QA certifications with credentials and verification links.', image: baseImage, siteName }
    },
    {
        path: '/education',
        label: 'Education',
        element: Education,
        meta: { title: 'Education', description: 'Academic background and academic highlights.', image: baseImage, siteName }
    },
    {
        path: '/about',
        label: 'About',
        element: About,
        meta: { title: 'About', description: 'Career story, QA philosophy, and personal highlights.', image: baseImage, siteName }
    },
    {
        path: '/contact',
        label: 'Contact',
        element: Contact,
        meta: { title: 'Contact', description: 'Ways to connect for collaboration, questions, and opportunities.', image: baseImage, siteName }
    },
    {
        path: '/privacy',
        element: PrivacyPolicy,
        meta: { title: 'Privacy Policy', description: 'Privacy policy for the portfolio site.', image: baseImage, siteName }
    },
    {
        path: '/terms',
        element: TermsAndConditions,
        meta: { title: 'Terms & Conditions', description: 'Terms and conditions for the portfolio site.', image: baseImage, siteName }
    }
];

const navItems = routes.filter((route) => route.label);
const primaryNavOrder = ['Home', 'Projects', 'QA Lab', 'Resume', 'About', 'Contact'];
const moreNavOrder = ['Experience', 'Certifications', 'Education'];
const navItemsByLabel = navItems.reduce((acc, item) => {
    acc[item.label] = item;
    return acc;
}, {});
const primaryNavItems = primaryNavOrder.map((label) => navItemsByLabel[label]).filter(Boolean);
const moreNavItems = moreNavOrder.map((label) => navItemsByLabel[label]).filter(Boolean);

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMoreOpen, setIsMobileMoreOpen] = React.useState(false);
    const [visitorStats, setVisitorStats] = React.useState({ total: 0, unique: 0 });
    const [theme, setTheme] = React.useState(() => {
        if (typeof window === 'undefined') {
            return 'dark';
        }
        return localStorage.getItem('site_theme') === 'light' ? 'light' : 'dark';
    });

    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style.colorScheme = theme;
        localStorage.setItem('site_theme', theme);

        const themeMeta = document.querySelector('meta[name="theme-color"]');
        if (themeMeta) {
            themeMeta.setAttribute('content', theme === 'light' ? '#f4f7fb' : '#0f172a');
        }
    }, [theme]);

    React.useEffect(() => {
        const NAMESPACE = 'carlosng07-portfolio';
        const API_URL = 'https://api.counterapi.dev/v1';

        const fetchStats = async () => {
            try {
                // Add timestamp to prevent caching
                const timestamp = Date.now();

                // 1. Increment Total Visits
                const totalRes = await fetch(`${API_URL}/${NAMESPACE}/visits/up?t=${timestamp}`);
                const totalData = await totalRes.json();

                // 2. Handle Unique Visitors
                const hasVisited = localStorage.getItem('site_has_visited');
                let uniqueData;

                if (!hasVisited) {
                    // New visitor: Increment unique count
                    const uniqueRes = await fetch(`${API_URL}/${NAMESPACE}/unique/up?t=${timestamp}`);
                    uniqueData = await uniqueRes.json();
                    localStorage.setItem('site_has_visited', 'true');
                } else {
                    // Returning visitor: Just get unique count
                    const uniqueRes = await fetch(`${API_URL}/${NAMESPACE}/unique?t=${timestamp}`);
                    uniqueData = await uniqueRes.json();
                }

                const newStats = {
                    total: totalData.count || 0,
                    unique: uniqueData.count || 0
                };

                setVisitorStats(newStats);
                // Store stats in localStorage as backup
                localStorage.setItem('site_visitor_stats', JSON.stringify(newStats));

            } catch (error) {
                console.error("Error fetching visitor stats:", error);
                // Try to recover from localStorage if API fails
                const cachedStats = localStorage.getItem('site_visitor_stats');
                if (cachedStats) {
                    setVisitorStats(JSON.parse(cachedStats));
                }
            }
        };

        fetchStats();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => {
            const next = !prev;
            if (!next) {
                setIsMobileMoreOpen(false);
            }
            return next;
        });
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsMobileMoreOpen(false);
    };
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };
    const isDarkTheme = theme === 'dark';

    return (
        <Router>
            <ScrollToTop />
            <div className="portfolio">
                <a className="skip-link" href="#main-content">Skip to content</a>
                {/* Navigation */}
                <nav className="glass nav-bar" aria-label="Primary">
                    <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img
                            src="/cng07-logo.png"
                            alt="CNG07 Logo"
                            width="45"
                            height="45"
                            loading="lazy"
                            decoding="async"
                            style={{ height: '45px', width: 'auto', borderRadius: '6px' }}
                        />
                        Carlos Ng
                    </Link>

                    {/* Desktop Links */}
                    <div className="nav-links">
                        {primaryNavItems.map((item) => (
                            <Link key={item.path} to={item.path} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                {item.label}
                            </Link>
                        ))}
                        {moreNavItems.length > 0 && (
                            <div className="nav-more">
                                <button className="nav-more-trigger" type="button" aria-haspopup="menu">
                                    More
                                </button>
                                <div className="nav-dropdown" role="menu" aria-label="More links">
                                    {moreNavItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            role="menuitem"
                                            onClick={(event) => {
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                                event.currentTarget.blur();
                                            }}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="nav-actions">
                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            type="button"
                            aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
                            title={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
                        >
                            {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="mobile-menu-btn"
                            onClick={toggleMenu}
                            type="button"
                            aria-label="Toggle navigation menu"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-nav"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="mobile-nav"
                        id="mobile-nav"
                        role="dialog"
                        aria-label="Mobile navigation"
                        aria-modal="true"
                    >
                        <button
                            className="theme-toggle mobile-theme-toggle"
                            onClick={toggleTheme}
                            type="button"
                            aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
                        >
                            {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
                            <span>{isDarkTheme ? 'Light mode' : 'Dark mode'}</span>
                        </button>
                        {primaryNavItems.map((item) => (
                            <Link key={item.path} to={item.path} onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                {item.label}
                            </Link>
                        ))}
                        {moreNavItems.length > 0 && (
                            <div className="mobile-nav-more">
                                <button
                                    className="mobile-nav-more-btn"
                                    type="button"
                                    aria-expanded={isMobileMoreOpen}
                                    aria-controls="mobile-more-links"
                                    onClick={() => setIsMobileMoreOpen((prev) => !prev)}
                                >
                                    More
                                    <span className="mobile-nav-more-caret" aria-hidden="true" />
                                </button>
                                {isMobileMoreOpen && (
                                    <div className="mobile-nav-more-links" id="mobile-more-links">
                                        {moreNavItems.map((item) => (
                                            <Link key={item.path} to={item.path} onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}

                <main id="main-content" className="app-main">
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            {routes.map((route) => {
                                const RouteComponent = route.element;
                                return (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        element={(
                                            <PageShell meta={route.meta}>
                                                <RouteComponent />
                                            </PageShell>
                                        )}
                                    />
                                );
                            })}
                        </Routes>
                    </Suspense>
                </main>

                {/* Footer */}
                <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', textAlign: 'center', marginTop: '4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <a href={resumeData.linkedIn} target="_blank" rel="noreferrer" className="footer-social"><Linkedin size={24} /></a>
                        <a href={resumeData.github} target="_blank" rel="noreferrer" className="footer-social"><Github size={24} /></a>
                        <a href={resumeData.ieee} target="_blank" rel="noreferrer" className="footer-social"><IeeeIcon size={24} /></a>
                        <a href={`mailto:${resumeData.email}`} className="footer-social"><Mail size={24} /></a>
                    </div>

                    {/* Visitor Counter */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        marginBottom: '1.5rem',
                        padding: '0.6rem 1.25rem',
                        background: 'var(--surface-muted)',
                        borderRadius: '100px',
                        border: '1px solid var(--border)',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ color: 'var(--primary)', display: 'flex' }}><Eye size={14} /></span>
                            <span>Total Visits: <strong style={{ color: 'var(--text-main)' }}>{visitorStats.total}</strong></span>
                        </div>
                        <div style={{ width: '1px', height: '12px', background: 'var(--divider)' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ color: 'var(--primary)', display: 'flex' }}><Users size={14} /></span>
                            <span>Unique Visitors: <strong style={{ color: 'var(--text-main)' }}>{visitorStats.unique}</strong></span>
                        </div>
                    </div>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        &copy; {new Date().getFullYear()} Carlos Ng. All rights reserved.
                    </p>

                    {/* Footer Links */}
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
                        <Link to="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                            Privacy Policy
                        </Link>
                        <Link to="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                            Terms & Conditions
                        </Link>
                    </div>
                </footer>
            </div>
        </Router>
    );
};

export default App;

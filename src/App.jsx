import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Github,
    Linkedin,
    Mail,
    Menu,
    X,
    Eye,
    Users
} from 'lucide-react';
import IeeeIcon from './components/CustomIcons';
import { resumeData } from './data/resumeData';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Certifications from './pages/Certifications';
import Education from './pages/Education';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [visitorStats, setVisitorStats] = React.useState({ total: 0, unique: 0 });

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

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Router>
            <ScrollToTop />
            <div className="portfolio">
                {/* Navigation */}
                <nav className="glass nav-bar">
                    <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src="/cng07-logo.png" alt="CNG07 Logo" style={{ height: '45px', width: 'auto', borderRadius: '6px' }} />
                        Carlos Ng
                    </Link>

                    {/* Desktop Links */}
                    <div className="nav-links">
                        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link>
                        <Link to="/experience" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Experience</Link>
                        <Link to="/projects" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Projects</Link>
                        <Link to="/resume" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Resume</Link>
                        <Link to="/certifications" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Certifications</Link>
                        <Link to="/education" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Education</Link>
                        <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About</Link>
                        <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Contact</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="mobile-menu-btn" onClick={toggleMenu}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </nav>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="mobile-nav"
                    >
                        <Link to="/" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</Link>
                        <Link to="/experience" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Experience</Link>
                        <Link to="/projects" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Projects</Link>
                        <Link to="/resume" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Resume</Link>
                        <Link to="/certifications" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Certifications</Link>
                        <Link to="/education" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Education</Link>
                        <Link to="/about" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>About</Link>
                        <Link to="/contact" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Contact</Link>
                    </motion.div>
                )}

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/certifications" element={<Certifications />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsAndConditions />} />
                </Routes>

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
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '100px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ color: 'var(--primary)', display: 'flex' }}><Eye size={14} /></span>
                            <span>Total Visits: <strong style={{ color: '#fff' }}>{visitorStats.total}</strong></span>
                        </div>
                        <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.1)' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ color: 'var(--primary)', display: 'flex' }}><Users size={14} /></span>
                            <span>Unique Visitors: <strong style={{ color: '#fff' }}>{visitorStats.unique}</strong></span>
                        </div>
                    </div>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        &copy; {new Date().getFullYear()} {resumeData.name}. All rights reserved.
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

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Github,
    Linkedin,
    Mail,
    Menu,
    X
} from 'lucide-react';
import IeeeIcon from './components/CustomIcons';
import { resumeData } from './data/resumeData';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Resume from './pages/Resume';
import Certifications from './pages/Certifications';
import Education from './pages/Education';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Router>
            <ScrollToTop />
            <div className="portfolio">
                {/* Navigation */}
                <nav className="glass nav-bar">
                    <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <span className="nav-logo-full">Carlos Ng</span>
                        <span className="nav-logo-short">C.NG</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="nav-links">
                        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/resume">Resume</Link>
                        <Link to="/certifications">Certifications</Link>
                        <Link to="/education">Education</Link>
                        <Link to="/contact">Contact</Link>
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
                        <Link to="/" onClick={closeMenu}>Home</Link>
                        <Link to="/about" onClick={closeMenu}>About</Link>
                        <Link to="/resume" onClick={closeMenu}>Resume</Link>
                        <Link to="/certifications" onClick={closeMenu}>Certifications</Link>
                        <Link to="/education" onClick={closeMenu}>Education</Link>
                        <Link to="/contact" onClick={closeMenu}>Contact</Link>
                    </motion.div>
                )}

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/certifications" element={<Certifications />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>

                {/* Footer */}
                <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <a href={resumeData.linkedIn} target="_blank" rel="noreferrer"><Linkedin size={24} /></a>
                        <a href={resumeData.github} target="_blank" rel="noreferrer"><Github size={24} /></a>
                        <a href={resumeData.ieee} target="_blank" rel="noreferrer"><IeeeIcon size={24} /></a>
                        <a href={`mailto:${resumeData.email}`}><Mail size={24} /></a>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        &copy; {new Date().getFullYear()} {resumeData.name}. All rights reserved.
                    </p>
                </footer>
            </div>
        </Router>
    );
};

export default App;

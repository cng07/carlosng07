import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
    Github,
    Linkedin,
    Mail
} from 'lucide-react';
import { resumeData } from './data/resumeData';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Resume from './pages/Resume';

const App = () => {
    return (
        <Router>
            <div className="portfolio">
                {/* Navigation */}
                <nav className="glass nav-bar">
                    <div className="nav-logo">
                        <span className="nav-logo-full">Carlos Angelo E. Ng</span>
                        <span className="nav-logo-short">C.NG</span>
                    </div>
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/resume">Resume</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>

                {/* Footer */}
                <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <a href={resumeData.linkedIn} target="_blank" rel="noreferrer"><Linkedin size={24} /></a>
                        <a href={resumeData.github} target="_blank" rel="noreferrer"><Github size={24} /></a>
                        <a href={resumeData.ieee} target="_blank" rel="noreferrer"><Library size={24} /></a>
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

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const Contact = () => {
    return (
        <div className="section container" style={{ paddingTop: '8rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="section-title">Contact Me</h1>
                <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2rem' }}>
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                        <a href={`mailto:${resumeData.email}`} className="glass" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Mail size={24} color="var(--primary)" /> Email
                        </a>
                        <a href={resumeData.linkedIn} target="_blank" rel="noreferrer" className="glass" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Linkedin size={24} color="var(--primary)" /> LinkedIn
                        </a>
                        <a href={resumeData.github} target="_blank" rel="noreferrer" className="glass" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Github size={24} color="var(--primary)" /> GitHub
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;

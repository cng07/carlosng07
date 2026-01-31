import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="section container" style={{ paddingTop: '8rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="section-title">About Me</h1>
                <div className="glass" style={{ padding: '2rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                        This page is currently under construction. Stay tuned for more details about my journey and background!
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default About;

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

const Resume = () => {
    return (
        <div className="section container page-header-padding">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 className="section-title" style={{ marginBottom: 0 }}>
                        <FileText size={32} color="var(--primary)" style={{ verticalAlign: 'middle', marginRight: '0.75rem' }} />
                        My Resume
                    </h1>
                    <a
                        href="/Carlos_Ng_Resume.pdf"
                        download
                        className="glass"
                        style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}
                    >
                        <Download size={18} /> Download PDF
                    </a>
                </div>

                <div className="glass" style={{ height: '80vh', padding: '1rem', overflow: 'hidden', position: 'relative', background: '#1e293b' }}>
                    <object
                        data="/Carlos_Ng_Resume.pdf"
                        type="application/pdf"
                        width="100%"
                        height="100%"
                        style={{ borderRadius: '8px' }}
                    >
                        <iframe
                            src={`https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + '/Carlos_Ng_Resume.pdf')}&embedded=true`}
                            title="Carlos Ng Resume"
                            width="100%"
                            height="100%"
                            style={{ border: 'none', borderRadius: '8px' }}
                        />
                    </object>
                </div>
            </motion.div>
        </div>
    );
};

export default Resume;

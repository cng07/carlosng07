import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const Resume = () => {
    // const [downloadCount, setDownloadCount] = React.useState(0);

    // Download counter is currently disabled due to CORS issues with CounterAPI

    const handleDownload = () => {
        // Immediately trigger PDF download
        const link = document.createElement('a');
        link.href = '/Carlos_Ng_Resume.pdf';
        link.download = 'Carlos_Ng_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="section container page-header-padding">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Title with Download Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h1 className="section-title" style={{ marginBottom: 0 }}>Resume</h1>
                    <button
                        onClick={handleDownload}
                        style={{ 
                            padding: '0.75rem 1.5rem', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem', 
                            fontSize: '0.9rem', 
                            cursor: 'pointer', 
                            border: 'none',
                            borderRadius: '8px',
                            background: 'var(--primary)',
                            color: 'var(--text-on-primary)',
                            fontWeight: 500,
                            transition: 'all 0.2s ease',
                            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
                        }}
                    >
                        <Download size={18} /> Download PDF
                    </button>
                </div>

                {/* PDF Viewer */}
                <div className="glass" style={{ height: '80vh', padding: '1rem', overflow: 'hidden', position: 'relative', background: 'var(--resume-viewer-bg)', marginBottom: '1.5rem' }}>
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
                            loading="lazy"
                            style={{ border: 'none', borderRadius: '8px' }}
                        />
                    </object>
                </div>

                {/* Download Counter - Bottom (hidden for now) */}
                {/* <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    padding: '1rem 0'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.6rem 1rem',
                        background: 'var(--primary)',
                        borderRadius: '100px',
                        fontSize: '0.9rem',
                        color: 'var(--text-on-primary)',
                        fontWeight: 500,
                        boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
                    }}>
                        <Eye size={16} />
                        <span>{downloadCount} download{downloadCount !== 1 ? 's' : ''}</span>
                    </div>
                </div> */}
            </motion.div>
        </div>
    );
};

export default Resume;

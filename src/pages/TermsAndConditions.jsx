import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const TermsAndConditions = () => {
    return (
        <main className="container page-header-padding" style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            display: 'inline-flex',
                            padding: '1rem',
                            borderRadius: '20px',
                            background: 'rgba(var(--primary-rgb), 0.1)',
                            marginBottom: '1.5rem',
                            color: 'var(--primary)'
                        }}
                    >
                        <FileText size={40} />
                    </motion.div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 800, marginBottom: '1rem' }}>
                        Terms &amp; <span style={{ color: 'var(--primary)' }}>Conditions</span>
                    </h1>
                    <p style={{ color: 'var(--text-main)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Last updated: February 1, 2026
                    </p>
                </div>

                <div style={{ maxWidth: '900px', margin: '0 auto', lineHeight: 1.8 }}>
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            1. Agreement to Terms
                        </h2>
                        <p style={{ color: 'var(--text-main)', fontSize: '1rem', marginBottom: '1rem' }}>
                            By accessing and using this Website (carlosng07.vercel.app), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            2. Use License
                        </h2>
                        <div style={{ color: 'var(--text-main)' }}>
                            <p style={{ marginBottom: '1rem' }}>
                                Permission is granted to temporarily download one copy of the materials (information or software) on the Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', listStyle: 'disc' }}>
                                <li>Modify or copy the materials</li>
                                <li>Use the materials for any commercial purpose or for any public display</li>
                                <li>Attempt to decompile or reverse engineer any software contained on the Website</li>
                                <li>Remove any copyright or other proprietary notations from the materials</li>
                                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                                <li>Violate any applicable laws or regulations</li>
                            </ul>
                        </div>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            3. Disclaimer
                        </h2>
                        <p style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>
                            The materials on the Website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            4. Limitations
                        </h2>
                        <p style={{ color: 'var(--text-main)' }}>
                            In no event shall the Website or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            5. Accuracy of Materials
                        </h2>
                        <p style={{ color: 'var(--text-main)' }}>
                            The materials appearing on the Website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on the Website are accurate, complete, or current. We may make changes to the materials contained on the Website at any time without notice.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            6. Links
                        </h2>
                        <p style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>
                            We have not reviewed all of the sites linked to our Website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            7. Modifications
                        </h2>
                        <p style={{ color: 'var(--text-main)' }}>
                            We may revise these terms of service for the Website at any time without notice. By using this Website, you are agreeing to be bound by the then current version of these terms of service.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            8. Intellectual Property
                        </h2>
                        <p style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>
                            All content on this Website, including text, graphics, logos, images, and software, is the property of Carlos Ng or its content suppliers and is protected by international copyright laws. Unauthorized use of any material is strictly prohibited.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            9. Governing Law
                        </h2>
                        <p style={{ color: 'var(--text-main)' }}>
                            These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which the Website owner resides, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            10. Contact Information
                        </h2>
                        <p style={{ color: 'var(--text-main)' }}>
                            If you have any questions about these Terms and Conditions, please contact us at{' '}
                            <a href="mailto:carlosng07@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                                carlosng07@gmail.com
                            </a>
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem', padding: '1.5rem', background: 'rgba(var(--primary-rgb), 0.05)', borderRadius: '12px', borderLeft: '3px solid var(--primary)' }}>
                        <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>
                            <strong>Note:</strong> These Terms and Conditions may be updated at any time. Your continued use of the Website following the posting of revised Terms and Conditions means that you accept and agree to the changes.
                        </p>
                    </section>
                </div>
            </motion.div>
        </main>
    );
};

export default TermsAndConditions;

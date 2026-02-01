import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
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
                        <Shield size={40} />
                    </motion.div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 800, marginBottom: '1rem' }}>
                        Privacy <span style={{ color: 'var(--primary)' }}>Policy</span>
                    </h1>
                    <p style={{ color: 'var(--text-main)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Last updated: February 1, 2026
                    </p>
                </div>

                <div style={{ maxWidth: '900px', margin: '0 auto', lineHeight: 1.8 }}>
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            1. Introduction
                        </h2>
                        <p style={{ color: 'var(--text-main)', fontSize: '1rem', marginBottom: '1rem' }}>
                            This Privacy Policy explains how we collect, use, and protect information when you visit carlosng07.vercel.app (the "Website"). We are committed to respecting your privacy and being transparent about how we handle your data.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            2. Information We Collect
                        </h2>
                        <div style={{ color: 'var(--text-main)' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem', marginTop: '1rem' }}>
                                2.1 Automatic Information
                            </h3>
                            <p style={{ marginBottom: '1rem' }}>
                                When you visit our Website, we automatically collect certain non-personal information including:
                            </p>
                            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', listStyle: 'disc' }}>
                                <li>Visitor count and unique visitor statistics (via CounterAPI)</li>
                                <li>Browser type and version</li>
                                <li>IP address (anonymized)</li>
                                <li>Pages visited and time spent</li>
                                <li>Device information</li>
                            </ul>

                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem', marginTop: '1rem' }}>
                                2.2 Information You Provide
                            </h3>
                            <p>
                                If you contact us through the contact form or email, we collect the information you voluntarily provide, such as your name, email address, and message content.
                            </p>
                        </div>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            3. How We Use Your Information
                        </h2>
                        <p style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>
                            We use the collected information for the following purposes:
                        </p>
                        <ul style={{ marginLeft: '1.5rem', color: 'var(--text-main)', listStyle: 'disc' }}>
                            <li>To track website traffic and usage statistics</li>
                            <li>To respond to your inquiries and communications</li>
                            <li>To improve and optimize the Website's functionality</li>
                            <li>To comply with legal obligations</li>
                            <li>To enhance user experience</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            4. Third-Party Services
                        </h2>
                        <p style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>
                            Our Website uses the following third-party services:
                        </p>
                        <ul style={{ marginLeft: '1.5rem', color: 'var(--text-main)', listStyle: 'disc' }}>
                            <li><strong>CounterAPI:</strong> For tracking website visitor statistics. Please review their privacy policy at counterapi.dev</li>
                            <li><strong>Vercel:</strong> Our hosting platform. Please review their privacy policy at vercel.com</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            5. Cookies and Local Storage
                        </h2>
                        <p style={{ color: 'var(--text-main)' }}>
                            We use browser local storage to track whether you've visited before (for unique visitor counting). You can clear this data through your browser settings at any time.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            6. Data Protection
                        </h2>
                        <p style={{ color: 'var(--text-main)' }}>
                            We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. We encourage you to use caution when sharing personal information online.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            7. Your Rights
                        </h2>
                        <p style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>
                            Depending on your location, you may have the right to:
                        </p>
                        <ul style={{ marginLeft: '1.5rem', color: 'var(--text-main)', listStyle: 'disc' }}>
                            <li>Access the personal data we hold about you</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Opt-out of certain data collection practices</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                            8. Contact Us
                        </h2>
                        <p style={{ color: 'var(--text-main)' }}>
                            If you have any questions about this Privacy Policy or our data practices, please contact us at{' '}
                            <a href="mailto:carlosng07@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                                carlosng07@gmail.com
                            </a>
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem', padding: '1.5rem', background: 'rgba(var(--primary-rgb), 0.05)', borderRadius: '12px', borderLeft: '3px solid var(--primary)' }}>
                        <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>
                            <strong>Note:</strong> This Privacy Policy may be updated from time to time. We will notify you of any significant changes by updating the "Last updated" date at the top of this page.
                        </p>
                    </section>
                </div>
            </motion.div>
        </main>
    );
};

export default PrivacyPolicy;

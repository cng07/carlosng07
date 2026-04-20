import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AlertTriangle,
    CheckCircle2,
    Clock,
    History,
    Play,
    Server,
    ShieldAlert,
    ToggleLeft,
    ToggleRight,
    Trash2,
    XCircle,
    Zap,
} from 'lucide-react';
import { mockFetch, MOCK_ENDPOINTS } from '../api/mockHandlers';

// ─── Constants ───────────────────────────────────────────────────────────────

const HISTORY_KEY = 'qa_api_playground_history';
const MAX_HISTORY = 20;

const QA_CHALLENGES = [
    {
        id: 1,
        title: 'Verify login returns token',
        description: 'POST to /api/login with valid credentials and confirm a JWT token is returned.',
        method: 'POST',
        url: '/api/login',
        expectedStatus: 200,
        requiredFields: ['token', 'user'],
        sampleBody: JSON.stringify({ email: 'carlos@example.com', password: 'password123' }, null, 2),
        hint: 'Use email ending in @example.com and password: password123',
    },
    {
        id: 2,
        title: 'Check invalid login returns 401',
        description: 'POST to /api/login with wrong credentials and verify a 401 error response.',
        method: 'POST',
        url: '/api/login',
        expectedStatus: 401,
        requiredFields: ['error'],
        sampleBody: JSON.stringify({ email: 'wrong@example.com', password: 'badpassword' }, null, 2),
        hint: 'Use a wrong password to trigger the 401',
    },
    {
        id: 3,
        title: 'Get users list successfully',
        description: 'GET /api/users and confirm the response contains a users array.',
        method: 'GET',
        url: '/api/users',
        expectedStatus: 200,
        requiredFields: ['users'],
        sampleBody: null,
        hint: 'No body needed — this is a GET request',
    },
    {
        id: 4,
        title: 'Handle server error correctly',
        description: 'GET /api/broken and observe the server returning a 500 error.',
        method: 'GET',
        url: '/api/broken',
        expectedStatus: 500,
        requiredFields: [],
        sampleBody: null,
        hint: 'Enable "Simulate Flaky API" to force 500s more often',
    },
];

const METHOD_COLORS = {
    GET: { bg: 'rgba(34,197,94,0.15)', text: '#4ade80', border: 'rgba(34,197,94,0.4)' },
    POST: { bg: 'rgba(96,165,250,0.15)', text: '#60a5fa', border: 'rgba(96,165,250,0.4)' },
    PUT: { bg: 'rgba(251,146,60,0.15)', text: '#fb923c', border: 'rgba(251,146,60,0.4)' },
    DELETE: { bg: 'rgba(248,113,113,0.15)', text: '#f87171', border: 'rgba(248,113,113,0.4)' },
    PATCH: { bg: 'rgba(167,139,250,0.15)', text: '#a78bfa', border: 'rgba(167,139,250,0.4)' },
};

function getMethodStyle(method) {
    return METHOD_COLORS[method] || { bg: 'rgba(148,163,184,0.15)', text: '#94a3b8', border: 'rgba(148,163,184,0.4)' };
}

function getStatusStyle(status) {
    if (!status) return { bg: 'rgba(148,163,184,0.15)', text: '#94a3b8' };
    if (status < 300) return { bg: 'rgba(34,197,94,0.18)', text: '#4ade80' };
    if (status < 400) return { bg: 'rgba(251,146,60,0.18)', text: '#fb923c' };
    if (status < 500) return { bg: 'rgba(251,191,36,0.18)', text: '#fcd34d' };
    return { bg: 'rgba(248,113,113,0.18)', text: '#f87171' };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MethodBadge({ method, size = 'sm' }) {
    const s = getMethodStyle(method);
    return (
        <span style={{
            background: s.bg,
            color: s.text,
            border: `1px solid ${s.border}`,
            borderRadius: '0.35rem',
            padding: size === 'lg' ? '0.3rem 0.7rem' : '0.18rem 0.45rem',
            fontSize: size === 'lg' ? '0.85rem' : '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
        }}>
            {method}
        </span>
    );
}

function StatusBadge({ status }) {
    const s = getStatusStyle(status);
    return (
        <span style={{
            background: s.bg,
            color: s.text,
            borderRadius: '0.35rem',
            padding: '0.3rem 0.75rem',
            fontSize: '1rem',
            fontWeight: 700,
            fontFamily: 'monospace',
        }}>
            {status ?? '—'}
        </span>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const ApiPlayground = () => {
    // Request builder state
    const [method, setMethod] = React.useState('GET');
    const [url, setUrl] = React.useState('/api/users');
    const [headersText, setHeadersText] = React.useState('{\n  "Content-Type": "application/json"\n}');
    const [bodyText, setBodyText] = React.useState('');
    const [flakyEnabled, setFlakyEnabled] = React.useState(false);

    // Response state
    const [response, setResponse] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [validationError, setValidationError] = React.useState('');

    // Challenge / validation state
    const [activeChallenge, setActiveChallenge] = React.useState(null);
    const [challengeResult, setChallengeResult] = React.useState(null);

    // History
    const [history, setHistory] = React.useState(() => {
        try {
            return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        } catch {
            return [];
        }
    });
    const [showHistory, setShowHistory] = React.useState(false);

    // Persist history
    React.useEffect(() => {
        try {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        } catch {
            // localStorage may be unavailable
        }
    }, [history]);

    // ── Validation helpers ───────────────────────────────────────────────────

    const validateUrl = (value) => {
        if (!value.trim()) return 'URL is required.';
        if (!value.startsWith('/api/')) return 'Only internal /api/* endpoints are allowed.';
        return '';
    };

    const validateJson = (text, label) => {
        if (!text.trim()) return '';
        try {
            JSON.parse(text);
            return '';
        } catch (e) {
            return `${label} is not valid JSON: ${e.message}`;
        }
    };

    // ── Send request ─────────────────────────────────────────────────────────

    const handleSend = async () => {
        setValidationError('');
        setChallengeResult(null);

        const urlErr = validateUrl(url);
        if (urlErr) { setValidationError(urlErr); return; }

        const headersErr = validateJson(headersText, 'Headers');
        if (headersErr) { setValidationError(headersErr); return; }

        const bodyErr = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)
            ? validateJson(bodyText, 'Body')
            : '';
        if (bodyErr) { setValidationError(bodyErr); return; }

        setLoading(true);
        setResponse(null);

        const options = { method };
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) && bodyText.trim()) {
            options.body = bodyText;
        }

        const result = await mockFetch(url.trim(), options, flakyEnabled);

        const entry = {
            id: Date.now(),
            method,
            url: url.trim(),
            status: result.status,
            responseTime: result.responseTime,
            timestamp: new Date().toLocaleTimeString(),
        };

        setHistory((prev) => [entry, ...prev].slice(0, MAX_HISTORY));
        setResponse(result);
        setLoading(false);
    };

    // ── Challenge: pre-fill ──────────────────────────────────────────────────

    const handleSelectChallenge = (challenge) => {
        setActiveChallenge(challenge);
        setChallengeResult(null);
        setMethod(challenge.method);
        setUrl(challenge.url);
        setBodyText(challenge.sampleBody || '');
        setValidationError('');
        setResponse(null);
    };

    // ── Challenge: validate ──────────────────────────────────────────────────

    const handleValidate = () => {
        if (!activeChallenge || !response) {
            setChallengeResult({ pass: false, message: 'Send a request first, then validate.' });
            return;
        }

        const issues = [];

        if (response.status !== activeChallenge.expectedStatus) {
            issues.push(`Expected status ${activeChallenge.expectedStatus}, got ${response.status}.`);
        }

        if (activeChallenge.requiredFields.length > 0) {
            const body = response.body;
            const bodyObj = typeof body === 'object' && body !== null ? body : {};
            activeChallenge.requiredFields.forEach((field) => {
                if (!(field in bodyObj)) {
                    issues.push(`Required field "${field}" missing in response.`);
                }
            });
        }

        if (issues.length === 0) {
            setChallengeResult({ pass: true, message: '✅ All checks passed! Challenge complete.' });
        } else {
            setChallengeResult({ pass: false, message: issues.join(' ') });
        }
    };

    // ── Clear history ────────────────────────────────────────────────────────

    const clearHistory = () => {
        setHistory([]);
        try { localStorage.removeItem(HISTORY_KEY); } catch { }
    };

    // ── Render ───────────────────────────────────────────────────────────────

    const hasBody = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
    const statusStyle = response ? getStatusStyle(response.status) : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
        >
            {/* Header */}
            <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>
                <Server size={30} color="var(--primary)" style={{ display: 'inline', marginRight: '0.75rem', verticalAlign: 'middle' }} />
                API Testing Playground
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '820px', marginBottom: '2rem' }}>
                A Postman-like API tester with mock endpoints built-in. Complete the challenges below to
                practice QA API testing. All requests hit internal mock handlers — no external services needed.
            </p>

            {/* Flaky toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <button
                    type="button"
                    onClick={() => setFlakyEnabled((v) => !v)}
                    className="qa-btn qa-btn-ghost"
                    style={{ gap: '0.5rem' }}
                    data-testid="flaky-toggle"
                >
                    {flakyEnabled
                        ? <ToggleRight size={18} color="var(--primary)" />
                        : <ToggleLeft size={18} />}
                    Simulate Flaky API
                </button>
                {flakyEnabled && (
                    <span style={{ fontSize: '0.8rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Zap size={13} /> /api/broken will fail more often
                    </span>
                )}
            </div>

            {/* Main playground grid */}
            <div className="api-playground-grid">

                {/* ── LEFT: Request Builder ── */}
                <motion.section
                    className="glass qa-card api-playground-builder"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="qa-card-title">
                        <Play size={18} color="var(--primary)" />
                        Request Builder
                    </h2>

                    {/* Method + URL row */}
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                        <label className="qa-field" style={{ flex: '0 0 auto' }}>
                            <span className="qa-label">Method</span>
                            <select
                                className="qa-select"
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                                data-testid="api-method-select"
                                style={{ minWidth: '110px' }}
                            >
                                {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </label>

                        <label className="qa-field" style={{ flex: 1, minWidth: '180px' }}>
                            <span className="qa-label">URL <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(only /api/* allowed)</span></span>
                            <input
                                type="text"
                                className="qa-input"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="/api/users"
                                data-testid="api-url-input"
                            />
                        </label>

                        <button
                            type="button"
                            className="qa-btn qa-btn-primary"
                            onClick={handleSend}
                            disabled={loading}
                            data-testid="api-send-btn"
                            style={{ alignSelf: 'flex-end' }}
                        >
                            <Play size={15} />
                            {loading ? 'Sending…' : 'Send'}
                        </button>
                    </div>

                    {/* Validation error */}
                    {validationError && (
                        <div className="qa-status qa-status-error" style={{ marginTop: '0.5rem' }}>
                            <AlertTriangle size={14} />
                            <span>{validationError}</span>
                        </div>
                    )}

                    {/* Quick endpoint buttons */}
                    <div>
                        <p className="qa-label" style={{ marginBottom: '0.5rem' }}>Quick endpoints:</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {MOCK_ENDPOINTS.map((ep) => (
                                <button
                                    key={`${ep.method}-${ep.url}`}
                                    type="button"
                                    className="qa-btn qa-btn-ghost"
                                    style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', gap: '0.35rem' }}
                                    onClick={() => {
                                        setMethod(ep.method);
                                        setUrl(ep.url);
                                        setBodyText('');
                                        setValidationError('');
                                    }}
                                    title={ep.description}
                                >
                                    <MethodBadge method={ep.method} />
                                    {ep.url}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Headers */}
                    <label className="qa-field">
                        <span className="qa-label">Headers (JSON)</span>
                        <textarea
                            className="qa-input"
                            value={headersText}
                            onChange={(e) => setHeadersText(e.target.value)}
                            rows={3}
                            style={{ fontFamily: 'monospace', fontSize: '0.82rem', resize: 'vertical' }}
                            data-testid="api-headers-input"
                            placeholder='{ "Content-Type": "application/json" }'
                        />
                    </label>

                    {/* Body */}
                    {hasBody && (
                        <label className="qa-field">
                            <span className="qa-label">Body (JSON)</span>
                            <textarea
                                className="qa-input"
                                value={bodyText}
                                onChange={(e) => setBodyText(e.target.value)}
                                rows={5}
                                style={{ fontFamily: 'monospace', fontSize: '0.82rem', resize: 'vertical' }}
                                data-testid="api-body-input"
                                placeholder='{ "key": "value" }'
                            />
                        </label>
                    )}
                </motion.section>

                {/* ── RIGHT: Response Viewer ── */}
                <motion.section
                    className="glass qa-card"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                >
                    <h2 className="qa-card-title">
                        <ShieldAlert size={18} color="var(--primary)" />
                        Response
                    </h2>

                    {loading && (
                        <div className="api-response-loading">
                            <div className="api-spinner" />
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Sending request…</span>
                        </div>
                    )}

                    {!loading && !response && (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                            <Server size={36} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
                            <p style={{ fontSize: '0.9rem' }}>Hit Send to see the response here</p>
                        </div>
                    )}

                    {!loading && response && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Status row */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                <StatusBadge status={response.status} />

                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                                    <Clock size={13} />
                                    {response.responseTime} ms
                                </span>

                                {response.status < 300 ? (
                                    <CheckCircle2 size={16} color="#4ade80" />
                                ) : response.status < 500 ? (
                                    <AlertTriangle size={16} color="#fcd34d" />
                                ) : (
                                    <XCircle size={16} color="#f87171" />
                                )}
                            </div>

                            {/* Response body */}
                            <p className="qa-label" style={{ marginBottom: '0.4rem' }}>Response Body</p>
                            <pre
                                data-testid="api-response-body"
                                style={{
                                    background: 'var(--api-response-bg)',
                                    color: 'var(--api-response-text)',
                                    borderRadius: '0.65rem',
                                    padding: '1rem',
                                    fontSize: '0.82rem',
                                    fontFamily: 'monospace',
                                    lineHeight: 1.65,
                                    overflowX: 'auto',
                                    overflowY: 'auto',
                                    maxHeight: '340px',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                    border: `1px solid ${statusStyle.bg}`,
                                }}
                            >
                                {JSON.stringify(response.body, null, 2)}
                            </pre>
                        </motion.div>
                    )}
                </motion.section>

                {/* ── CHALLENGES Panel (spans full width on small, side panel on large) ── */}
                <motion.section
                    className="glass qa-card api-playground-challenges"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <h2 className="qa-card-title">
                        <Zap size={18} color="var(--primary)" />
                        QA Challenges
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', marginBottom: '1rem' }}>
                        Click a challenge to pre-fill the request, then Send + Validate.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {QA_CHALLENGES.map((ch) => {
                            const isActive = activeChallenge?.id === ch.id;
                            return (
                                <div
                                    key={ch.id}
                                    style={{
                                        border: `1px solid ${isActive ? 'rgba(var(--primary-rgb),0.5)' : 'var(--border)'}`,
                                        borderRadius: '0.65rem',
                                        padding: '0.75rem',
                                        background: isActive ? 'rgba(var(--primary-rgb),0.06)' : 'var(--surface-soft)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onClick={() => handleSelectChallenge(ch)}
                                    data-testid={`challenge-${ch.id}`}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.35rem' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                                            #{ch.id} {ch.title}
                                        </span>
                                        <MethodBadge method={ch.method} />
                                    </div>
                                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>{ch.description}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.3rem', fontFamily: 'monospace' }}>
                                        {ch.url} → <strong>{ch.expectedStatus}</strong>
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Validate button */}
                    {activeChallenge && (
                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ marginTop: '1rem' }}
                        >
                            <div style={{ background: 'var(--surface-soft)', borderRadius: '0.5rem', padding: '0.6rem 0.75rem', marginBottom: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', borderLeft: '3px solid var(--primary)' }}>
                                💡 {activeChallenge.hint}
                            </div>

                            <button
                                type="button"
                                className="qa-btn qa-btn-primary"
                                onClick={handleValidate}
                                disabled={!response}
                                data-testid="validate-challenge-btn"
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                <CheckCircle2 size={15} />
                                Validate Challenge #{activeChallenge.id}
                            </button>

                            <AnimatePresence>
                                {challengeResult && (
                                    <motion.div
                                        key="result"
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className={`qa-status ${challengeResult.pass ? 'qa-status-success' : 'qa-status-error'}`}
                                        style={{ marginTop: '0.75rem', display: 'flex' }}
                                        data-testid="challenge-result"
                                    >
                                        {challengeResult.pass ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                                        <span style={{ fontSize: '0.82rem' }}>{challengeResult.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </motion.section>
            </div>

            {/* ── Request History ── */}
            <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <button
                        type="button"
                        className="qa-btn qa-btn-ghost"
                        onClick={() => setShowHistory((v) => !v)}
                        data-testid="history-toggle"
                    >
                        <History size={15} />
                        {showHistory ? 'Hide' : 'Show'} Request History ({history.length})
                    </button>
                    {history.length > 0 && showHistory && (
                        <button
                            type="button"
                            className="qa-btn qa-btn-ghost"
                            onClick={clearHistory}
                            style={{ fontSize: '0.8rem' }}
                            data-testid="clear-history-btn"
                        >
                            <Trash2 size={13} />
                            Clear
                        </button>
                    )}
                </div>

                <AnimatePresence>
                    {showHistory && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ overflow: 'hidden' }}
                        >
                            <div className="glass qa-card" style={{ padding: '1rem' }}>
                                {history.length === 0 ? (
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>No requests yet.</p>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        {history.map((item) => {
                                            const st = getStatusStyle(item.status);
                                            return (
                                                <div
                                                    key={item.id}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.6rem',
                                                        padding: '0.5rem 0.65rem',
                                                        borderRadius: '0.5rem',
                                                        background: 'var(--surface-soft)',
                                                        border: '1px solid var(--border)',
                                                        flexWrap: 'wrap',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => {
                                                        setMethod(item.method);
                                                        setUrl(item.url);
                                                        setValidationError('');
                                                    }}
                                                    title="Click to pre-fill method + URL"
                                                    data-testid="history-item"
                                                >
                                                    <MethodBadge method={item.method} />
                                                    <span style={{ fontFamily: 'monospace', fontSize: '0.82rem', flex: 1, color: 'var(--text-main)' }}>{item.url}</span>
                                                    <span style={{ background: st.bg, color: st.text, borderRadius: '0.3rem', padding: '0.1rem 0.45rem', fontSize: '0.78rem', fontWeight: 700, fontFamily: 'monospace' }}>{item.status}</span>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                                        <Clock size={11} />{item.responseTime}ms
                                                    </span>
                                                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.timestamp}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default ApiPlayground;

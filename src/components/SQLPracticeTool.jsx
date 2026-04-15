import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertTriangle, Code2, Database } from 'lucide-react';

// Initialize sql.js from CDN
const initSQL = async () => {
    for (let attempt = 0; attempt < 100; attempt++) {
        if (typeof window.initSqlJs === 'function') {
            try {
                const SQL = await window.initSqlJs({
                    locateFile: (file) => `https://unpkg.com/sql.js@1.8.0/dist/${file}`
                });
                return SQL;
            } catch (error) {
                console.error('SQL.js initialization error:', error);
                throw error;
            }
        }
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    throw new Error('SQL.js failed to load from CDN. Please check your internet connection and refresh the page.');
};

/* ─── Data ─── */
const CHALLENGES = [
    { id: 1,  title: 'Get all active users',                            difficulty: 'Easy',   description: 'Retrieve all users where is_active is 1.',                                                         answer: 'SELECT * FROM users WHERE is_active = 1;',                                                                                                               tables: 'users' },
    { id: 2,  title: 'Find users with missing email',                   difficulty: 'Easy',   description: 'Find all users who have no email address (NULL).',                                                  answer: 'SELECT * FROM users WHERE email IS NULL;',                                                                                                               tables: 'users' },
    { id: 3,  title: 'Find duplicate users (same email)',               difficulty: 'Medium', description: 'Find emails that appear more than once in the users table.',                                         answer: 'SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;',                                                                                   tables: 'users' },
    { id: 4,  title: 'Get all completed orders',                        difficulty: 'Easy',   description: 'Retrieve all orders with status "completed".',                                                       answer: "SELECT * FROM orders WHERE status = 'completed';",                                                                                                        tables: 'orders' },
    { id: 5,  title: 'Find orders with invalid user_id',                difficulty: 'Medium', description: 'Find orders where user_id does not exist in the users table.',                                       answer: 'SELECT * FROM orders WHERE user_id NOT IN (SELECT id FROM users);',                                                                                       tables: 'users, orders' },
    { id: 6,  title: 'Count total orders per user',                     difficulty: 'Medium', description: 'Count how many orders each user has.',                                                               answer: 'SELECT user_id, COUNT(*) AS total_orders FROM orders GROUP BY user_id;',                                                                                  tables: 'orders' },
    { id: 7,  title: 'Find users who have no orders',                   difficulty: 'Medium', description: 'List all users that have not placed any orders.',                                                    answer: 'SELECT * FROM users WHERE id NOT IN (SELECT user_id FROM orders);',                                                                                       tables: 'users, orders' },
    { id: 8,  title: 'Get total spent per user (completed orders only)',difficulty: 'Hard',   description: 'Sum the amount spent by each user, considering only completed orders.',                              answer: "SELECT user_id, SUM(amount) AS total_spent FROM orders WHERE status = 'completed' GROUP BY user_id;",                                                    tables: 'orders' },
    { id: 9,  title: 'Find inactive users with completed orders',       difficulty: 'Hard',   description: 'Find users with is_active = 0 who have at least one completed order.',                              answer: "SELECT u.* FROM users u JOIN orders o ON u.id = o.user_id WHERE u.is_active = 0 AND o.status = 'completed';",                                           tables: 'users, orders' },
    { id: 10, title: 'Find the user who spent the most',                difficulty: 'Hard',   description: 'Identify which user spent the most money (sum of completed orders), return top 1.',                answer: "SELECT user_id, SUM(amount) AS total_spent FROM orders WHERE status = 'completed' GROUP BY user_id ORDER BY total_spent DESC LIMIT 1;",                 tables: 'orders' },
];

const USERS_DATA = [[1,'Carlos','carlos@email.com',26,1],[2,'Anna','anna@email.com',30,1],[3,'John',null,22,1],[4,'Maria','maria@email.com',28,0],[5,'Carlos','carlos@email.com',26,1]];
const USERS_COLS  = ['id','name','email','age','is_active'];
const ORDERS_DATA = [[1,1,500,'completed','2024-05-01'],[2,1,300,'completed','2024-05-02'],[3,2,200,'pending','2024-05-03'],[4,3,150,'completed','2024-05-04'],[5,99,999,'completed','2024-05-05']];
const ORDERS_COLS = ['id','user_id','amount','status','created_at'];

/* ─── Difficulty colour maps (no Tailwind) ─── */
const DIFF = {
    Easy:   { pill: { background:'rgba(34,197,94,0.18)',  color:'#86efac', border:'1px solid rgba(34,197,94,0.4)'  }, card: { background:'rgba(34,197,94,0.07)',  border:'2px solid rgba(34,197,94,0.35)'  } },
    Medium: { pill: { background:'rgba(234,179,8,0.18)',  color:'#fcd34d', border:'1px solid rgba(234,179,8,0.42)' }, card: { background:'rgba(234,179,8,0.07)',  border:'2px solid rgba(234,179,8,0.35)'  } },
    Hard:   { pill: { background:'rgba(239,68,68,0.18)',  color:'#fca5a5', border:'1px solid rgba(239,68,68,0.4)'  }, card: { background:'rgba(239,68,68,0.07)',  border:'2px solid rgba(239,68,68,0.35)'  } },
};

/* ─── Shared style objects ─── */
const panel = {
    background:           'rgba(30,41,59,0.75)',
    border:               '1px solid rgba(51,65,85,0.5)',
    borderRadius:         '0.9rem',
    padding:              '1.5rem',
    backdropFilter:       'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
};

const tableWrap = {
    width:'100%', overflowX:'auto',
    borderRadius:'0.65rem',
    border:'1px solid rgba(51,65,85,0.5)',
};

const tbl = { width:'100%', borderCollapse:'collapse', fontSize:'0.85rem' };

const thStyle = {
    padding:'0.6rem 0.85rem', textAlign:'left',
    fontWeight:700, whiteSpace:'nowrap',
    background:'rgba(255,255,255,0.05)',
    color:'#93c5fd',
    borderBottom:'2px solid rgba(51,65,85,0.6)',
};

const tdStyle = (row) => ({
    padding:'0.58rem 0.85rem', textAlign:'left',
    borderBottom:'1px solid rgba(51,65,85,0.35)',
    background: row%2===0 ? 'rgba(255,255,255,0.02)' : 'transparent',
    color:'var(--text-muted)',
    fontSize:'0.83rem',
});

const nullBadge = {
    fontStyle:'italic', color:'#64748b', fontFamily:'monospace',
    background:'rgba(15,23,42,0.4)', padding:'0.1rem 0.4rem', borderRadius:'0.3rem',
};

const tabBtn = (active) => ({
    padding:'0.5rem 1.2rem', fontWeight:600, fontSize:'0.85rem',
    border:'none', background:'none', cursor:'pointer',
    borderBottom: active ? '2px solid #60a5fa' : '2px solid transparent',
    color: active ? '#93c5fd' : 'var(--text-muted)',
    transition:'all 0.2s ease',
});

const challengeBtn = (active) => ({
    width:'100%', textAlign:'left',
    padding:'0.8rem 0.9rem', borderRadius:'0.65rem',
    border: active ? '2px solid #3b82f6' : '1px solid rgba(51,65,85,0.5)',
    background: active ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.03)',
    cursor:'pointer', transition:'all 0.2s ease', display:'block',
});

const sqlTextarea = {
    width:'100%', minHeight:'130px',
    background:'rgba(15,23,42,0.85)',
    border:'2px solid rgba(51,65,85,0.6)',
    borderRadius:'0.65rem',
    padding:'0.85rem 1rem',
    color:'#4ade80',
    fontFamily:'monospace',
    fontSize:'0.875rem',
    resize:'vertical',
    outline:'none',
    transition:'border-color 0.2s ease',
    display:'block',
    lineHeight:1.6,
};

const actionBtn = (variant) => {
    const map = {
        run:   { background:'#2563eb', color:'#fff', border:'none' },
        check: { background:'#16a34a', color:'#fff', border:'none' },
        show:  { background:'rgba(245,158,11,0.18)', color:'#fbbf24', border:'1px solid rgba(245,158,11,0.4)' },
        reset: { background:'rgba(100,116,139,0.22)', color:'var(--text-muted)', border:'1px solid rgba(100,116,139,0.4)' },
    };
    return {
        padding:'0.62rem 1rem', borderRadius:'0.6rem',
        fontWeight:700, fontSize:'0.875rem',
        cursor:'pointer', transition:'all 0.2s ease',
        display:'inline-flex', alignItems:'center',
        justifyContent:'center', gap:'0.4rem', flex:1,
        ...map[variant],
    };
};

/* ─── Sub-components ─── */
const TableDisplay = ({ columns, data }) => (
    <div style={tableWrap}>
        <table style={tbl}>
            <thead>
                <tr>{columns.map((c,i)=><th key={i} style={thStyle}>{c}</th>)}</tr>
            </thead>
            <tbody>
                {data.map((row,ri)=>(
                    <tr key={ri}>
                        {row.map((val,ci)=>(
                            <td key={ci} style={tdStyle(ri)}>
                                {val===null ? <span style={nullBadge}>NULL</span> : String(val)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

/* ─── Main component ─── */
const SQLPracticeTool = () => {
    const [db,               setDb]               = useState(null);
    const [selectedChallenge,setSelectedChallenge] = useState(CHALLENGES[0]);
    const [sqlQuery,         setSqlQuery]          = useState('');
    const [queryResult,      setQueryResult]       = useState(null);
    const [queryError,       setQueryError]        = useState(null);
    const [isCheckingAnswer, setIsCheckingAnswer]  = useState(false);
    const [answerFeedback,   setAnswerFeedback]    = useState(null);
    const [showAnswer,       setShowAnswer]        = useState(false);
    const [initialized,      setInitialized]       = useState(false);
    const [initError,        setInitError]         = useState(null);
    const [activeTab,        setActiveTab]         = useState('users');

    const DB_SQL = `
        CREATE TABLE users  (id INTEGER PRIMARY KEY, name TEXT, email TEXT, age INTEGER, is_active INTEGER);
        CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, status TEXT, created_at TEXT);
        INSERT INTO users  VALUES (1,'Carlos','carlos@email.com',26,1),(2,'Anna','anna@email.com',30,1),(3,'John',NULL,22,1),(4,'Maria','maria@email.com',28,0),(5,'Carlos','carlos@email.com',26,1);
        INSERT INTO orders VALUES (1,1,500,'completed','2024-05-01'),(2,1,300,'completed','2024-05-02'),(3,2,200,'pending','2024-05-03'),(4,3,150,'completed','2024-05-04'),(5,99,999,'completed','2024-05-05');
    `;

    const buildDb = async () => {
        try {
            const sqlJs    = await initSQL();
            const database = new sqlJs.Database();
            DB_SQL.split(';').forEach(s => { if (s.trim()) database.run(s); });
            setDb(database);
            setInitialized(true);
            setSqlQuery(''); setQueryResult(null); setQueryError(null);
            setAnswerFeedback(null); setShowAnswer(false);
        } catch (err) {
            console.error('DB init error:', err);
            setInitError(err.message || 'Failed to initialize database.');
        }
    };

    useEffect(() => { buildDb(); }, []);

    const executeQuery = (query) => {
        if (!db) return;
        try {
            setQueryError(null); setQueryResult(null); setAnswerFeedback(null);
            const q = query.trim();
            if (!q) { setQueryError('Please enter a SQL query.'); return; }
            const res = db.exec(q);
            setQueryResult(res && res.length > 0 ? res[0] : { columns:[], values:[] });
        } catch (err) { setQueryError('SQL Error: ' + err.message); }
    };

    const handleCheckAnswer = () => {
        setIsCheckingAnswer(true);
        setTimeout(() => {
            try {
                const uRes = db.exec(sqlQuery.trim());
                const aRes = db.exec(selectedChallenge.answer);
                const u = uRes && uRes.length>0 ? uRes[0] : {columns:[],values:[]};
                const a = aRes && aRes.length>0 ? aRes[0] : {columns:[],values:[]};
                const ok = JSON.stringify(u) === JSON.stringify(a);
                setAnswerFeedback({ isCorrect:ok, message: ok ? '✓ Correct! Your query matches the expected result.' : '✗ Not quite right. Try again or check the answer.' });
            } catch (err) {
                setAnswerFeedback({ isCorrect:false, message:'✗ Error in your query: ' + err.message });
            }
            setIsCheckingAnswer(false);
        }, 500);
    };

    const handleResetDatabase = () => {
        setDb(null); setInitialized(false);
        setSqlQuery(''); setQueryResult(null); setQueryError(null);
        setAnswerFeedback(null); setShowAnswer(false);
        buildDb();
    };

    const handleSelectChallenge = (c) => {
        setSelectedChallenge(c); setSqlQuery('');
        setQueryResult(null); setQueryError(null);
        setAnswerFeedback(null); setShowAnswer(false);
    };

    /* ── Loading / Error ── */
    if (initError) return (
        <div style={{ padding:'3rem 0' }}>
            <div style={{ ...panel, maxWidth:'30rem', margin:'0 auto', borderColor:'rgba(239,68,68,0.4)', background:'rgba(239,68,68,0.1)' }}>
                <div style={{ display:'flex', gap:'0.65rem', alignItems:'center', marginBottom:'0.65rem' }}>
                    <AlertTriangle size={18} color="#f87171" />
                    <strong style={{ color:'#f87171' }}>Initialization Error</strong>
                </div>
                <p style={{ color:'#fca5a5', fontSize:'0.88rem', marginBottom:'1rem' }}>{initError}</p>
                <button className="qa-btn qa-btn-primary" onClick={() => window.location.reload()}>Reload Page</button>
            </div>
        </div>
    );

    if (!initialized) return (
        <div style={{ padding:'4rem 0', textAlign:'center', color:'var(--text-muted)' }}>
            <Database size={36} color="var(--primary)" style={{ marginBottom:'1rem', opacity:0.55 }} />
            <p style={{ fontSize:'0.95rem', fontWeight:500 }}>Initializing SQL database…</p>
        </div>
    );

    const ds = DIFF[selectedChallenge.difficulty] || DIFF.Easy;

    return (
        <div>
            {/* ── Header ── */}
            <div style={{ marginBottom:'1.5rem' }}>
                <h1 style={{ fontSize:'2rem', fontWeight:800, display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.3rem' }}>
                    <Database size={28} color="var(--primary)" />
                    SQL Practice
                </h1>
                <p style={{ color:'var(--text-muted)', fontSize:'0.97rem' }}>Master SQL queries with interactive challenges</p>
            </div>

            {/* ── Sample Database ── */}
            <div style={{ ...panel, marginBottom:'1.5rem' }}>
                <h2 style={{ fontSize:'1.1rem', fontWeight:700, display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1rem' }}>
                    <Database size={17} color="var(--primary)" /> Sample Database
                </h2>

                {/* Tabs */}
                <div style={{ display:'flex', borderBottom:'1px solid rgba(51,65,85,0.5)', marginBottom:'1rem' }}>
                    <button style={tabBtn(activeTab==='users')}  onClick={()=>setActiveTab('users')}>👥 Users Table</button>
                    <button style={tabBtn(activeTab==='orders')} onClick={()=>setActiveTab('orders')}>📦 Orders Table</button>
                </div>

                {activeTab==='users'  && <TableDisplay columns={USERS_COLS}  data={USERS_DATA}  />}
                {activeTab==='orders' && <TableDisplay columns={ORDERS_COLS} data={ORDERS_DATA} />}
            </div>

            {/* ── Three-column layout ── */}
            <div style={{ display:'grid', gridTemplateColumns:'210px 1fr 250px', gap:'1.35rem', alignItems:'start' }}>

                {/* LEFT – Challenges */}
                <div style={{ ...panel, position:'sticky', top:'8rem' }}>
                    <h2 style={{ fontSize:'1rem', fontWeight:700, marginBottom:'0.9rem', color:'var(--text-main)' }}>Challenges</h2>
                    <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                        {CHALLENGES.map(ch => {
                            const active = selectedChallenge.id === ch.id;
                            const d = DIFF[ch.difficulty] || DIFF.Easy;
                            return (
                                <button key={ch.id} onClick={()=>handleSelectChallenge(ch)} style={challengeBtn(active)}>
                                    <p style={{ fontWeight:600, fontSize:'0.8rem', color: active ? '#93c5fd' : 'var(--text-main)', marginBottom:'0.35rem', lineHeight:1.4 }}>
                                        {ch.id}. {ch.title}
                                    </p>
                                    <span style={{ ...d.pill, display:'inline-block', fontSize:'0.7rem', fontWeight:700, borderRadius:'999px', padding:'0.1rem 0.5rem' }}>
                                        {ch.difficulty}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* MIDDLE – SQL Editor */}
                <div style={{ ...panel, display:'flex', flexDirection:'column', gap:'1rem' }}>
                    {/* Challenge description card */}
                    <div style={{ ...ds.card, borderRadius:'0.65rem', padding:'1rem 1.1rem' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'0.75rem', marginBottom:'0.45rem' }}>
                            <h3 style={{ fontSize:'1.05rem', fontWeight:700, color:'var(--text-main)' }}>{selectedChallenge.title}</h3>
                            <span style={{ ...ds.pill, borderRadius:'999px', padding:'0.14rem 0.6rem', fontSize:'0.72rem', fontWeight:700, flexShrink:0 }}>
                                {selectedChallenge.difficulty}
                            </span>
                        </div>
                        <p style={{ color:'var(--text-muted)', fontSize:'0.88rem', marginBottom:'0.45rem' }}>{selectedChallenge.description}</p>
                        <p style={{ color:'var(--text-muted)', fontSize:'0.8rem' }}>
                            <span style={{ fontWeight:600 }}>📊 Tables used:</span>{' '}
                            <code style={{ background:'rgba(15,23,42,0.4)', padding:'0.1rem 0.4rem', borderRadius:'0.3rem', fontFamily:'monospace' }}>
                                {selectedChallenge.tables}
                            </code>
                        </p>
                    </div>

                    {/* Query label */}
                    <label style={{ fontSize:'0.83rem', fontWeight:700, color:'var(--text-muted)', display:'flex', alignItems:'center', gap:'0.4rem' }}>
                        <Code2 size={15} color="var(--primary)" /> Write Your SQL Query
                    </label>

                    {/* Textarea */}
                    <textarea
                        value={sqlQuery}
                        onChange={e => setSqlQuery(e.target.value)}
                        placeholder="SELECT * FROM users WHERE is_active = 1;"
                        style={sqlTextarea}
                        onFocus={e  => { e.target.style.borderColor = 'rgba(16,185,129,0.6)'; }}
                        onBlur={e   => { e.target.style.borderColor = 'rgba(51,65,85,0.6)';   }}
                        spellCheck={false}
                    />

                    {/* Reveal answer */}
                    {showAnswer && (
                        <div style={{ background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.35)', borderRadius:'0.6rem', padding:'0.8rem 1rem' }}>
                            <p style={{ fontSize:'0.72rem', fontWeight:700, color:'#fbbf24', marginBottom:'0.4rem', textTransform:'uppercase', letterSpacing:'0.05em' }}>
                                Expected Answer:
                            </p>
                            <code style={{ color:'#fde68a', fontSize:'0.8rem', fontFamily:'monospace', wordBreak:'break-all', display:'block', lineHeight:1.6 }}>
                                {selectedChallenge.answer}
                            </code>
                        </div>
                    )}

                    {/* Feedback */}
                    {answerFeedback && (
                        <div style={{
                            display:'flex', alignItems:'flex-start', gap:'0.55rem',
                            padding:'0.7rem 1rem', borderRadius:'0.6rem',
                            border:`2px solid ${answerFeedback.isCorrect ? 'rgba(34,197,94,0.45)' : 'rgba(239,68,68,0.4)'}`,
                            background: answerFeedback.isCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                            color: answerFeedback.isCorrect ? '#86efac' : '#fca5a5',
                        }}>
                            {answerFeedback.isCorrect
                                ? <CheckCircle2 size={17} style={{ flexShrink:0, marginTop:'0.1rem' }} />
                                : <AlertTriangle size={17} style={{ flexShrink:0, marginTop:'0.1rem' }} />
                            }
                            <span style={{ fontSize:'0.86rem', fontWeight:500 }}>{answerFeedback.message}</span>
                        </div>
                    )}

                    {/* Action buttons */}
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.55rem' }}>
                        <button style={{ ...actionBtn('run'),   opacity: !sqlQuery.trim() ? 0.5 : 1, cursor: !sqlQuery.trim() ? 'not-allowed' : 'pointer' }}
                            onClick={() => executeQuery(sqlQuery)} disabled={!sqlQuery.trim()}>
                            <Play size={14} /> Run Query
                        </button>
                        <button style={{ ...actionBtn('check'), opacity: (!sqlQuery.trim()||isCheckingAnswer) ? 0.5 : 1, cursor: (!sqlQuery.trim()||isCheckingAnswer) ? 'not-allowed' : 'pointer' }}
                            onClick={handleCheckAnswer} disabled={!sqlQuery.trim()||isCheckingAnswer}>
                            <CheckCircle2 size={14} /> Check Answer
                        </button>
                        <button style={actionBtn('show')}  onClick={() => setShowAnswer(!showAnswer)}>
                            {showAnswer ? '🔒 Hide' : '🔓 Show'}
                        </button>
                        <button style={actionBtn('reset')} onClick={handleResetDatabase}>
                            <RotateCcw size={14} /> Reset
                        </button>
                    </div>
                </div>

                {/* RIGHT – Query Results */}
                <div style={{ ...panel, position:'sticky', top:'8rem', display:'flex', flexDirection:'column', gap:'0.9rem' }}>
                    <h2 style={{ fontSize:'1rem', fontWeight:700, color:'var(--text-main)' }}>Query Results</h2>

                    {/* Error */}
                    {queryError && (
                        <div style={{ background:'rgba(239,68,68,0.1)', border:'2px solid rgba(239,68,68,0.4)', borderRadius:'0.6rem', padding:'0.7rem 0.9rem' }}>
                            <div style={{ display:'flex', gap:'0.45rem', alignItems:'center', marginBottom:'0.3rem' }}>
                                <AlertTriangle size={14} color="#f87171" />
                                <span style={{ fontSize:'0.8rem', fontWeight:700, color:'#f87171' }}>SQL Error</span>
                            </div>
                            <p style={{ fontSize:'0.78rem', fontFamily:'monospace', color:'#fca5a5', wordBreak:'break-word', lineHeight:1.5 }}>{queryError}</p>
                        </div>
                    )}

                    {/* Results */}
                    {queryResult && !queryError && (
                        queryResult.values && queryResult.values.length > 0 ? (
                            <div>
                                <div style={{ overflowX:'auto', borderRadius:'0.55rem', border:'1px solid rgba(51,65,85,0.45)' }}>
                                    <table style={{ ...tbl, fontSize:'0.78rem' }}>
                                        <thead>
                                            <tr>{queryResult.columns.map((c,i)=><th key={i} style={{ ...thStyle, fontSize:'0.75rem', padding:'0.45rem 0.65rem' }}>{c}</th>)}</tr>
                                        </thead>
                                        <tbody>
                                            {queryResult.values.slice(0,50).map((row,ri)=>(
                                                <tr key={ri}>
                                                    {row.map((val,ci)=>(
                                                        <td key={ci} style={{ ...tdStyle(ri), padding:'0.42rem 0.65rem', fontSize:'0.77rem', whiteSpace:'nowrap' }}>
                                                            {val===null ? <span style={nullBadge}>NULL</span> : (String(val).length>18 ? String(val).slice(0,15)+'…' : String(val))}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p style={{ fontSize:'0.76rem', color:'var(--text-muted)', marginTop:'0.55rem' }}>
                                    ✓ {queryResult.values.length} row(s) returned{queryResult.values.length>50 && ' (showing first 50)'}
                                </p>
                            </div>
                        ) : (
                            <div style={{ textAlign:'center', padding:'1.5rem 0', color:'var(--text-muted)', fontSize:'0.86rem' }}>No results returned</div>
                        )
                    )}

                    {/* Empty state */}
                    {!queryResult && !queryError && (
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2.5rem 0', color:'var(--text-muted)', gap:'0.65rem' }}>
                            <Database size={30} style={{ opacity:0.28 }} />
                            <p style={{ fontSize:'0.86rem', fontWeight:500 }}>Run a query to see results</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default SQLPracticeTool;

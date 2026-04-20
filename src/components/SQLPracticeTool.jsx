import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertTriangle, Code2, Database, ChevronDown } from 'lucide-react';

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
    { id: 11, title: 'Find users older than 25',                        difficulty: 'Easy',   description: 'Get all users with age greater than 25.',                                                            answer: 'SELECT * FROM users WHERE age > 25;',                                                                                                                    tables: 'users' },
    { id: 12, title: 'Sort users by name alphabetically',               difficulty: 'Easy',   description: 'List all users sorted by name in ascending order.',                                                  answer: 'SELECT * FROM users ORDER BY name ASC;',                                                                                                                 tables: 'users' },
    { id: 13, title: 'Find pending orders sorted by amount',            difficulty: 'Easy',   description: 'Get all pending orders, sorted by amount in descending order.',                                       answer: "SELECT * FROM orders WHERE status = 'pending' ORDER BY amount DESC;",                                                                                     tables: 'orders' },
    { id: 14, title: 'Count orders by status',                          difficulty: 'Medium', description: 'Count how many orders exist for each status (completed, pending).',                                  answer: "SELECT status, COUNT(*) AS count FROM orders GROUP BY status;",                                                                                           tables: 'orders' },
    { id: 15, title: 'Get all users with LEFT JOIN their orders',       difficulty: 'Medium', description: 'Show all users and their orders, including users with no orders.',                                   answer: 'SELECT u.id, u.name, u.email, o.id AS order_id, o.amount FROM users u LEFT JOIN orders o ON u.id = o.user_id;',                                         tables: 'users, orders' },
    { id: 16, title: 'Find users with no orders using LEFT JOIN',       difficulty: 'Medium', description: 'Use LEFT JOIN to find all users who have not placed any orders (order_id is NULL).',                answer: 'SELECT u.* FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE o.id IS NULL;',                                                                   tables: 'users, orders' },
    { id: 17, title: 'Calculate average order amount',                  difficulty: 'Medium', description: 'Find the average amount across all orders.',                                                         answer: 'SELECT AVG(amount) AS average_amount FROM orders;',                                                                                                        tables: 'orders' },
    { id: 18, title: 'Find users with multiple completed orders',       difficulty: 'Hard',   description: 'List users who have placed more than one completed order, with order count.',                       answer: "SELECT u.id, u.name, COUNT(o.id) AS order_count FROM users u JOIN orders o ON u.id = o.user_id WHERE o.status = 'completed' GROUP BY u.id, u.name HAVING COUNT(o.id) > 1;",  tables: 'users, orders' },
    { id: 19, title: 'LEFT JOIN with aggregation (all users + order count)', difficulty: 'Hard', description: 'Show all users with their order count, including those with no orders.',                   answer: 'SELECT u.id, u.name, COUNT(o.id) AS order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id, u.name;',                            tables: 'users, orders' },
    { id: 20, title: 'Complex: Active users with expensive orders',     difficulty: 'Hard',   description: 'Find active users who have completed orders with amount > 200, sorted by total spent.',           answer: "SELECT u.id, u.name, SUM(o.amount) AS total_spent FROM users u JOIN orders o ON u.id = o.user_id WHERE u.is_active = 1 AND o.status = 'completed' AND o.amount > 200 GROUP BY u.id, u.name ORDER BY total_spent DESC;",  tables: 'users, orders' },
    { id: 21, title: 'CASE WHEN: Label orders by amount size',           difficulty: 'Medium', description: 'Label each order as "High" (amount > 400), "Mid" (200–400), or "Low" (< 200) using CASE WHEN. Return id, amount, and the label as size_category.',  answer: "SELECT id, amount, CASE WHEN amount > 400 THEN 'High' WHEN amount >= 200 THEN 'Mid' ELSE 'Low' END AS size_category FROM orders;", tables: 'orders' },
    { id: 22, title: 'EXISTS: Users with at least one pending order',    difficulty: 'Medium', description: 'Use EXISTS to find all users who have at least one order with status = pending.',               answer: "SELECT * FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.status = 'pending');", tables: 'users, orders' },
    { id: 23, title: 'NOT EXISTS: Users with no completed order',        difficulty: 'Medium', description: 'Use NOT EXISTS to find all users who have never placed a completed order.',                      answer: "SELECT * FROM users u WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.status = 'completed');", tables: 'users, orders' },
    { id: 24, title: 'Self-join: Find users sharing the same name',      difficulty: 'Medium', description: 'Find pairs of users who share the same name but have different IDs. Return id1, id2, and name.',  answer: 'SELECT a.id AS id1, b.id AS id2, a.name FROM users a JOIN users b ON a.name = b.name AND a.id < b.id;', tables: 'users' },
    { id: 25, title: 'UNION: Combine user names and product names',      difficulty: 'Medium', description: 'Produce a single list of all user names and all product names with a type column ("User" or "Product"), sorted by name.',  answer: "SELECT name, 'User' AS type FROM users UNION SELECT name, 'Product' AS type FROM products ORDER BY name;", tables: 'users, products' },
    { id: 26, title: 'Window: ROW_NUMBER per user orders',               difficulty: 'Hard',   description: 'Assign a sequential row number to each order per user, ordered by created_at. Return id, user_id, amount, created_at, and order_num.',   answer: 'SELECT id, user_id, amount, created_at, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) AS order_num FROM orders;', tables: 'orders' },
    { id: 27, title: 'Window: RANK users by total spending',             difficulty: 'Hard',   description: 'Rank all users by their total spending on completed orders, highest first, using RANK(). Return user_id, total_spent, and spending_rank.',  answer: "SELECT user_id, SUM(amount) AS total_spent, RANK() OVER (ORDER BY SUM(amount) DESC) AS spending_rank FROM orders WHERE status = 'completed' GROUP BY user_id;", tables: 'orders' },
    { id: 28, title: 'CTE: Users spending above average',               difficulty: 'Hard',   description: 'Using a CTE named user_totals, find users whose total completed order amount is above the average total spending per user. Return id, name, and total_spent.',  answer: "WITH user_totals AS (SELECT user_id, SUM(amount) AS total_spent FROM orders WHERE status = 'completed' GROUP BY user_id) SELECT u.id, u.name, ut.total_spent FROM users u JOIN user_totals ut ON u.id = ut.user_id WHERE ut.total_spent > (SELECT AVG(total_spent) FROM user_totals);", tables: 'users, orders' },
    { id: 29, title: '3-Table JOIN: Products ordered by each user',      difficulty: 'Hard',   description: 'Using a 3-table JOIN across users → orders → order_items → products, find each distinct user name and the product names they purchased.',  answer: 'SELECT DISTINCT u.name AS user_name, p.name AS product_name FROM users u JOIN orders o ON u.id = o.user_id JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id;', tables: 'users, orders, order_items, products' },
    { id: 30, title: 'Total revenue per product category',               difficulty: 'Hard',   description: 'Calculate total revenue (quantity × price) per product category using order_items and products. Sort by total_revenue descending.',  answer: 'SELECT p.category, SUM(oi.quantity * p.price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category ORDER BY total_revenue DESC;', tables: 'products, order_items' },
];

const USERS_DATA = [[1,'Carlos','carlos@email.com',26,1],[2,'Anna','anna@email.com',30,1],[3,'John',null,22,1],[4,'Maria','maria@email.com',28,0],[5,'Carlos','carlos@email.com',26,1],[6,'Elena','elena@email.com',35,1],[7,'David',null,19,1],[8,'Sarah','sarah@email.com',31,0],[9,'Michael','michael@email.com',27,1],[10,'Lisa',null,24,0]];
const USERS_COLS  = ['id','name','email','age','is_active'];
const ORDERS_DATA = [[1,1,500,'completed','2024-05-01'],[2,1,300,'completed','2024-05-02'],[3,2,200,'pending','2024-05-03'],[4,3,150,'completed','2024-05-04'],[5,4,250,'completed','2024-05-05'],[6,99,999,'completed','2024-05-06'],[7,2,450,'completed','2024-05-07'],[8,5,320,'pending','2024-05-08'],[9,6,600,'completed','2024-05-09'],[10,8,175,'completed','2024-05-10']];
const ORDERS_COLS = ['id','user_id','amount','status','created_at'];
const PRODUCTS_DATA = [[1,'Laptop','Electronics',1200,1],[2,'Mouse','Electronics',35,1],[3,'Keyboard','Electronics',75,1],[4,'Monitor','Electronics',450,1],[5,'Desk','Furniture',300,1],[6,'Chair','Furniture',250,0],[7,'Notebook','Stationery',5,1],[8,'Pen','Stationery',2,1],[9,'Headphones','Electronics',150,0],[10,'Webcam','Electronics',90,1]];
const PRODUCTS_COLS = ['id','name','category','price','is_available'];
const ORDER_ITEMS_DATA = [[1,1,1,1],[2,1,2,2],[3,2,3,1],[4,3,5,1],[5,4,7,3],[6,5,4,1],[7,6,1,2],[8,7,6,1],[9,8,10,2],[10,9,9,1]];
const ORDER_ITEMS_COLS = ['id','order_id','product_id','quantity'];

/* ─── Difficulty colour maps (no Tailwind) ─── */
const DIFF = {
    Easy:   { pill: { background:'rgba(34,197,94,0.18)',  color:'#86efac', border:'1px solid rgba(34,197,94,0.4)'  }, card: { background:'rgba(34,197,94,0.07)',  border:'2px solid rgba(34,197,94,0.35)'  } },
    Medium: { pill: { background:'rgba(234,179,8,0.18)',  color:'#fcd34d', border:'1px solid rgba(234,179,8,0.42)' }, card: { background:'rgba(234,179,8,0.07)',  border:'2px solid rgba(234,179,8,0.35)'  } },
    Hard:   { pill: { background:'rgba(239,68,68,0.18)',  color:'#fca5a5', border:'1px solid rgba(239,68,68,0.4)'  }, card: { background:'rgba(239,68,68,0.07)',  border:'2px solid rgba(239,68,68,0.35)'  } },
};

/* ─── Shared style objects ─── */
const panel = {
    background:           'var(--surface)',
    border:               '1px solid var(--border)',
    borderRadius:         '0.9rem',
    padding:              '1.5rem',
    backdropFilter:       'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
};

const tableWrap = {
    width:'100%', overflowX:'auto',
    borderRadius:'0.65rem',
    border:'1px solid var(--border)',
};

const tbl = { width:'100%', borderCollapse:'collapse', fontSize:'0.85rem' };

const thStyle = {
    padding:'0.6rem 0.85rem', textAlign:'left',
    fontWeight:700, whiteSpace:'nowrap',
    background:'var(--sql-table-header-bg)',
    color:'var(--sql-table-header-text)',
    borderBottom:'2px solid var(--sql-table-border)',
};

const tdStyle = (row) => ({
    padding:'0.58rem 0.85rem', textAlign:'left',
    borderBottom:'1px solid var(--sql-table-border)',
    background: row%2===0 ? 'var(--sql-table-row-alt-bg)' : 'transparent',
    color:'var(--text-muted)',
    fontSize:'0.83rem',
});

const nullBadge = {
    fontStyle:'italic', color:'var(--sql-null-badge-text)', fontFamily:'monospace',
    background:'var(--sql-null-badge-bg)', padding:'0.1rem 0.4rem', borderRadius:'0.3rem',
};

const tabBtn = (active) => ({
    padding:'0.5rem 1.2rem', fontWeight:600, fontSize:'0.85rem',
    border:'none', background:'none', cursor:'pointer',
    borderBottom: active ? '2px solid var(--sql-tab-active-border)' : '2px solid transparent',
    color: active ? 'var(--sql-tab-active-text)' : 'var(--text-muted)',
    transition:'all 0.2s ease',
});

const challengeBtn = (active) => ({
    width:'100%', textAlign:'left',
    padding:'0.8rem 0.9rem', borderRadius:'0.65rem',
    border: active ? '2px solid var(--primary)' : '1px solid var(--border)',
    background: active ? 'var(--primary-glow)' : 'var(--surface-soft)',
    cursor:'pointer', transition:'all 0.2s ease', display:'block',
});

const sqlTextarea = {
    width:'100%', minHeight:'130px',
    maxHeight:'calc(32em + 1.7rem + 4px)',
    background:'var(--sql-textarea-bg)',
    border:'2px solid var(--sql-textarea-border)',
    borderRadius:'0.65rem',
    padding:'0.85rem 1rem',
    color:'var(--sql-code-text)',
    fontFamily:'monospace',
    fontSize:'0.875rem',
    resize:'vertical',
    outline:'none',
    transition:'border-color 0.2s ease',
    display:'block',
    lineHeight:1.6,
    overflowY:'auto',
};

const actionBtn = (variant) => {
    const map = {
        run:   { background:'var(--sql-btn-run-bg)', color:'#fff', border:'none' },
        check: { background:'var(--sql-btn-check-bg)', color:'#fff', border:'none' },
        show:  { background:'rgba(245,158,11,0.18)', color:'#fbbf24', border:'1px solid rgba(245,158,11,0.4)' },
        reset: { background:'var(--surface-soft)', color:'var(--text-muted)', border:'1px solid var(--border)' },
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
    const [isDropdownOpen,   setIsDropdownOpen]    = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const DB_SQL = `
        CREATE TABLE users  (id INTEGER PRIMARY KEY, name TEXT, email TEXT, age INTEGER, is_active INTEGER);
        CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, status TEXT, created_at TEXT);
        CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, category TEXT, price REAL, is_available INTEGER);
        CREATE TABLE order_items (id INTEGER PRIMARY KEY, order_id INTEGER, product_id INTEGER, quantity INTEGER);
        INSERT INTO users  VALUES (1,'Carlos','carlos@email.com',26,1),(2,'Anna','anna@email.com',30,1),(3,'John',NULL,22,1),(4,'Maria','maria@email.com',28,0),(5,'Carlos','carlos@email.com',26,1),(6,'Elena','elena@email.com',35,1),(7,'David',NULL,19,1),(8,'Sarah','sarah@email.com',31,0),(9,'Michael','michael@email.com',27,1),(10,'Lisa',NULL,24,0);
        INSERT INTO orders VALUES (1,1,500,'completed','2024-05-01'),(2,1,300,'completed','2024-05-02'),(3,2,200,'pending','2024-05-03'),(4,3,150,'completed','2024-05-04'),(5,4,250,'completed','2024-05-05'),(6,99,999,'completed','2024-05-06'),(7,2,450,'completed','2024-05-07'),(8,5,320,'pending','2024-05-08'),(9,6,600,'completed','2024-05-09'),(10,8,175,'completed','2024-05-10');
        INSERT INTO products VALUES (1,'Laptop','Electronics',1200,1),(2,'Mouse','Electronics',35,1),(3,'Keyboard','Electronics',75,1),(4,'Monitor','Electronics',450,1),(5,'Desk','Furniture',300,1),(6,'Chair','Furniture',250,0),(7,'Notebook','Stationery',5,1),(8,'Pen','Stationery',2,1),(9,'Headphones','Electronics',150,0),(10,'Webcam','Electronics',90,1);
        INSERT INTO order_items VALUES (1,1,1,1),(2,1,2,2),(3,2,3,1),(4,3,5,1),(5,4,7,3),(6,5,4,1),(7,6,1,2),(8,7,6,1),(9,8,10,2),(10,9,9,1);
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
                    <strong style={{ color:'var(--text-main)' }}>Initialization Error</strong>
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
                <div style={{ display:'flex', borderBottom:'1px solid var(--border)', marginBottom:'1rem', flexWrap:'wrap' }}>
                    <button style={tabBtn(activeTab==='users')}        onClick={()=>setActiveTab('users')}>👥 Users</button>
                    <button style={tabBtn(activeTab==='orders')}       onClick={()=>setActiveTab('orders')}>📦 Orders</button>
                    <button style={tabBtn(activeTab==='products')}     onClick={()=>setActiveTab('products')}>🛒 Products</button>
                    <button style={tabBtn(activeTab==='order_items')}  onClick={()=>setActiveTab('order_items')}>🔗 Order Items</button>
                </div>

                {activeTab==='users'       && <TableDisplay columns={USERS_COLS}       data={USERS_DATA}       />}
                {activeTab==='orders'      && <TableDisplay columns={ORDERS_COLS}      data={ORDERS_DATA}      />}
                {activeTab==='products'    && <TableDisplay columns={PRODUCTS_COLS}    data={PRODUCTS_DATA}    />}
                {activeTab==='order_items' && <TableDisplay columns={ORDER_ITEMS_COLS} data={ORDER_ITEMS_DATA} />}
            </div>

            {/* ── Challenge Selector Dropdown ── */}
            <div style={{ ...panel, marginBottom:'1.5rem', position:'relative', zIndex:10 }}>
                <label style={{ fontSize:'0.87rem', fontWeight:700, color:'var(--text-muted)', display:'block', marginBottom:'0.6rem' }}>
                    Select Challenge
                </label>

                {/* Custom Dropdown */}
                <div ref={dropdownRef} style={{ position:'relative', width:'100%' }}>
                    {/* Trigger */}
                    <button
                        onClick={() => setIsDropdownOpen(o => !o)}
                        style={{
                            width:'100%',
                            padding:'0.7rem 0.9rem',
                            borderRadius: isDropdownOpen ? '0.65rem 0.65rem 0 0' : '0.65rem',
                            border:`2px solid ${isDropdownOpen ? 'var(--primary)' : 'var(--sql-textarea-border)'}`,
                            background:'var(--sql-textarea-bg)',
                            color:'var(--text-main)',
                            fontFamily:'inherit',
                            fontSize:'0.9rem',
                            fontWeight:600,
                            cursor:'pointer',
                            transition:'border-color 0.2s ease, border-radius 0.15s ease',
                            outline:'none',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'space-between',
                            gap:'0.5rem',
                            textAlign:'left',
                        }}
                    >
                        <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                            #{selectedChallenge.id} - {selectedChallenge.title} ({selectedChallenge.difficulty})
                        </span>
                        <ChevronDown
                            size={16}
                            style={{
                                flexShrink:0,
                                transition:'transform 0.2s ease',
                                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                color:'var(--text-muted)',
                            }}
                        />
                    </button>

                    {/* Menu */}
                    {isDropdownOpen && (
                        <div style={{
                            position:'absolute',
                            top:'100%',
                            left:0,
                            right:0,
                            zIndex:999,
                            background:'var(--sql-textarea-bg)',
                            border:'2px solid var(--primary)',
                            borderTop:'none',
                            borderRadius:'0 0 0.65rem 0.65rem',
                            overflowY:'auto',
                            maxHeight:'calc(10 * 2.6rem)',
                            boxShadow:'0 8px 24px rgba(0,0,0,0.35)',
                        }}>
                            {CHALLENGES.map((ch, idx) => {
                                const isSelected = ch.id === selectedChallenge.id;
                                const diffColor = { Easy:'#86efac', Medium:'#fcd34d', Hard:'#fca5a5' }[ch.difficulty];
                                return (
                                    <button
                                        key={ch.id}
                                        onClick={() => { handleSelectChallenge(ch); setIsDropdownOpen(false); }}
                                        style={{
                                            width:'100%',
                                            padding:'0.62rem 0.9rem',
                                            background: isSelected ? 'var(--primary-glow)' : idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                                            border:'none',
                                            borderBottom: idx < CHALLENGES.length - 1 ? '1px solid var(--border)' : 'none',
                                            color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                                            fontFamily:'inherit',
                                            fontSize:'0.875rem',
                                            fontWeight: isSelected ? 700 : 500,
                                            cursor:'pointer',
                                            textAlign:'left',
                                            display:'flex',
                                            alignItems:'center',
                                            justifyContent:'space-between',
                                            gap:'0.5rem',
                                            transition:'background 0.15s ease',
                                        }}
                                        onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                                        onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'; }}
                                    >
                                        <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                                            #{ch.id} - {ch.title}
                                        </span>
                                        <span style={{
                                            flexShrink:0,
                                            fontSize:'0.7rem',
                                            fontWeight:700,
                                            color: diffColor,
                                            background: `${diffColor}22`,
                                            border: `1px solid ${diffColor}55`,
                                            borderRadius:'999px',
                                            padding:'0.1rem 0.5rem',
                                        }}>
                                            {ch.difficulty}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.6rem', marginTop:'0.8rem' }}>
                    <button
                        onClick={() => {
                            const prevId = selectedChallenge.id - 1;
                            const prevChallenge = CHALLENGES.find(c => c.id === prevId);
                            if (prevChallenge) handleSelectChallenge(prevChallenge);
                        }}
                        disabled={selectedChallenge.id === 1}
                        style={{
                            padding:'0.65rem 1rem',
                            borderRadius:'0.6rem',
                            border:'1px solid var(--primary)',
                            background: selectedChallenge.id === 1 ? 'var(--surface-soft)' : 'var(--primary-glow)',
                            color: selectedChallenge.id === 1 ? 'var(--text-muted)' : 'var(--primary)',
                            fontWeight:600,
                            fontSize:'0.85rem',
                            cursor: selectedChallenge.id === 1 ? 'not-allowed' : 'pointer',
                            transition:'all 0.2s ease',
                            opacity: selectedChallenge.id === 1 ? 0.5 : 1,
                        }}
                    >
                        ← Previous Challenge
                    </button>
                    <button
                        onClick={() => {
                            const nextId = selectedChallenge.id + 1;
                            const nextChallenge = CHALLENGES.find(c => c.id === nextId);
                            if (nextChallenge) handleSelectChallenge(nextChallenge);
                        }}
                        disabled={selectedChallenge.id === CHALLENGES.length}
                        style={{
                            padding:'0.65rem 1rem',
                            borderRadius:'0.6rem',
                            border:'1px solid var(--primary)',
                            background: selectedChallenge.id === CHALLENGES.length ? 'var(--surface-soft)' : 'var(--primary-glow)',
                            color: selectedChallenge.id === CHALLENGES.length ? 'var(--text-muted)' : 'var(--primary)',
                            fontWeight:600,
                            fontSize:'0.85rem',
                            cursor: selectedChallenge.id === CHALLENGES.length ? 'not-allowed' : 'pointer',
                            transition:'all 0.2s ease',
                            opacity: selectedChallenge.id === CHALLENGES.length ? 0.5 : 1,
                        }}
                    >
                        Next Challenge →
                    </button>
                </div>

                {/* Challenge Info Below Dropdown */}
                <div style={{ ...ds.card, borderRadius:'0.65rem', padding:'1rem 1.1rem', marginTop:'1rem' }}>
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
            </div>

            {/* ── Single-column layout (Editor on top, Results below) ── */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'1.35rem', alignItems:'start' }}>

                {/* LEFT – SQL Editor */}
                <div style={{ ...panel, display:'flex', flexDirection:'column', gap:'1rem' }}>
                    {/* Query label */}
                    <label style={{ fontSize:'0.83rem', fontWeight:700, color:'var(--text-muted)', display:'flex', alignItems:'center', gap:'0.4rem' }}>
                        <Code2 size={15} color="var(--primary)" /> Write Your SQL Query
                    </label>

                    {/* Textarea */}
                    <textarea
                        value={sqlQuery}
                        onChange={e => setSqlQuery(e.target.value)}
                        placeholder="SELECT * FROM users WHERE is_active = 1;"
                        style={{ ...sqlTextarea, minHeight:'200px' }}
                        onFocus={e  => { e.target.style.borderColor = 'var(--primary)'; }}
                        onBlur={e   => { e.target.style.borderColor = 'var(--sql-textarea-border)';   }}
                        spellCheck={false}
                    />

                    {/* Reveal answer */}
                    {showAnswer && (
                        <div style={{ background:'var(--surface-soft)', border:'1px solid var(--border)', borderRadius:'0.6rem', padding:'0.8rem 1rem' }}>
                            <p style={{ fontSize:'0.72rem', fontWeight:700, color:'var(--text-main)', marginBottom:'0.4rem', textTransform:'uppercase', letterSpacing:'0.05em' }}>
                                Expected Answer:
                            </p>
                            <code style={{ color:'var(--text-main)', fontSize:'0.8rem', fontFamily:'monospace', wordBreak:'break-all', display:'block', lineHeight:1.6 }}>
                                {selectedChallenge.answer}
                            </code>
                        </div>
                    )}

                    {/* Feedback */}
                    {answerFeedback && (
                        <div style={{
                            display:'flex', alignItems:'flex-start', gap:'0.55rem',
                            padding:'0.7rem 1rem', borderRadius:'0.6rem',
                            border:`2px solid ${answerFeedback.isCorrect ? 'var(--border)' : 'var(--border)'}`,
                            background: answerFeedback.isCorrect ? 'var(--primary-glow)' : 'var(--surface-soft)',
                            color: answerFeedback.isCorrect ? 'var(--text-main)' : 'var(--text-main)',
                        }}>
                            {answerFeedback.isCorrect
                                ? <CheckCircle2 size={17} style={{ flexShrink:0, marginTop:'0.1rem', color:'var(--primary)' }} />
                                : <AlertTriangle size={17} style={{ flexShrink:0, marginTop:'0.1rem', color:'var(--text-muted)' }} />
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
                <div style={{ ...panel, display:'flex', flexDirection:'column', gap:'0.9rem' }}>
                    <h2 style={{ fontSize:'1rem', fontWeight:700, color:'var(--text-main)' }}>Query Results</h2>

                    {/* Error */}
                    {queryError && (
                        <div style={{ background:'var(--surface-soft)', border:'2px solid var(--border)', borderRadius:'0.6rem', padding:'0.7rem 0.9rem' }}>
                            <div style={{ display:'flex', gap:'0.45rem', alignItems:'center', marginBottom:'0.3rem' }}>
                                <AlertTriangle size={14} color="var(--text-muted)" />
                                <span style={{ fontSize:'0.8rem', fontWeight:700, color:'var(--text-main)' }}>SQL Error</span>
                            </div>
                            <p style={{ fontSize:'0.78rem', fontFamily:'monospace', color:'var(--text-muted)', wordBreak:'break-word', lineHeight:1.5 }}>{queryError}</p>
                        </div>
                    )}

                    {/* Results */}
                    {queryResult && !queryError && (
                        queryResult.values && queryResult.values.length > 0 ? (
                            <div style={{ flex:1, display:'flex', flexDirection:'column', gap:'0.55rem' }}>
                                <div style={{ overflowX:'auto', overflowY:'auto', borderRadius:'0.55rem', border:'1px solid var(--border)', maxHeight:'400px' }}>
                                    <table style={{ ...tbl, fontSize:'0.78rem' }}>
                                        <thead style={{ position:'sticky', top:0 }}>
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

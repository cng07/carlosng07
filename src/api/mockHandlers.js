/**
 * Mock API Handlers
 * Simulates real HTTP endpoints entirely in the browser.
 * Each handler returns { status, body } after an optional delay.
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Shared in-memory user store (resets on page reload)
let mockUsers = [
    { id: 1, name: 'Carlos', email: 'carlos@example.com', role: 'Admin' },
    { id: 2, name: 'Test User', email: 'testuser@example.com', role: 'QA Engineer' },
];
let nextUserId = 3;

// Shared in-memory products
const mockProducts = [
    { id: 1, name: 'QA Pro Subscription', price: 29.99, category: 'Software', stock: 100 },
    { id: 2, name: 'Bug Tracker License', price: 49.99, category: 'Software', stock: 45 },
    { id: 3, name: 'Test Case Manager', price: 19.99, category: 'Software', stock: 200 },
    { id: 4, name: 'Automation Framework', price: 99.99, category: 'Tools', stock: 12 },
];

/**
 * POST /api/login
 * { email: string, password: string }
 * → 200 { token, user } | 401 { error }
 */
async function handleLogin(options) {
    await delay(400);
    let body;
    try {
        body = JSON.parse(options.body || '{}');
    } catch {
        return { status: 400, body: { error: 'Invalid JSON body' } };
    }

    const { email, password } = body;

    if (!email || !password) {
        return { status: 400, body: { error: 'email and password are required' } };
    }

    // Accept any @example.com email with password "password123"
    if (email.endsWith('@example.com') && password === 'password123') {
        return {
            status: 200,
            body: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake-jwt-payload.signature',
                user: { id: 1, email, name: 'Carlos', role: 'Admin' },
            },
        };
    }

    return { status: 401, body: { error: 'Invalid credentials' } };
}

/**
 * GET /api/users
 * → 200 { users: [...] }
 */
async function handleGetUsers() {
    await delay(250);
    return { status: 200, body: { users: mockUsers } };
}

/**
 * POST /api/users
 * { name: string, email: string, role?: string }
 * → 201 { user } | 400 { error }
 */
async function handleCreateUser(options) {
    await delay(350);
    let body;
    try {
        body = JSON.parse(options.body || '{}');
    } catch {
        return { status: 400, body: { error: 'Invalid JSON body' } };
    }

    const { name, email, role } = body;

    if (!name || !email) {
        return { status: 400, body: { error: 'name and email are required' } };
    }

    const newUser = { id: nextUserId++, name, email, role: role || 'User' };
    mockUsers.push(newUser);

    return { status: 201, body: { user: newUser, message: 'User created successfully' } };
}

/**
 * GET /api/products
 * → 200 { products: [...] } after a random 500–1500ms delay
 */
async function handleGetProducts() {
    const randomDelay = 500 + Math.floor(Math.random() * 1000);
    await delay(randomDelay);
    return {
        status: 200,
        body: {
            products: mockProducts,
            meta: { count: mockProducts.length, delayMs: randomDelay },
        },
    };
}

/**
 * GET /api/broken
 * Randomly returns one of:
 *   - 500 { error }
 *   - 200 with missing fields
 *   - 200 with invalid/malformed structure
 */
async function handleBroken(flakyEnabled) {
    await delay(300 + Math.floor(Math.random() * 400));

    const roll = Math.random();

    // When flaky toggle is on: 70% chance of error; otherwise 40%
    const errorThreshold = flakyEnabled ? 0.7 : 0.4;

    if (roll < errorThreshold) {
        return { status: 500, body: { error: 'Internal Server Error', code: 'ERR_INTERNAL' } };
    }

    if (roll < errorThreshold + 0.2) {
        // Missing fields — incomplete response
        return { status: 200, body: { data: null } }; // `items` missing
    }

    // Malformed structure
    return {
        status: 200,
        body: [
            'unexpected_string',
            { broken: true, items: null },
            42,
        ],
    };
}

/**
 * Main dispatcher — routes a URL + options to the correct handler.
 * Returns { status: number, body: object, responseTime: number }
 */
export async function mockFetch(url, options = {}, flakyEnabled = false) {
    const method = (options.method || 'GET').toUpperCase();
    const start = performance.now();

    let result;

    if (url === '/api/login' && method === 'POST') {
        result = await handleLogin(options);
    } else if (url === '/api/users' && method === 'GET') {
        result = await handleGetUsers();
    } else if (url === '/api/users' && method === 'POST') {
        result = await handleCreateUser(options);
    } else if (url === '/api/products' && method === 'GET') {
        result = await handleGetProducts();
    } else if (url === '/api/broken' && method === 'GET') {
        result = await handleBroken(flakyEnabled);
    } else {
        result = {
            status: 404,
            body: { error: `No mock endpoint found for ${method} ${url}` },
        };
    }

    const responseTime = Math.round(performance.now() - start);
    return { ...result, responseTime };
}

export const MOCK_ENDPOINTS = [
    { method: 'POST', url: '/api/login', description: 'Authenticate a user' },
    { method: 'GET', url: '/api/users', description: 'List all users' },
    { method: 'POST', url: '/api/users', description: 'Create a new user' },
    { method: 'GET', url: '/api/products', description: 'List products (with delay)' },
    { method: 'GET', url: '/api/broken', description: 'Intentionally flaky endpoint' },
];

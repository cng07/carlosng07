import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const decodeJwtPayload = (token) => {
    const parts = token.split('.');
    if (parts.length < 2) {
        return null;
    }

    try {
        const normalized = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
        return JSON.parse(window.atob(padded));
    } catch {
        return null;
    }
};

const getSupabaseConfigError = () => {
    if (!supabaseUrl || !supabaseAnonKey) {
        return 'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.';
    }

    const payload = decodeJwtPayload(supabaseAnonKey);

    if (payload?.role && payload.role !== 'anon') {
        return `Refusing to initialize Supabase in the browser with a non-anon role (${payload.role}).`;
    }

    return null;
};

export const supabaseConfigError = getSupabaseConfigError();

export const supabase = !supabaseConfigError
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false
        }
    })
    : null;

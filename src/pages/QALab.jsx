import React from 'react';
import { motion } from 'framer-motion';
import {
    AlertTriangle,
    Bug,
    CheckCircle2,
    Database,
    Eye,
    Pencil,
    Play,
    RefreshCw,
    RotateCcw,
    Search,
    Server,
    TimerReset,
    Trash2,
    Upload,
    XCircle
} from 'lucide-react';
import { supabase, supabaseConfigError } from '../lib/supabaseClient';
import SQLPracticeTool from '../components/SQLPracticeTool';
import ApiPlayground from '../components/ApiPlayground';

const initialFormState = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    country: '',
    email: '',
    password: '',
    gender: { male: false, female: false, other: false },
    agreeTerms: false
};

const issueFixtures = [
    { id: 'BUG-301', title: 'Gender field accepts multiple selections', severity: 'High', area: 'Form', status: 'Open' },
    { id: 'BUG-302', title: 'Missing asterisk on required email field', severity: 'Low', area: 'UI', status: 'Open' },
    { id: 'BUG-303', title: 'Phone validation allows special characters', severity: 'Medium', area: 'Validation', status: 'In Progress' },
    { id: 'BUG-304', title: 'Form submission succeeds when country is empty', severity: 'Critical', area: 'Form', status: 'Open' },
    { id: 'BUG-305', title: 'Error messages persist after fixing input', severity: 'Medium', area: 'UX', status: 'Resolved' },
    { id: 'BUG-306', title: 'Password field shows minimum length requirement', severity: 'Low', area: 'Form', status: 'In Review' },
    { id: 'BUG-307', title: 'Checkbox alignment misaligned with label', severity: 'Low', area: 'UI', status: 'Open' },
    { id: 'BUG-308', title: 'Form does not clear after successful submission', severity: 'Medium', area: 'UX', status: 'Open' },
    { id: 'BUG-309', title: 'Registration date not recorded in database', severity: 'High', area: 'Backend', status: 'In Progress' },
    { id: 'BUG-310', title: 'First name field missing required indicator', severity: 'Low', area: 'Form', status: 'Open' },
    { id: 'BUG-311', title: 'Phone number field blocks 10-digit entry', severity: 'Critical', area: 'Validation', status: 'Open' },
    { id: 'BUG-312', title: 'Last name placeholder references first name', severity: 'Low', area: 'UI', status: 'Open' },
    { id: 'BUG-313', title: 'Gender marked required but allows empty submission', severity: 'Medium', area: 'Form', status: 'Open' },
    { id: 'BUG-314', title: 'Password input reveals typed characters', severity: 'High', area: 'Security', status: 'In Progress' },
    { id: 'BUG-315', title: 'Country dropdown contains duplicate option', severity: 'Low', area: 'UI', status: 'In Review' }
];

const menuSections = [
    { id: 'spot-bugs', label: 'Spot the Bugs Challenge', icon: '🐛' },
    { id: 'api-testing', label: 'API Testing', icon: '🔌' },
    { id: 'sql-practice', label: 'SQL Practice', icon: '🔍' },
    { id: 'pagination', label: 'Pagination', icon: '📄' },
    { id: 'dropdowns', label: 'Dropdowns', icon: '▼' },
    { id: 'buttons', label: 'Buttons', icon: '🔘' },
    { id: 'alerts', label: 'Alerts', icon: '⚠️' },
    { id: 'file-upload', label: 'File Upload', icon: '📁' },
    { id: 'iframe', label: 'IFrames', icon: '📦' },
    { id: 'tables', label: 'Tables', icon: '📊' },
    { id: 'date-picker', label: 'Date Pickers', icon: '📅' },
    { id: 'visual', label: 'Visual Testing', icon: '👁️' },
];

const apiScenarios = [
    { status: 200, message: 'Request accepted. Success!' },
    { status: 201, message: 'Resource created successfully.' },
    { status: 400, message: 'Validation error. Payload is malformed.' },
    { status: 429, message: 'Rate limited. Retry in 3 seconds.' },
    { status: 500, message: 'Internal server error from test environment.' }
];

const initialUserFormState = {
    firstName: '',
    lastName: '',
    email: '',
    nationality: '',
    role: ''
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const wait = (ms) => new Promise((resolve) => {
    window.setTimeout(resolve, ms);
});

const showApiTesting = false;
const supabaseUnavailableMessage = supabaseConfigError
    || 'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.';

const QALab = () => {
    const [activeSection, setActiveSection] = React.useState('spot-bugs');
    const [formData, setFormData] = React.useState(initialFormState);
    const [formErrors, setFormErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitResult, setSubmitResult] = React.useState(null);
    const [apiLoading, setApiLoading] = React.useState(false);
    const [apiResult, setApiResult] = React.useState(null);
    const [flakyAttempts, setFlakyAttempts] = React.useState(0);
    const [flakyState, setFlakyState] = React.useState('Waiting for click');
    const [tokenSeconds, setTokenSeconds] = React.useState(45);
    const [searchText, setSearchText] = React.useState('');
    const [severityFilter, setSeverityFilter] = React.useState('All');
    const [uploadedFile, setUploadedFile] = React.useState(null);
    const [uploadMessage, setUploadMessage] = React.useState('');
    const [alertMessage, setAlertMessage] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState('');
    const [selectedCountry, setSelectedCountry] = React.useState('');
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [apiTestUrl, setApiTestUrl] = React.useState('https://jsonplaceholder.typicode.com/posts/1');
    const [apiTestMethod, setApiTestMethod] = React.useState('GET');
    const [apiTestHeaders, setApiTestHeaders] = React.useState('');
    const [apiTestBody, setApiTestBody] = React.useState('');
    const [apiTestResponse, setApiTestResponse] = React.useState(null);
    const [apiTestLoading, setApiTestLoading] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [userForm, setUserForm] = React.useState(initialUserFormState);
    const [editingUserId, setEditingUserId] = React.useState(null);
    const [crudLoading, setCrudLoading] = React.useState(false);
    const [crudSuccessMessage, setCrudSuccessMessage] = React.useState('');
    const [crudErrorMessage, setCrudErrorMessage] = React.useState('');
    const [isJsonPreviewOpen, setIsJsonPreviewOpen] = React.useState(true);
    const [showIssueExplorer, setShowIssueExplorer] = React.useState(false);
    const [settings, setSettings] = React.useState({
        delayedValidation: false,
        slowResponse: false,
        randomServerErrors: false
    });
    const itemsPerPage = 5;

    React.useEffect(() => {
        if (tokenSeconds <= 0) return undefined;
        const intervalId = window.setInterval(() => {
            setTokenSeconds((current) => Math.max(0, current - 1));
        }, 1000);
        return () => window.clearInterval(intervalId);
    }, [tokenSeconds]);

    const clearCrudMessages = () => {
        setCrudSuccessMessage('');
        setCrudErrorMessage('');
    };

    const resetCrudForm = () => {
        setUserForm(initialUserFormState);
        setEditingUserId(null);
    };

    const validateCrudForm = () => {
        const trimmedFirstName = userForm.firstName.trim();
        const trimmedLastName = userForm.lastName.trim();
        const trimmedEmail = userForm.email.trim();
        const trimmedNationality = userForm.nationality.trim();
        const trimmedRole = userForm.role.trim();

        if (!trimmedFirstName || !trimmedLastName) {
            setCrudErrorMessage('First name and last name are required.');
            return null;
        }

        if (!trimmedEmail) {
            setCrudErrorMessage('Email is required.');
            return null;
        }

        if (!emailPattern.test(trimmedEmail)) {
            setCrudErrorMessage('Please enter a valid email address.');
            return null;
        }

        return {
            firstName: trimmedFirstName,
            lastName: trimmedLastName,
            email: trimmedEmail,
            nationality: trimmedNationality,
            role: trimmedRole
        };
    };

    const fetchUsers = React.useCallback(async ({ preserveMessages = false } = {}) => {
        if (!supabase) {
            setCrudErrorMessage(supabaseUnavailableMessage);
            return false;
        }

        if (!preserveMessages) {
            clearCrudMessages();
        }

        setCrudLoading(true);
        console.log('SELECT users');

        const { data, error } = await supabase
            .from('users')
            .select('id, first_name, last_name, email, created_at, nationality, role')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('SELECT users error:', error);
            setCrudErrorMessage(error.message);
            setCrudLoading(false);
            return false;
        }

        setUsers(data ?? []);
        setCrudLoading(false);
        return true;
    }, []);

    React.useEffect(() => {
        void fetchUsers();
    }, [fetchUsers]);

    const validateForm = (data) => {
        const errors = {};
        if (!data.firstName || data.firstName.trim().length === 0) {
            errors.firstName = 'First name is required.';
        }
        if (!data.lastName || data.lastName.trim().length === 0) {
            errors.lastName = 'Last name is required.';
        }
        if (!data.phoneNumber || data.phoneNumber.trim().length === 0) {
            errors.phoneNumber = 'Phone number is required.';
        } else if (!/^\d{10,}$/.test(data.phoneNumber.replace(/\D/g, ''))) {
            errors.phoneNumber = 'Phone length validation: at least 10 digits';
        }
        if (!data.country) {
            errors.country = 'Country is required.';
        }
        if (!data.email || data.email.trim().length === 0) {
            errors.email = 'Email address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = 'Please enter a valid email address.';
        }
        if (!data.password || data.password.trim().length === 0) {
            errors.password = 'Password is required.';
        } else if (data.password.length < 8 || data.password.length > 24) {
            errors.password = 'Password length validation: [8-24] characters';
        }
        if (!data.agreeTerms) {
            errors.agreeTerms = 'You must agree to the terms and conditions.';
        }
        return errors;
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        
        if (name === 'gender') {
            setFormData((current) => ({
                ...current,
                gender: {
                    ...current.gender,
                    [value]: checked
                }
            }));
        } else {
            setFormData((current) => ({
                ...current,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
        setSubmitResult(null);
    };

    const handleSettingChange = (event) => {
        const { name, checked } = event.target;
        setSettings((current) => ({
            ...current,
            [name]: checked
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitResult(null);

        if (settings.delayedValidation) {
            await wait(700);
        }

        const nextErrors = validateForm(formData);
        setFormErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);
        await wait(settings.slowResponse ? 1900 : 900);

        const shouldFail = settings.randomServerErrors && Math.random() < 0.35;
        if (shouldFail) {
            setSubmitResult({
                type: 'error',
                message: 'Simulated API failure (500). Try submitting again.'
            });
        } else {
            setSubmitResult({
                type: 'success',
                message: 'Registration successful! Welcome aboard.'
            });
        }

        setIsSubmitting(false);
    };

    const handleApiSimulation = async () => {
        setApiLoading(true);
        setApiResult(null);
        await wait(650 + Math.floor(Math.random() * 600));

        const scenario = apiScenarios[Math.floor(Math.random() * apiScenarios.length)];
        setApiResult({
            ...scenario,
            at: new Date().toLocaleTimeString()
        });
        setApiLoading(false);
    };

    const handleFlakyButton = () => {
        const nextAttempt = flakyAttempts + 1;
        setFlakyAttempts(nextAttempt);
        if (nextAttempt % 3 === 0) {
            setFlakyState(`Pass on attempt ${nextAttempt}`);
            return;
        }
        setFlakyState(`Fail on attempt ${nextAttempt}`);
    };

    const handleApiTest = async () => {
        if (!apiTestUrl.trim()) {
            setApiTestResponse({
                status: null,
                statusText: 'Error',
                headers: {},
                body: 'Please enter a valid URL',
                error: true,
                timestamp: new Date().toLocaleTimeString()
            });
            return;
        }

        setApiTestLoading(true);
        setApiTestResponse(null);

        try {
            const options = {
                method: apiTestMethod,
                headers: {}
            };

            // Parse custom headers
            if (apiTestHeaders.trim()) {
                try {
                    const headerLines = apiTestHeaders.split('\n').filter(line => line.trim());
                    headerLines.forEach(line => {
                        const [key, value] = line.split(':').map(s => s.trim());
                        if (key && value) {
                            options.headers[key] = value;
                        }
                    });
                } catch (e) {
                    setApiTestResponse({
                        status: null,
                        statusText: 'Error',
                        headers: {},
                        body: 'Invalid header format. Use key: value format per line.',
                        error: true,
                        timestamp: new Date().toLocaleTimeString()
                    });
                    setApiTestLoading(false);
                    return;
                }
            }

            // Add body if applicable
            if (['POST', 'PUT', 'PATCH'].includes(apiTestMethod) && apiTestBody.trim()) {
                options.body = apiTestBody;
                if (!options.headers['Content-Type']) {
                    options.headers['Content-Type'] = 'application/json';
                }
            }

            const response = await fetch(apiTestUrl, options);
            const responseBody = await response.text();
            
            // Try to parse JSON if possible
            let displayBody = responseBody;
            try {
                const jsonBody = JSON.parse(responseBody);
                displayBody = JSON.stringify(jsonBody, null, 2);
            } catch (e) {
                // Keep as plain text
            }

            const responseHeaders = {};
            response.headers.forEach((value, key) => {
                responseHeaders[key] = value;
            });

            setApiTestResponse({
                status: response.status,
                statusText: response.statusText,
                headers: responseHeaders,
                body: displayBody,
                error: false,
                timestamp: new Date().toLocaleTimeString()
            });
        } catch (error) {
            setApiTestResponse({
                status: null,
                statusText: 'Network Error',
                headers: {},
                body: error.message || 'Failed to make the request. Check CORS and URL validity.',
                error: true,
                timestamp: new Date().toLocaleTimeString()
            });
        }

        setApiTestLoading(false);
    };

    const handleCrudSubmit = async (event) => {
        event.preventDefault();

        if (!supabase) {
            setCrudErrorMessage(supabaseUnavailableMessage);
            return;
        }

        clearCrudMessages();
        const payload = validateCrudForm();

        if (!payload) {
            return;
        }

        // Split name into first_name and last_name
        const first_name = payload.firstName;
        const last_name = payload.lastName;

        const dbPayload = {
            first_name,
            last_name,
            email: payload.email,
            nationality: payload.nationality,
            role: payload.role
        };

        setCrudLoading(true);

        if (editingUserId) {
            console.log('UPDATE user:', { id: editingUserId, ...dbPayload });
            const { error } = await supabase
                .from('users')
                .update(dbPayload)
                .eq('id', editingUserId);

            if (error) {
                console.error('UPDATE user error:', error);
                setCrudErrorMessage(error.message);
                setCrudLoading(false);
                return;
            }

            const refreshed = await fetchUsers({ preserveMessages: true });
            if (!refreshed) {
                return;
            }

            resetCrudForm();
            setCrudSuccessMessage('User updated successfully.');
            return;
        }

        console.log('INSERT user:', dbPayload);
        const { error } = await supabase.from('users').insert(dbPayload);

        if (error) {
            console.error('INSERT user error:', error);
            setCrudErrorMessage(error.message);
            setCrudLoading(false);
            return;
        }

        const refreshed = await fetchUsers({ preserveMessages: true });
        if (!refreshed) {
            return;
        }

        resetCrudForm();
        setCrudSuccessMessage('User added successfully.');
    };

    const handleEditUser = (user) => {
        clearCrudMessages();
        setEditingUserId(user.id);
        setUserForm({
            firstName: user.first_name ?? '',
            lastName: user.last_name ?? '',
            email: user.email ?? '',
            nationality: user.nationality ?? '',
            role: user.role ?? ''
        });
        setActiveSection('data-playground');
    };

    const handleDeleteUser = async (userId) => {
        if (!supabase) {
            setCrudErrorMessage(supabaseUnavailableMessage);
            return;
        }

        clearCrudMessages();
        setCrudLoading(true);
        console.log('DELETE user:', { id: userId });

        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', userId);

        if (error) {
            console.error('DELETE user error:', error);
            setCrudErrorMessage(error.message);
            setCrudLoading(false);
            return;
        }

        const refreshed = await fetchUsers({ preserveMessages: true });
        if (!refreshed) {
            return;
        }

        if (editingUserId === userId) {
            resetCrudForm();
        }

        setCrudSuccessMessage('User deleted successfully.');
    };

    const handleRefreshUsers = async () => {
        clearCrudMessages();
        const refreshed = await fetchUsers({ preserveMessages: true });

        if (refreshed) {
            setCrudSuccessMessage('Data refreshed successfully.');
        }
    };

    const handleReset = () => {
        setFormData(initialFormState);
        setFormErrors({});
        setSubmitResult(null);
        setApiResult(null);
        setApiLoading(false);
        setFlakyAttempts(0);
        setFlakyState('Waiting for click');
        setTokenSeconds(45);
        setSearchText('');
        setSeverityFilter('All');
        setCurrentPage(1);
    };

    const filteredIssues = issueFixtures.filter((issue) => {
        const bySeverity = severityFilter === 'All' || issue.severity === severityFilter;
        const query = searchText.trim().toLowerCase();
        const byQuery = !query
            || issue.id.toLowerCase().includes(query)
            || issue.title.toLowerCase().includes(query)
            || issue.area.toLowerCase().includes(query)
            || issue.status.toLowerCase().includes(query);
        return bySeverity && byQuery;
    });

    // Reset to page 1 when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchText, severityFilter]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredIssues.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedIssues = filteredIssues.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="section container page-header-padding" style={{ minHeight: '100vh' }}>
            <div className="qa-mobile-only">
                <motion.div
                    className="glass qa-mobile-notice"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <AlertTriangle size={28} color="var(--primary)" />
                    <h1>QA Lab Is Desktop Only</h1>
                    <p>
                        This page is optimized for desktop interaction. Please open QA Lab on a laptop or desktop
                        screen to use the bug challenge and testing exercises.
                    </p>
                </motion.div>
            </div>

            <div className="qa-layout" style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(280px, 0.25fr) 1fr',
                gap: '2rem',
                minHeight: '600px',
                alignItems: 'start'
            }}>
                {/* Sidebar Navigation */}
                <motion.aside
                    className="qa-sidebar qa-desktop-only glass"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        padding: '2rem 1.5rem',
                        overflowY: 'auto',
                        borderRight: '1px solid var(--border)',
                        height: 'fit-content'
                    }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 600, 
                    marginBottom: '2rem',
                    color: 'var(--text-primary)'
                }}>
                    QA Lab
                </h2>

                <nav className="qa-nav" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <button
                        onClick={() => setActiveSection('spot-bugs')}
                        style={{
                            padding: '0.75rem 1rem',
                            textAlign: 'left',
                            border: 'none',
                            background: activeSection === 'spot-bugs' ? 'var(--qa-nav-active-bg)' : 'transparent',
                            color: activeSection === 'spot-bugs' ? 'var(--primary)' : 'var(--text-secondary)',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontWeight: activeSection === 'spot-bugs' ? 600 : 400,
                            transition: 'all 0.2s ease',
                            fontSize: '1rem'
                        }}
                        className="qa-nav-item"
                    >
                        <Bug size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                        Spot the Bugs Challenge
                    </button>

                    <button
                        onClick={() => setActiveSection('data-playground')}
                        style={{
                            padding: '0.75rem 1rem',
                            textAlign: 'left',
                            border: 'none',
                            background: activeSection === 'data-playground' ? 'var(--qa-nav-active-bg)' : 'transparent',
                            color: activeSection === 'data-playground' ? 'var(--primary)' : 'var(--text-secondary)',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontWeight: activeSection === 'data-playground' ? 600 : 400,
                            transition: 'all 0.2s ease',
                            fontSize: '1rem'
                        }}
                        className="qa-nav-item"
                    >
                        <Database size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                        Data Playground
                    </button>

                    <button
                        onClick={() => setActiveSection('api-playground')}
                        style={{
                            padding: '0.75rem 1rem',
                            textAlign: 'left',
                            border: 'none',
                            background: activeSection === 'api-playground' ? 'var(--qa-nav-active-bg)' : 'transparent',
                            color: activeSection === 'api-playground' ? 'var(--primary)' : 'var(--text-secondary)',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontWeight: activeSection === 'api-playground' ? 600 : 400,
                            transition: 'all 0.2s ease',
                            fontSize: '1rem'
                        }}
                        className="qa-nav-item"
                    >
                        <Server size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                        API Playground
                    </button>

                    {showApiTesting && (
                        <button
                            onClick={() => setActiveSection('api-testing')}
                            style={{
                                padding: '0.75rem 1rem',
                                textAlign: 'left',
                                border: 'none',
                                background: activeSection === 'api-testing' ? 'var(--qa-nav-active-bg)' : 'transparent',
                                color: activeSection === 'api-testing' ? 'var(--primary)' : 'var(--text-secondary)',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontWeight: activeSection === 'api-testing' ? 600 : 400,
                                transition: 'all 0.2s ease',
                                fontSize: '1rem'
                            }}
                            className="qa-nav-item"
                        >
                            <Server size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                            API Testing
                        </button>
                    )}

                    <button
                        onClick={() => setActiveSection('sql-practice')}
                        style={{
                            padding: '0.75rem 1rem',
                            textAlign: 'left',
                            border: 'none',
                            background: activeSection === 'sql-practice' ? 'var(--qa-nav-active-bg)' : 'transparent',
                            color: activeSection === 'sql-practice' ? 'var(--primary)' : 'var(--text-secondary)',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontWeight: activeSection === 'sql-practice' ? 600 : 400,
                            transition: 'all 0.2s ease',
                            fontSize: '1rem'
                        }}
                        className="qa-nav-item"
                    >
                        <Database size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                        SQL Practice
                    </button>
                </nav>
            </motion.aside>

            {/* Main Content Area */}
            <div className="qa-main qa-desktop-only">
                {/* Spot the Bugs Challenge Section */}
                {activeSection === 'spot-bugs' && (
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                    >
                        <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>
                            <Bug size={30} color="var(--primary)" style={{ display: 'inline', marginRight: '0.75rem', verticalAlign: 'middle' }} />
                            Spot the Bugs Challenge
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '820px', marginBottom: '2rem' }}>
                            Practice your QA skills by reporting bugs through a form and exploring a database of issues. 
                            Learn validation patterns, form handling, and bug reporting best practices.
                        </p>

                        <div className="qa-lab-stack">
                            {/* Bug Form */}
                            <motion.section
                                className="glass qa-card"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.45 }}
                            >
                                <h2 className="qa-card-title">
                                    <Bug size={20} color="var(--primary)" />
                                    CHALLENGE - Spot the BUGS!
                                </h2>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                    This page contains at least 15 bugs. How many of them can you spot?
                                </p>

                                <form className="qa-stack" data-testid="qa-bug-form" onSubmit={handleSubmit} noValidate>
                                    <label className="qa-field" htmlFor="firstName">
                                        <span className="qa-label">First Name</span>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            className="qa-input"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="Enter first name"
                                            data-testid="qa-input-first-name"
                                        />
                                        {formErrors.firstName && <span className="qa-error">{formErrors.firstName}</span>}
                                    </label>

                                    <label className="qa-field" htmlFor="lastName">
                                        <span className="qa-label">Last Name*</span>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            className="qa-input"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Enter first name"
                                            data-testid="qa-input-last-name"
                                        />
                                        {formErrors.lastName && <span className="qa-error">{formErrors.lastName}</span>}
                                    </label>

                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                        Note: All the fields marked with * are mandatory
                                    </div>

                                    <label className="qa-field" htmlFor="phoneNumber">
                                        <span className="qa-label">Phone number*</span>
                                        <input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            className="qa-input"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            maxLength={8}
                                            placeholder="Enter phone number"
                                            data-testid="qa-input-phone"
                                        />
                                        {formErrors.phoneNumber && <span className="qa-error">{formErrors.phoneNumber}</span>}
                                        {!formErrors.phoneNumber && (
                                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
                                                Phone length validation: at least 10 digits
                                            </span>
                                        )}
                                    </label>

                                    <label className="qa-field" htmlFor="country">
                                        <span className="qa-label">Country</span>
                                        <select
                                            id="country"
                                            name="country"
                                            className="qa-select"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            data-testid="qa-select-country"
                                        >
                                            <option value="">Select a country...</option>
                                            <option value="United States">United States</option>
                                            <option value="Canada">Canada</option>
                                            <option value="Canada">Canada</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="Australia">Australia</option>
                                            <option value="Germany">Germany</option>
                                            <option value="France">France</option>
                                            <option value="India">India</option>
                                            <option value="Japan">Japan</option>
                                        </select>
                                        {formErrors.country && <span className="qa-error">{formErrors.country}</span>}
                                    </label>

                                    <div className="qa-field">
                                        <span className="qa-label">Gender*</span>
                                        <div className="qa-checkbox-row" style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                                            <label className="qa-inline-check">
                                                <input
                                                    type="checkbox"
                                                    name="gender"
                                                    value="male"
                                                    checked={formData.gender.male}
                                                    onChange={handleInputChange}
                                                    data-testid="qa-checkbox-gender-male"
                                                />
                                                <span>Male</span>
                                            </label>
                                            <label className="qa-inline-check">
                                                <input
                                                    type="checkbox"
                                                    name="gender"
                                                    value="female"
                                                    checked={formData.gender.female}
                                                    onChange={handleInputChange}
                                                    data-testid="qa-checkbox-gender-female"
                                                />
                                                <span>Female</span>
                                            </label>
                                            <label className="qa-inline-check">
                                                <input
                                                    type="checkbox"
                                                    name="gender"
                                                    value="other"
                                                    checked={formData.gender.other}
                                                    onChange={handleInputChange}
                                                    data-testid="qa-checkbox-gender-other"
                                                />
                                                <span>Other</span>
                                            </label>
                                        </div>
                                        {formErrors.gender && <span className="qa-error">{formErrors.gender}</span>}
                                    </div>

                                    <label className="qa-field" htmlFor="email">
                                        <span className="qa-label">Email address*</span>
                                        <input
                                            id="email"
                                            name="email"
                                            className="qa-input"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter email"
                                            data-testid="qa-input-email"
                                        />
                                        {formErrors.email && <span className="qa-error">{formErrors.email}</span>}
                                    </label>

                                    <label className="qa-field" htmlFor="password">
                                        <span className="qa-label">Password*</span>
                                        <input
                                            id="password"
                                            name="password"
                                            className="qa-input"
                                            type="text"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="Password"
                                            data-testid="qa-input-password"
                                        />
                                        {formErrors.password && <span className="qa-error">{formErrors.password}</span>}
                                        {!formErrors.password && (
                                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
                                                Password length: 8-24 characters
                                            </span>
                                        )}
                                    </label>

                                    <label className="qa-inline-check" htmlFor="agreeTerms">
                                        <input
                                            id="agreeTerms"
                                            type="checkbox"
                                            name="agreeTerms"
                                            checked={formData.agreeTerms}
                                            onChange={handleInputChange}
                                            data-testid="qa-checkbox-agree"
                                        />
                                        <span>I agree with the terms and conditions</span>
                                    </label>
                                    {formErrors.agreeTerms && <span className="qa-error">{formErrors.agreeTerms}</span>}

                                    <button
                                        type="submit"
                                        className="qa-btn qa-btn-primary"
                                        disabled={isSubmitting}
                                        data-testid="qa-submit-form"
                                        style={{ alignSelf: 'flex-start', marginTop: '1rem' }}
                                    >
                                        {isSubmitting ? 'Registering...' : 'Register'}
                                    </button>
                                </form>

                                {submitResult && (
                                    <div className={`qa-status ${submitResult.type === 'success' ? 'qa-status-success' : 'qa-status-error'}`} data-testid="qa-submit-status">
                                        {submitResult.type === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                        <span>{submitResult.message}</span>
                                    </div>
                                )}
                            </motion.section>

                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                <button
                                    type="button"
                                    className="qa-btn qa-btn-ghost"
                                    onClick={() => setShowIssueExplorer((current) => !current)}
                                >
                                    <Search size={16} />
                                    {showIssueExplorer ? 'Hide' : 'Show'} Issue Explorer
                                </button>
                            </div>

                            {/* Issue Explorer */}
                            {showIssueExplorer && (
                            <motion.section
                                className="glass qa-card"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.45, delay: 0.05 }}
                            >
                                <h2 className="qa-card-title">
                                    <Search size={20} color="var(--primary)" />
                                    Issue Explorer
                                </h2>

                                <div className="qa-toolbar">
                                    <label className="qa-field" htmlFor="searchText">
                                        <span className="qa-label">Search Issues</span>
                                        <input
                                            id="searchText"
                                            name="searchText"
                                            className="qa-input"
                                            value={searchText}
                                            onChange={(event) => setSearchText(event.target.value)}
                                            placeholder="Search by ID, title, area, status"
                                            data-testid="qa-search-issues"
                                        />
                                    </label>
                                    <label className="qa-field" htmlFor="severityFilter">
                                        <span className="qa-label">Severity</span>
                                        <select
                                            id="severityFilter"
                                            className="qa-select"
                                            value={severityFilter}
                                            onChange={(event) => setSeverityFilter(event.target.value)}
                                            data-testid="qa-filter-severity"
                                        >
                                            <option value="All">All</option>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                            <option value="Critical">Critical</option>
                                        </select>
                                    </label>
                                </div>

                                <div className="qa-table-wrap">
                                    <table className="qa-table qa-table-issues" data-testid="qa-issues-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Title</th>
                                                <th>Severity</th>
                                                <th>Area</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedIssues.map((issue) => (
                                                <tr key={issue.id}>
                                                    <td>{issue.id}</td>
                                                    <td>{issue.title}</td>
                                                    <td>
                                                        <span className={`qa-pill qa-pill-${issue.severity.toLowerCase()}`}>{issue.severity}</span>
                                                    </td>
                                                    <td>{issue.area}</td>
                                                    <td>{issue.status}</td>
                                                </tr>
                                            ))}
                                            {paginatedIssues.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                                        No issues match the current filters.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        alignItems: 'center', 
                                        gap: '0.5rem',
                                        marginTop: '1.5rem',
                                        flexWrap: 'wrap'
                                    }}>
                                        <button
                                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                border: '1px solid var(--border)',
                                                background: currentPage === 1 ? 'var(--qa-pagination-disabled-bg)' : 'transparent',
                                                color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                                                borderRadius: '0.375rem',
                                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                                fontSize: '0.875rem',
                                                fontWeight: 500,
                                                transition: 'all 0.2s ease'
                                            }}
                                            className="qa-pagination-btn"
                                        >
                                            Previous
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                style={{
                                                    minWidth: '2.5rem',
                                                    padding: '0.5rem 0.75rem',
                                                    border: currentPage === page ? '1px solid var(--primary)' : '1px solid var(--border)',
                                                    background: currentPage === page ? 'var(--primary)' : 'transparent',
                                                    color: currentPage === page ? 'white' : 'var(--text-primary)',
                                                    borderRadius: '0.375rem',
                                                    cursor: 'pointer',
                                                    fontSize: '0.875rem',
                                                    fontWeight: currentPage === page ? 600 : 500,
                                                    transition: 'all 0.2s ease'
                                                }}
                                                className="qa-pagination-btn qa-pagination-page"
                                                data-testid={`qa-pagination-page-${page}`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                border: '1px solid var(--border)',
                                                background: currentPage === totalPages ? 'var(--qa-pagination-disabled-bg)' : 'transparent',
                                                color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
                                                borderRadius: '0.375rem',
                                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                                fontSize: '0.875rem',
                                                fontWeight: 500,
                                                transition: 'all 0.2s ease'
                                            }}
                                            className="qa-pagination-btn"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </motion.section>
                            )}
                        </div>
                    </motion.div>
                )}

                {activeSection === 'data-playground' && (
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                    >
                        <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>
                            <Database size={30} color="var(--primary)" style={{ display: 'inline', marginRight: '0.75rem', verticalAlign: 'middle' }} />
                            Data Playground
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '820px', marginBottom: '2rem' }}>
                            This section provides a stable Supabase frontend for automation and data testing.
                        </p>

                        <div className="qa-lab-stack">
                            <motion.section
                                className="glass qa-card"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.45 }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                    <div>
                                        <h2 className="qa-card-title" style={{ marginBottom: '0.5rem' }}>
                                            <Database size={20} color="var(--primary)" />
                                            User Data Dashboard
                                        </h2>
                                        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                                            Frontend-only table and form backed directly by Supabase.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="qa-btn qa-btn-ghost"
                                        data-testid="refresh-btn"
                                        onClick={handleRefreshUsers}
                                        disabled={crudLoading}
                                    >
                                        <RefreshCw size={16} />
                                        Refresh Data
                                    </button>
                                </div>

                                {crudLoading && (
                                    <div className="qa-status" data-testid="loading" style={{ marginBottom: '1rem' }}>
                                        <RefreshCw size={16} />
                                        <span>Loading users...</span>
                                    </div>
                                )}

                                {crudSuccessMessage && (
                                    <div className="qa-status qa-status-success" data-testid="success-message" style={{ marginBottom: '1rem' }}>
                                        <CheckCircle2 size={16} />
                                        <span>{crudSuccessMessage}</span>
                                    </div>
                                )}

                                {crudErrorMessage && (
                                    <div className="qa-status qa-status-error" data-testid="error-message" style={{ marginBottom: '1rem' }}>
                                        <XCircle size={16} />
                                        <span>{crudErrorMessage}</span>
                                    </div>
                                )}

                                <div className="qa-crud-layout">
                                    <form className="qa-stack" onSubmit={handleCrudSubmit} noValidate>
                                        <label className="qa-field">
                                            <span className="qa-label">First Name</span>
                                            <input
                                                type="text"
                                                className="qa-input"
                                                data-testid="first-name-input"
                                                value={userForm.firstName}
                                                onChange={(event) => setUserForm((current) => ({ ...current, firstName: event.target.value }))}
                                                disabled={crudLoading}
                                                placeholder="Enter first name"
                                            />
                                        </label>

                                        <label className="qa-field">
                                            <span className="qa-label">Last Name</span>
                                            <input
                                                type="text"
                                                className="qa-input"
                                                data-testid="last-name-input"
                                                value={userForm.lastName}
                                                onChange={(event) => setUserForm((current) => ({ ...current, lastName: event.target.value }))}
                                                disabled={crudLoading}
                                                placeholder="Enter last name"
                                            />
                                        </label>

                                        <label className="qa-field">
                                            <span className="qa-label">Email</span>
                                            <input
                                                type="email"
                                                className="qa-input"
                                                data-testid="email-input"
                                                value={userForm.email}
                                                onChange={(event) => setUserForm((current) => ({ ...current, email: event.target.value }))}
                                                disabled={crudLoading}
                                                placeholder="Enter email address"
                                            />
                                        </label>

                                        <label className="qa-field">
                                            <span className="qa-label">Nationality</span>
                                            <input
                                                type="text"
                                                className="qa-input"
                                                data-testid="nationality-input"
                                                value={userForm.nationality}
                                                onChange={(event) => setUserForm((current) => ({ ...current, nationality: event.target.value }))}
                                                disabled={crudLoading}
                                                placeholder="Enter nationality"
                                            />
                                        </label>

                                        <label className="qa-field">
                                            <span className="qa-label">Role</span>
                                            <input
                                                type="text"
                                                className="qa-input"
                                                data-testid="role-input"
                                                value={userForm.role}
                                                onChange={(event) => setUserForm((current) => ({ ...current, role: event.target.value }))}
                                                disabled={crudLoading}
                                                placeholder="Enter role"
                                            />
                                        </label>

                                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                            <button
                                                type="submit"
                                                className="qa-btn qa-btn-primary"
                                                data-testid={editingUserId ? 'update-user-btn' : 'add-user-btn'}
                                                disabled={crudLoading}
                                            >
                                                {editingUserId ? 'Update User' : 'Add User'}
                                            </button>

                                            {editingUserId && (
                                                <button
                                                    type="button"
                                                    className="qa-btn qa-btn-ghost"
                                                    onClick={resetCrudForm}
                                                    disabled={crudLoading}
                                                >
                                                    Cancel Edit
                                                </button>
                                            )}
                                        </div>
                                    </form>

                                    <div className="qa-table-wrap">
                                        <table className="qa-table qa-table-users">
                                            <thead>
                                                <tr>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Email</th>
                                                    <th>Nationality</th>
                                                    <th>Role</th>
                                                    <th>Created At</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                                            No users found.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    users.map((user) => (
                                                        <tr key={user.id} data-testid="user-row">
                                                            <td>{user.first_name}</td>
                                                            <td>{user.last_name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.nationality}</td>
                                                            <td>{user.role}</td>
                                                            <td>{user.created_at ? new Date(user.created_at).toISOString() : '-'}</td>
                                                            <td>
                                                                <div className="qa-table-actions">
                                                                    <button
                                                                        type="button"
                                                                        className="qa-btn qa-btn-ghost"
                                                                        data-testid="edit-user-btn"
                                                                        onClick={() => handleEditUser(user)}
                                                                        disabled={crudLoading}
                                                                        style={{ marginBottom: 0 }}
                                                                    >
                                                                        <Pencil size={14} />
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="qa-btn qa-btn-warn"
                                                                        data-testid="delete-user-btn"
                                                                        onClick={() => handleDeleteUser(user.id)}
                                                                        disabled={crudLoading}
                                                                        style={{ marginBottom: 0 }}
                                                                    >
                                                                        <Trash2 size={14} />
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.section>

                            <motion.section
                                className="glass qa-card"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.45, delay: 0.05 }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                    <div>
                                        <h2 className="qa-card-title" style={{ marginBottom: '0.5rem' }}>
                                            <Eye size={20} color="var(--primary)" />
                                            JSON Preview
                                        </h2>
                                        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                                            Raw Supabase response data for automation assertions and debugging.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="qa-btn qa-btn-ghost"
                                        onClick={() => setIsJsonPreviewOpen((current) => !current)}
                                    >
                                        {isJsonPreviewOpen ? 'Hide JSON' : 'Show JSON'}
                                    </button>
                                </div>

                                {isJsonPreviewOpen && (
                                    <pre
                                        data-testid="json-preview"
                                        style={{
                                            margin: 0,
                                            padding: '1rem',
                                            borderRadius: '0.75rem',
                                            background: 'var(--api-response-bg)',
                                            color: 'var(--api-response-text)',
                                            overflowX: 'auto',
                                            fontSize: '0.85rem',
                                            lineHeight: 1.6
                                        }}
                                    >
                                        {JSON.stringify(users, null, 2)}
                                    </pre>
                                )}
                            </motion.section>
                        </div>
                    </motion.div>
                )}

                {/* API Testing Section */}
                {showApiTesting && activeSection === 'api-testing' && (
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                    >
                        <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>
                            <Server size={30} color="var(--primary)" style={{ display: 'inline', marginRight: '0.75rem', verticalAlign: 'middle' }} />
                            API Testing
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '820px', marginBottom: '2rem' }}>
                            Test API responses, handle flaky behavior, manage session tokens, and practice edge-case scenarios.
                            Learn how to validate HTTP status codes, handle timeouts, and test unreliable endpoints.
                        </p>

                        <motion.section
                            className="glass qa-card qa-stack"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.45 }}
                        >
                            <div className="qa-widget" style={{ gridColumn: '1 / -1' }}>
                                <h3 className="qa-widget-title">API Request Builder</h3>
                                <p className="qa-helper">Build and test HTTP requests with custom methods, headers, and body.</p>

                                <div className="qa-stack" style={{ gap: '1rem', marginTop: '1rem' }}>
                                    {/* Method and URL Row */}
                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                                        <label className="qa-field" style={{ flex: '0 0 auto', minWidth: '120px' }}>
                                            <span className="qa-label">Method</span>
                                            <select
                                                value={apiTestMethod}
                                                onChange={(e) => setApiTestMethod(e.target.value)}
                                                className="qa-select"
                                                data-testid="qa-api-method-select"
                                            >
                                                <option value="GET">GET</option>
                                                <option value="POST">POST</option>
                                                <option value="PUT">PUT</option>
                                                <option value="PATCH">PATCH</option>
                                                <option value="DELETE">DELETE</option>
                                                <option value="HEAD">HEAD</option>
                                                <option value="OPTIONS">OPTIONS</option>
                                            </select>
                                        </label>

                                        <label className="qa-field" style={{ flex: 1, minWidth: '250px' }}>
                                            <span className="qa-label">URL</span>
                                            <input
                                                type="text"
                                                value={apiTestUrl}
                                                onChange={(e) => setApiTestUrl(e.target.value)}
                                                placeholder="https://api.example.com/endpoint"
                                                className="qa-input"
                                                data-testid="qa-api-url-input"
                                            />
                                        </label>

                                        <button
                                            type="button"
                                            className="qa-btn qa-btn-primary"
                                            onClick={handleApiTest}
                                            disabled={apiTestLoading}
                                            data-testid="qa-api-send-button"
                                            style={{ marginBottom: 0 }}
                                        >
                                            <Play size={16} />
                                            {apiTestLoading ? 'Sending...' : 'Send'}
                                        </button>
                                    </div>

                                    {/* Headers Input */}
                                    <label className="qa-field">
                                        <span className="qa-label">Headers (one per line: Header-Name: value)</span>
                                        <textarea
                                            value={apiTestHeaders}
                                            onChange={(e) => setApiTestHeaders(e.target.value)}
                                            placeholder="Content-Type: application/json&#10;Authorization: Bearer token"
                                            className="qa-input"
                                            rows={3}
                                            style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                                            data-testid="qa-api-headers-input"
                                        />
                                    </label>

                                    {/* Body Input - Only visible for POST, PUT, PATCH */}
                                    {['POST', 'PUT', 'PATCH'].includes(apiTestMethod) && (
                                        <label className="qa-field">
                                            <span className="qa-label">Body (JSON)</span>
                                            <textarea
                                                value={apiTestBody}
                                                onChange={(e) => setApiTestBody(e.target.value)}
                                                placeholder='{"key": "value"}'
                                                className="qa-input"
                                                rows={4}
                                                style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                                                data-testid="qa-api-body-input"
                                            />
                                        </label>
                                    )}

                                    {/* Response Display */}
                                    {apiTestResponse && (
                                        <div style={{ border: '1px solid var(--border)', borderRadius: '0.5rem', padding: '1rem', overflow: 'auto' }}>
                                            <div style={{ marginBottom: '1rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                                    {apiTestResponse.error ? (
                                                        <XCircle size={20} style={{ color: '#ef4444' }} />
                                                    ) : apiTestResponse.status < 300 ? (
                                                        <CheckCircle2 size={20} style={{ color: '#22c55e' }} />
                                                    ) : (
                                                        <AlertTriangle size={20} style={{ color: '#f97316' }} />
                                                    )}
                                                    <strong style={{ fontSize: '1.1rem' }}>
                                                        {apiTestResponse.status ? `HTTP ${apiTestResponse.status}` : apiTestResponse.statusText}
                                                    </strong>
                                                    {apiTestResponse.statusText && <span style={{ color: 'var(--text-secondary)' }}>({apiTestResponse.statusText})</span>}
                                                </div>
                                                <small style={{ color: 'var(--text-secondary)' }}>Response at {apiTestResponse.timestamp}</small>
                                            </div>

                                            {Object.keys(apiTestResponse.headers).length > 0 && (
                                                <div style={{ marginBottom: '1rem' }}>
                                                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Response Headers:</h4>
                                                    <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '0.375rem', fontSize: '0.8rem', fontFamily: 'monospace', maxHeight: '150px', overflowY: 'auto' }}>
                                                        {Object.entries(apiTestResponse.headers).map(([key, value]) => (
                                                            <div key={key}>
                                                                <span style={{ color: '#60a5fa' }}>{key}</span>: <span style={{ color: 'var(--text-primary)' }}>{value}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div>
                                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Response Body:</h4>
                                                <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '0.375rem', fontSize: '0.8rem', fontFamily: 'monospace', maxHeight: '250px', overflowY: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                                    {apiTestResponse.body}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="qa-widget">
                                <h3 className="qa-widget-title">Random API Response</h3>
                                <p className="qa-helper">Useful for status-code assertions and contract checks.</p>
                                <button
                                    type="button"
                                    className="qa-btn qa-btn-primary"
                                    onClick={handleApiSimulation}
                                    disabled={apiLoading}
                                    data-testid="qa-run-api-simulation"
                                >
                                    <Play size={16} />
                                    {apiLoading ? 'Calling API...' : 'Run Simulation'}
                                </button>
                                {apiResult && (
                                    <div className={`qa-response ${apiResult.status < 300 ? 'qa-response-ok' : 'qa-response-error'}`} data-testid="qa-api-result">
                                        <strong>HTTP {apiResult.status}</strong>
                                        <span>{apiResult.message}</span>
                                        <small>Updated at {apiResult.at}</small>
                                    </div>
                                )}
                            </div>

                            <div className="qa-widget">
                                <h3 className="qa-widget-title">Deterministic Flaky Button</h3>
                                <p className="qa-helper">Fails 2 times, passes on every 3rd attempt.</p>
                                <button
                                    type="button"
                                    className="qa-btn qa-btn-warn"
                                    onClick={handleFlakyButton}
                                    data-testid="qa-flaky-button"
                                >
                                    <AlertTriangle size={16} />
                                    Trigger Flaky Action
                                </button>
                                <p className="qa-helper" data-testid="qa-flaky-state">
                                    {flakyState} (attempts: {flakyAttempts})
                                </p>
                            </div>

                            <div className="qa-widget">
                                <h3 className="qa-widget-title">Expiring Session Token</h3>
                                <p className="qa-helper">Use for timeout handling and polling checks.</p>
                                <div className="qa-token-row">
                                    <span className="qa-token-live" data-testid="qa-token-seconds">
                                        {tokenSeconds}s
                                    </span>
                                    <button
                                        type="button"
                                        className="qa-btn qa-btn-ghost"
                                        onClick={() => setTokenSeconds(45)}
                                        data-testid="qa-reset-token"
                                    >
                                        <TimerReset size={16} />
                                        Reset Token
                                    </button>
                                </div>
                            </div>
                        </motion.section>
                    </motion.div>
                )}

                {/* API Playground Section */}
                {activeSection === 'api-playground' && (
                    <ApiPlayground />
                )}

                {/* SQL Practice Tool Section */}
                {activeSection === 'sql-practice' && (
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            borderRadius: '0.75rem',
                            overflow: 'hidden'
                        }}
                    >
                        <SQLPracticeTool />
                    </motion.div>
                )}
            </div>
            </div>
        </div>
    );
};

export default QALab;

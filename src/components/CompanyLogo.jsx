import React, { useState } from 'react';

const getInitials = (company = '') => {
    const parts = company.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();

    return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
};

const CompanyLogo = ({ company, logo, website }) => {
    const [hasError, setHasError] = useState(false);

    const fallback = (
        <div className="company-logo-fallback" aria-label={`${company} logo fallback`}>
            {getInitials(company)}
        </div>
    );

    const content = hasError || !logo ? (
        fallback
    ) : (
        <img
            src={logo}
            alt={`${company} logo`}
            loading="lazy"
            decoding="async"
            onError={() => setHasError(true)}
        />
    );

    if (!website) return content;

    return (
        <a href={website} target="_blank" rel="noreferrer" style={{ display: 'block', height: '100%', width: '100%' }}>
            {content}
        </a>
    );
};

export default CompanyLogo;

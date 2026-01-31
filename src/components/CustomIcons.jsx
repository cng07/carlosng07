import React from 'react';

const IeeeIcon = ({ size = 24, color = "currentColor", ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        {/* Outer Diamond */}
        <path d="M12 2L22 12L12 22L2 12L12 2Z" />
        {/* Inner Arrow */}
        <path d="M12 18V7" />
        <path d="M9 10L12 7L15 10" />
        {/* Circular Path */}
        <path d="M8 13.5C8 12.1 9.8 11 12 11C14.2 11 16 12.1 16 13.5C16 14.9 14.2 16 12 16" />
    </svg>
);

export default IeeeIcon;

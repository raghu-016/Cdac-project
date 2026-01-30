import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, label, name, required = false, ...props }) => {
    return (
        <div style={{ marginBottom: '1rem', width: '100%' }}>
            {label && (
                <label
                    htmlFor={name}
                    style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        color: 'var(--color-text-muted)'
                    }}
                >
                    {label}
                </label>
            )}
            <input
                id={name}
                name={name}
                type={type}
                className="input-field"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                {...props}
            />
        </div>
    );
};

export default Input;

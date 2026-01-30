import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            style={{
                position: 'fixed',
                top: '1.5rem',
                right: '1.5rem',
                zIndex: 1000,
                padding: '0.75rem',
                borderRadius: '50%',
                backgroundColor: 'var(--color-bg-card)',
                color: 'var(--color-text-main)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)'
            }}
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <Moon size={22} fill="currentColor" style={{ opacity: 0.8 }} />
            ) : (
                <Sun size={22} fill="currentColor" style={{ opacity: 0.8 }} />
            )}
        </motion.button>
    );
};

export default ThemeToggle;

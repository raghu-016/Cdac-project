import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) => {
    const baseStyle = "w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md", // Tailwind classes (oops, I promised vanilla CSS classes mostly, but I installed tailwind? Wait, I didn't install tailwind. I created a vanilla react app and added my own CSS.)
        // Correcting to use my CSS classes defined in index.css
        // baseStyle above looks like tailwind. I must NOT use tailwind classes if I didn't install it.
        // Use the classes I defined in index.css: .btn-primary
    };

    // Re-writing with my CSS classes
    const btnClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary'; // I only defined btn-primary so far.

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${btnClass} ${className}`} // merging custom classnames if needed
            onClick={onClick}
            type={type}
            disabled={disabled}
            style={{ opacity: disabled ? 0.7 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
            {children}
        </motion.button>
    );
};

export default Button;

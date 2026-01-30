import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, User, Clock } from 'lucide-react';

const QueryListItem = ({ query, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01, boxShadow: 'var(--shadow-lg)' }}
            className="card"
            onClick={onClick}
            style={{
                marginBottom: '1rem',
                cursor: 'pointer',
                borderLeft: '4px solid var(--color-primary)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--color-text-main)' }}>
                    {query.title}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={14} />
                    {query.timeAgo}
                </span>
            </div>

            <p style={{
                color: 'var(--color-text-muted)',
                fontSize: '0.9rem',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: '1.5'
            }}>
                {query.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <User size={14} />
                    </div>
                    <span style={{ fontWeight: 600 }}>{query.author}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                    <MessageCircle size={16} />
                    <span>{query.answers || 0} answers</span>
                </div>
            </div>
        </motion.div>
    );
};

export default QueryListItem;

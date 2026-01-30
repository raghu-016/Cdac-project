import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ThumbsUp, User } from 'lucide-react';

const QuestionCard = ({ question }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
            style={{
                marginBottom: '2rem',
                borderLeft: '4px solid var(--color-primary)',
                position: 'relative' // Ensure context for any absolute children if needed
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '50%', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-primary)' }}>
                    <User size={20} />
                </div>
                <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{question.author}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>asked {question.timeAgo}</div>
                </div>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                {question.title}
            </h2>

            <p style={{ lineHeight: '1.6', color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>
                {question.description}
            </p>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                <button className="flex-center" style={{ gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    <ThumbsUp size={16} />
                    <span>{question.votes} votes</span>
                </button>
                <div className="flex-center" style={{ gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    <MessageCircle size={16} />
                    <span>{question.answers} answers</span>
                </div>
            </div>
        </motion.div>
    );
};

export default QuestionCard;

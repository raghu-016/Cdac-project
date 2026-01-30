import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const MessageBubble = ({ message, isOwn }) => {
    const [votes, setVotes] = useState(message.votes || 0);

    // Separate styling for "Answer" Bubbles vs just "Chat"
    // Request says: "Each answer shown as a chat-style bubble" but with "Votes / likes (UI only)"

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{
                display: 'flex',
                justifyContent: isOwn ? 'flex-end' : 'flex-start',
                marginBottom: '1rem',
                padding: '0 0.5rem',
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: isOwn ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
                maxWidth: '80%',
                gap: '0.75rem'
            }}>
                {/* Avatar for non-own messages */}
                {!isOwn && (
                    <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid var(--color-bg-card)' }}>
                        <img src={message.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${message.sender}`} alt="Avatar" style={{ width: '100%', height: '100%' }} />
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: isOwn ? 'flex-end' : 'flex-start' }}>
                    <div
                        style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '1rem',
                            borderTopLeftRadius: !isOwn ? '0' : '1rem',
                            borderTopRightRadius: isOwn ? '0' : '1rem',
                            backgroundColor: isOwn ? 'var(--color-msg-sent-bg)' : 'var(--color-msg-received-bg)',
                            color: isOwn ? 'var(--color-msg-sent-text)' : 'var(--color-msg-received-text)',
                            boxShadow: 'var(--shadow-sm)',
                            position: 'relative',
                            fontSize: '0.95rem',
                            lineHeight: '1.5'
                        }}
                    >
                        {!isOwn && <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem', opacity: 0.8 }}>{message.senderName || 'Anonymous'}</div>}
                        {message.text}
                        <div
                            style={{
                                fontSize: '0.7rem',
                                textAlign: 'right',
                                marginTop: '0.25rem',
                                opacity: 0.7
                            }}
                        >
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>

                    {/* Voting UI - Only show for Answers (messages) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem', padding: '0 0.5rem' }}>
                        <button onClick={() => setVotes(v => v + 1)} style={{ opacity: 0.6, cursor: 'pointer' }}><ThumbsUp size={14} /></button>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>{votes}</span>
                        <button onClick={() => setVotes(v => v - 1)} style={{ opacity: 0.6, cursor: 'pointer' }}><ThumbsDown size={14} /></button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MessageBubble;

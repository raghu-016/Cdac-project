import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import MessageBubble from './MessageBubble';
import QuestionCard from './QuestionCard';
import { useAuth } from '../context/AuthContext';
import { SERVICES } from '../config';
import { authFetch } from '../utils/api';

const QueryDetail = ({ query, onBack }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    // 🔹 safe timeAgo
    const timeAgo = (timestamp) => {
        if (!timestamp) return 'Just now';

        const time = new Date(timestamp).getTime();
        if (isNaN(time)) return 'Just now';

        const diff = Date.now() - time;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes} min ago`;
        if (hours < 24) return `${hours} hr ago`;
        return `${days} day ago`;
    };

    // 🔹 load messages (answers)
    useEffect(() => {
        // SERVICES.ANSWER is .../api/answers
        authFetch(`${SERVICES.ANSWER}/query/${query.id}`)
            .then(res => res.json())
            .then(data => {
                const mapped = data.map(m => ({
                    id: m.id,
                    text: m.content,
                    senderName: `User ${m.userId}`, // Backend only gives userId
                    senderEmail: '', // Not available
                    timestamp: m.createdAt,
                    votes: 0
                }));
                setMessages(mapped);
            })
            .catch(err => console.error('Load messages error:', err));
    }, [query.id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // 🔹 send reply
    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        try {
            const res = await authFetch(SERVICES.ANSWER, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    queryId: query.id,
                    userId: user.id,
                    content: inputText
                })
            });

            const saved = await res.json();

            setMessages(prev => [
                ...prev,
                {
                    id: saved.id,
                    text: saved.content,
                    senderName: 'You',
                    senderEmail: user.email,
                    timestamp: saved.createdAt,
                    votes: 0
                }
            ]);

            setInputText('');
        } catch (err) {
            console.error('Send message error:', err);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            {/* Messages */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                <div style={{ width: '100%' }}>
                    <button
                        onClick={onBack}
                        style={{
                            color: 'var(--color-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '1rem'
                        }}
                    >
                        <ArrowLeft size={20} />
                        Back
                    </button>

                    <QuestionCard question={query} />

                    {messages.length === 0 && (
                        <p
                            style={{
                                textAlign: 'center',
                                marginTop: '2rem',
                                color: 'var(--color-text-muted)',
                                fontStyle: 'italic'
                            }}
                        >
                            No answers yet. Be the first to reply!
                        </p>
                    )}

                    {messages.map(msg => (
                        <MessageBubble
                            key={msg.id}
                            message={{ ...msg, timeAgo: timeAgo(msg.timestamp) }}
                            isOwn={msg.senderEmail === user?.email}
                        />
                    ))}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input */}
            <form
                onSubmit={handleSend}
                style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    borderTop: '1px solid var(--color-border)'
                }}
            >
                <input
                    className="input-field"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type reply..."
                />
                <button className="btn-primary" type="submit">
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default QueryDetail;

import React, { useState } from 'react';
import { Send, Plus } from 'lucide-react';
import QueryListItem from './QueryListItem';

const QueryList = ({ queries, onSelectQuery, onPostQuery }) => {
    const [newQueryTitle, setNewQueryTitle] = useState('');
    const [newQueryDesc, setNewQueryDesc] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newQueryTitle.trim() || !newQueryDesc.trim()) return;

        onPostQuery({
            title: newQueryTitle,
            description: newQueryDesc
        });

        setNewQueryTitle('');
        setNewQueryDesc('');
        setIsFormVisible(false); // Close form after submit? Or keep open? Maybe close to see list.
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Query List Area */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Community Queries</h1>

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {queries.map(q => (
                            <QueryListItem
                                key={q.id}
                                query={q}
                                onClick={() => onSelectQuery(q)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Post Query Area - Fixed at Bottom */}
            <div style={{
                padding: '1rem',
                backgroundColor: 'var(--color-bg-sidebar)',
                borderTop: '1px solid var(--color-border)',
                zIndex: 10,
                boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {!isFormVisible ? (
                        <button
                            onClick={() => setIsFormVisible(true)}
                            className="btn-primary"
                            style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}
                        >
                            <Plus size={20} />
                            <span>Ask a Question</span>
                        </button>
                    ) : (
                        <form onSubmit={handleSubmit} className="card fade-in" style={{ padding: '1.5rem', border: '1px solid var(--color-primary)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h3 style={{ margin: 0 }}>New Query</h3>
                                <button type="button" onClick={() => setIsFormVisible(false)} style={{ color: 'var(--color-text-muted)' }}>Cancel</button>
                            </div>

                            <input
                                type="text"
                                className="input-field"
                                placeholder="Query Title (e.g., How to fix React error...)"
                                value={newQueryTitle}
                                onChange={e => setNewQueryTitle(e.target.value)}
                                style={{ marginBottom: '1rem', fontWeight: 600 }}
                                autoFocus
                            />

                            <textarea
                                className="input-field"
                                placeholder="Describe your problem in detail..."
                                value={newQueryDesc}
                                onChange={e => setNewQueryDesc(e.target.value)}
                                style={{ minHeight: '80px', marginBottom: '1rem', resize: 'vertical' }}
                            />

                            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                                Post Query
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QueryList;

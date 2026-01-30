import React, { useState, useEffect } from 'react';
import QueryList from '../components/QueryList';
import QueryDetail from '../components/QueryDetail';
import { useAuth } from '../context/AuthContext';
import { SERVICES } from '../config';
import { authFetch } from '../utils/api';

const Chat = () => {
    const { user } = useAuth();
    const [queries, setQueries] = useState([]);
    const [view, setView] = useState('list');
    const [selectedQuery, setSelectedQuery] = useState(null);

    // 🔹 safe timeAgo helper
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

    // 🔹 load queries
    useEffect(() => {
        // SERVICES.QUERY is .../api/queries
        // Use authFetch to pass the JWT token
        authFetch(SERVICES.QUERY)
            .then(res => res.json())
            .then(data => {
                const mapped = data.map(q => ({
                    id: q.id,
                    title: q.title,
                    description: q.body, // Backend uses 'body'
                    author: `User ${q.userId}`, // We only get userId from backend Query object, no user name. 
                    timeAgo: timeAgo(q.createdAt),
                    votes: 0,
                    answers: 0 // No answers count in backend DTO yet
                }));
                setQueries(mapped);
            })
            .catch(err => console.error('Load queries error:', err));
    }, []);

    const handleSelectQuery = (query) => {
        setSelectedQuery(query);
        setView('detail');
    };

    const handleBack = () => {
        setSelectedQuery(null);
        setView('list');
    };

    // 🔹 create query
    const handlePostQuery = async (newQueryData) => {
        try {
            const response = await authFetch(SERVICES.QUERY, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    title: newQueryData.title,
                    body: newQueryData.description // UI calls it description, backend 'body'
                })
            });

            const saved = await response.json();

            const uiQuery = {
                id: saved.id,
                title: saved.title,
                description: saved.body,
                author: 'You',
                timeAgo: 'Just now',
                votes: 0,
                answers: 0
            };

            setQueries(prev => [uiQuery, ...prev]);
        } catch (err) {
            console.error('Post query error:', err);
        }
    };

    return (
        <div style={{ height: '100%', width: '100%' }}>
            {view === 'list' && (
                <QueryList
                    queries={queries}
                    onSelectQuery={handleSelectQuery}
                    onPostQuery={handlePostQuery}
                />
            )}

            {view === 'detail' && selectedQuery && (
                <QueryDetail
                    query={selectedQuery}
                    onBack={handleBack}
                />
            )}
        </div>
    );
};

export default Chat;

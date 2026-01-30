import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Input from '../components/Input';
import { SERVICES } from '../config';
import { authFetch } from '../utils/api';

import { useAuth } from '../context/AuthContext';

const Support = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, submitting, success

    // 🔴 CHANGE 1: async + real API call
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            console.log("Submitting form:", formData); // debug

            // SERVICES.SUPPORT is already .../api/support
            const response = await authFetch(SERVICES.SUPPORT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...formData, userId: user?.id })
            });

            if (!response.ok) {
                throw new Error("API failed");
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });

            setTimeout(() => setStatus('idle'), 3000);

        } catch (error) {
            console.error("Support submit error:", error);
            alert("Something went wrong. Please try again.");
            setStatus('idle');
        }
    };

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="container" style={{ padding: '3rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card"
            >
                <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>
                    Support & Help
                </h1>

                <p style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
                    Have a question or running into an issue? Drop us a message below.
                </p>

                {status === 'success' ? (
                    <div
                        style={{
                            padding: '2rem',
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            color: '#15803d',
                            borderRadius: 'var(--radius-md)',
                            textAlign: 'center'
                        }}
                    >
                        <h3 style={{ marginBottom: '0.5rem' }}>
                            Message Sent!
                        </h3>
                        <p>Our support team will get back to you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1.5rem',
                                marginBottom: '1.5rem'
                            }}
                        >
                            <Input
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                            />

                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label
                                style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: 500,
                                    color: 'var(--color-text-muted)'
                                }}
                            >
                                Message
                            </label>

                            <textarea
                                name="message"
                                className="input-field"
                                rows="5"
                                placeholder="Describe your issue..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* 🔴 Button SAME, UI SAME */}
                        <Button type="submit" disabled={status === 'submitting'}>
                            {status === 'submitting' ? 'Sending...' : 'Submit Request'}
                        </Button>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default Support;

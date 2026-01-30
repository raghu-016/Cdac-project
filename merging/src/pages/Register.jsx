import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await register(name, email, password);
            alert("Account Created Successfully");
            navigate('/login');
        } catch (err) {
            alert(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh', padding: '1rem' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card"
                style={{ width: '100%', maxWidth: '400px' }}
            >
                <h1 style={{ marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.75rem' }}>
                    Create Account
                </h1>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Name"
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        name="name"
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        name="email"
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        name="password"
                    />

                    <div style={{ marginTop: '1.5rem' }}>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </div>
                </form>

                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                        Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
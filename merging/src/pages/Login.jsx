import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();   // 🔥 IMPORTANT

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Email and Password required");
            return;
        }

        setIsLoading(true);

        try {
            // 🔐 REAL LOGIN (Spring Boot + AuthContext)
            await login(email, password);

            // ✅ Chat is index route under Layout
            navigate('/', { replace: true });

        } catch (error) {
            alert("Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh', padding: '1rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
                style={{ width: '100%', maxWidth: '400px' }}
            >
                <h1
                    style={{
                        marginBottom: '0.5rem',
                        textAlign: 'center',
                        fontSize: '1.75rem',
                        fontWeight: 700
                    }}
                >
                    QueryBridge
                </h1>

                <p
                    style={{
                        textAlign: 'center',
                        marginBottom: '1.5rem',
                        color: 'var(--color-text-muted)'
                    }}
                >
                    Login to continue
                </p>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div style={{ marginTop: '1.5rem' }}>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Verifying...' : 'Login'}
                        </Button>
                    </div>
                </form>

                <p
                    style={{
                        marginTop: '1.5rem',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-muted)'
                    }}
                >
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        style={{ color: 'var(--color-primary)', fontWeight: 600 }}
                    >
                        Create Account
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;

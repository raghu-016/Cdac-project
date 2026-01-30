import React from 'react';
import {
    Info,
    Target,
    Users,
    CheckCircle,
    Server,
    Database,
    Code,
    Lock,
    Globe,
    Award
} from 'lucide-react';
import '../styles/About.css';

const About = () => {
    const SectionCard = ({ children, className = "" }) => (
        <div className={`section-card ${className}`}>
            {children}
        </div>
    );

    return (
        <div className="about-container">
            {/* 1. Page Header Section */}
            <div className="page-header">
                <div className="header-glow"></div>
                <span className="badge">KNOWLEDGE BASE</span>
                <h1 className="page-title">
                    About <span className="text-gradient">CDAC QUERY BRIDGE</span>
                </h1>
                <p className="page-description">
                    A centralized platform for knowledge sharing and technical discussions within the CDAC community.
                </p>
            </div>

            <div className="grid-2">
                {/* 2. About the Platform */}
                <SectionCard className="relative overflow-hidden group">
                    <div className="bg-icon-overlay">
                        <Globe size={120} className="text-primary" />
                    </div>
                    <div className="card-header">
                        <div className="card-icon-bg bg-blue-50">
                            <Info size={28} />
                        </div>
                        <h2 className="card-title">What is this Platform?</h2>
                    </div>
                    <p className="card-text">
                        The CDAC Discussion & Q&A Portal is a web-based platform designed to facilitate structured knowledge sharing among CDAC students, faculty members, employees, and alumni.
                        It provides a centralized space where users can ask academic or technical questions and receive clear, helpful answers.
                    </p>
                </SectionCard>

                {/* 3. Purpose & Objectives */}
                <SectionCard>
                    <div className="card-header">
                        <div className="card-icon-bg bg-green-50">
                            <Target size={28} />
                        </div>
                        <h2 className="card-title">Purpose and Objectives</h2>
                    </div>
                    <ul className="check-list">
                        {[
                            'Encourage collaborative learning among members',
                            'Structured platform for technical Q&A',
                            'Reduce dependency on scattered channels',
                            'Improve clarity of academic discussions',
                            'Build a searchable knowledge base'
                        ].map((item, index) => (
                            <li key={index} className="check-item">
                                <CheckCircle size={20} className="check-icon" />
                                <span className="check-text">{item}</span>
                            </li>
                        ))}
                    </ul>
                </SectionCard>
            </div>

            {/* 4. How the Platform Works */}
            <div className="how-it-works">
                <div className="section-heading">
                    <h2 className="section-title">How It Works</h2>
                    <p className="page-description" style={{ fontSize: '1rem' }}>Simple steps to get started</p>
                </div>
                <div className="steps-grid">
                    {[
                        { step: 'Register & Login', desc: 'Create your account safely', icon: Lock },
                        { step: 'Ask Questions', desc: 'Post your academic doubts', icon: Info },
                        { step: 'Get Answers', desc: 'Receive help from peers', icon: Users },
                        { step: 'Search Knowledge', desc: 'Find existing solutions', icon: Globe },
                        { step: 'Platform Integrity', desc: 'Managed by Admins', icon: Award }
                    ].map((item, index) => (
                        <div key={index} className="step-card">
                            <div className="step-icon-circle">
                                <item.icon size={24} />
                            </div>
                            <h3 className="step-title">{item.step}</h3>
                            <p className="step-desc">{item.desc}</p>
                            <span className="step-number">STEP {index + 1}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid-3">
                {/* 5. Who Can Use This Platform */}
                <SectionCard>
                    <h2 className="card-title" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users style={{ color: 'var(--color-accent)' }} /> Who Can Use?
                    </h2>
                    <div className="user-types-grid">
                        {['Students', 'Faculty Members', 'Employees', 'Administrators'].map((user, idx) => (
                            <div key={idx} className="user-type-item">
                                <div className="dot"></div>
                                <span className="user-type-text">{user}</span>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                {/* 6. Key Highlights */}
                <SectionCard className="col-span-2">
                    <h2 className="card-title" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Award style={{ color: 'var(--color-accent)' }} /> Key Highlights
                    </h2>
                    <div className="highlights-grid">
                        {[
                            { text: 'Simple Interface', sub: 'Easy to navigate' },
                            { text: 'Role-based access', sub: 'Secure permissions' },
                            { text: 'Organized Q&A', sub: 'Structured threads' },
                            { text: 'Secure Auth', sub: 'JWT Protection' },
                            { text: 'Academic Focus', sub: 'Professional environment' }
                        ].map((highlight, idx) => (
                            <div key={idx} className="highlight-item">
                                <div className="highlight-icon-bg">
                                    <CheckCircle size={16} />
                                </div>
                                <div>
                                    <p className="highlight-title">{highlight.text}</p>
                                    <p className="highlight-sub">{highlight.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>

            {/* 7. Technology Overview */}
            <div className="tech-stack-section">
                <div className="tech-bg-blob-1"></div>
                <div className="tech-bg-blob-2"></div>

                <h2 className="section-title" style={{ color: 'white', position: 'relative', zIndex: 10, textAlign: 'center', marginBottom: '2rem' }}>Technology Stack</h2>
                <div className="tech-grid">
                    {[
                        { title: 'Frontend', stack: 'React.js, Tailwind', icon: Code, color: '#93c5fd' }, // Blue-300
                        { title: 'Backend', stack: 'Spring Boot', icon: Server, color: '#86efac' }, // Green-300
                        { title: 'Database', stack: 'MySQL', icon: Database, color: '#fde047' }, // Yellow-300
                        { title: 'Security', stack: 'JWT Auth', icon: Lock, color: '#d8b4fe' } // Purple-300
                    ].map((tech, idx) => (
                        <div key={idx} className="tech-card">
                            <tech.icon size={32} className="tech-icon" style={{ color: tech.color }} />
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>{tech.title}</h3>
                            <p style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>{tech.stack}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 9. Footer Note */}
            <div className="footer-note">
                <p className="footer-text">© CDAC QUERY BRIDGE | Academic Project</p>
                <p className="footer-sub">Designed for Excellence</p>
            </div>
        </div>
    );
};

export default About;
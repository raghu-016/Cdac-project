import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Info, HelpCircle, LogOut, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const { user, logout } = useAuth();

    // ✅ SAFE NAME RESOLUTION
    const displayName =
        user?.fname ||
        user?.name ||
        user?.email?.split('@')[0] ||
        'User';

    // ✅ AVATAR LETTER
    const avatarLetter = displayName.charAt(0).toUpperCase();

    const navItems = [
        { to: '/', icon: MessageSquare, label: 'Chat Room' },
        { to: '/profile', icon: User, label: 'Profile' },
        { to: '/about', icon: Info, label: 'About' },
        { to: '/support', icon: HelpCircle, label: 'Support' },
    ];

    return (
        <aside className={styles.sidebar}>
            {/* 🔹 HEADER */}
            <div className={styles.header}>
                <div className={styles.avatar}>
                    {user?.avatar ? (
                        <img src={user.avatar} alt="Avatar" />
                    ) : (
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: '#6366f1',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                            }}
                        >
                            {avatarLetter}
                        </div>
                    )}
                </div>

                <div className={styles.userInfo}>
                    <p className={styles.userName}>{displayName}</p>
                    <p className={styles.userRole}>{user?.role || 'Member'}</p>
                </div>
            </div>

            {/* 🔹 NAVIGATION */}
            <nav className={styles.nav}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `${styles.navLink} ${isActive ? styles.active : ''}`
                        }
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* 🔹 FOOTER */}
            <div className={styles.footer}>
                <button onClick={logout} className={styles.logoutBtn}>
                    <LogOut size={20} />
                    <span>Disconnect</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

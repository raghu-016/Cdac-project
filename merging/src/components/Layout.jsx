import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';

const Layout = () => {
    const { user, loading } = useAuth();

    console.log("LAYOUT USER:", user); // 👈 TEMP DEBUG

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default Layout;

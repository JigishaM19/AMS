import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children, requiredRole }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.loginRole === requiredRole) {
        setUser(parsedUser);
      } else {
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
    setLoading(false);
  }, [requiredRole, router]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar userRole={user.loginRole} currentPath={router.pathname} />
      <div style={{
        marginLeft: '250px',
        flex: 1,
        backgroundColor: '#f8f9fa',
        minHeight: '100vh'
      }}>
        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          borderBottom: '1px solid #e9ecef',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ margin: 0, color: '#2c3e50' }}>
            Welcome, {user.fullName}
          </h1>
          <p style={{ margin: '5px 0 0 0', color: '#6c757d' }}>
            {user.loginRole.charAt(0).toUpperCase() + user.loginRole.slice(1)} Dashboard
          </p>
        </div>
        <div style={{ padding: '0 20px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

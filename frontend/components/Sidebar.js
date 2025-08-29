import { useRouter } from 'next/router';

const navigationConfig = {
  student: [
    { name: 'Home', path: '/dashboard/student', icon: '🏠' },
    { name: 'Attendance', path: '/dashboard/student/attendance', icon: '📊' },
    { name: 'Performance', path: '/dashboard/student/performance', icon: '📈' },
    { name: 'Leave Request', path: '/dashboard/student/leave-request', icon: '📝' },
    { name: 'Complaints', path: '/dashboard/student/complaints', icon: '💬' }
  ],
  parent: [
    { name: 'Home', path: '/dashboard/parent', icon: '🏠' },
    { name: 'Attendance', path: '/dashboard/parent/attendance', icon: '📊' },
    { name: 'Performance', path: '/dashboard/parent/performance', icon: '📈' },
    { name: 'Leave Request', path: '/dashboard/parent/leave-request', icon: '📝' },
    { name: 'Complaints', path: '/dashboard/parent/complaints', icon: '💬' }
  ],
  teacher: [
    { name: 'Home', path: '/dashboard/teacher', icon: '🏠' },
    { name: 'Classes', path: '/dashboard/teacher/classes', icon: '🎓' },
    { name: 'Test', path: '/dashboard/teacher/test', icon: '📝' },
    { name: 'Notice', path: '/dashboard/teacher/notice', icon: '📢' },
    { name: 'Leave Request', path: '/dashboard/teacher/leave-request', icon: '📝' },
    { name: 'Complaints', path: '/dashboard/teacher/complaints', icon: '💬' }
  ],
  coordinator: [
    { name: 'Home', path: '/dashboard/coordinator', icon: '🏠' },
    { name: 'Attendance', path: '/dashboard/coordinator/attendance', icon: '📊' },
    { name: 'Performance', path: '/dashboard/coordinator/performance', icon: '📈' },
    { name: 'Student Info', path: '/dashboard/coordinator/student-info', icon: '👥' },
    { name: 'Leave Request', path: '/dashboard/coordinator/leave-request', icon: '📝' },
    { name: 'Complaints', path: '/dashboard/coordinator/complaints', icon: '💬' }
  ],
  hod: [
    { name: 'Home', path: '/dashboard/hod', icon: '🏠' },
    { name: 'Manage Staff', path: '/dashboard/hod/manage-staff', icon: '👨‍🏫' },
    { name: 'Manage Timetable', path: '/dashboard/hod/manage-timetable', icon: '📅' },
    { name: 'Department Analytics', path: '/dashboard/hod/analytics', icon: '📊' },
    { name: 'Leave Request', path: '/dashboard/hod/leave-request', icon: '📝' },
    { name: 'Complaints', path: '/dashboard/hod/complaints', icon: '💬' }
  ],
  admin: [
    { name: 'Home', path: '/dashboard/admin', icon: '🏠' },
    { name: 'Manage Faculty', path: '/dashboard/admin/manage-faculty', icon: '👨‍🏫' },
    { name: 'Manage Students', path: '/dashboard/admin/manage-students', icon: '👨‍🎓' },
    { name: 'Manage Academics', path: '/dashboard/admin/manage-academics', icon: '📚' }
  ]
};

export default function Sidebar({ userRole, currentPath }) {
  const router = useRouter();
  const navigation = navigationConfig[userRole] || [];

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#2c3e50',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #34495e',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: 0, color: '#3498db' }}>ABAMS</h2>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#bdc3c7', textTransform: 'capitalize' }}>
          {userRole} Dashboard
        </p>
      </div>

      {/* Navigation Menu */}
      <nav style={{ flex: 1, padding: '20px 0' }}>
        {navigation.map((item, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(item.path)}
            style={{
              padding: '15px 20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: currentPath === item.path ? '#3498db' : 'transparent',
              borderLeft: currentPath === item.path ? '4px solid #2980b9' : '4px solid transparent',
              transition: 'all 0.3s ease',
              marginBottom: '2px'
            }}
            onMouseEnter={(e) => {
              if (currentPath !== item.path) {
                e.target.style.backgroundColor = '#34495e';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPath !== item.path) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            <span style={{ marginRight: '10px', fontSize: '18px' }}>{item.icon}</span>
            <span style={{ fontSize: '14px' }}>{item.name}</span>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '20px',
        borderTop: '1px solid #34495e'
      }}>
        <div
          onClick={handleLogout}
          style={{
            padding: '10px 15px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#e74c3c',
            borderRadius: '5px',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#e74c3c'}
        >
          <span style={{ marginRight: '10px' }}>🚪</span>
          <span style={{ fontSize: '14px' }}>Logout</span>
        </div>
      </div>
    </div>
  );
}

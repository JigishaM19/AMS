import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/teachers');
      const data = await res.json();
      setTeachers(data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
    setLoading(false);
  };

  const updateTeacherRoles = async (teacherId, roles) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/teachers/${teacherId}/roles`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roles }),
      });
      
      if (res.ok) {
        fetchTeachers(); // Refresh the list
        alert('Teacher roles updated successfully');
      }
    } catch (error) {
      console.error('Error updating roles:', error);
      alert('Error updating teacher roles');
    }
  };

  const handleRoleChange = (teacherId, roleName, value) => {
    const teacher = teachers.find(t => t._id === teacherId);
    const updatedRoles = { ...teacher.roles, [roleName]: value };
    updateTeacherRoles(teacherId, updatedRoles);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Admin Home</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: '#3498db',
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>Total Faculty</h3>
            <p style={{ fontSize: '24px', margin: '10px 0' }}>{teachers.length}</p>
            <p>Registered Teachers</p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#2ecc71',
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>System Status</h3>
            <p style={{ fontSize: '24px', margin: '10px 0' }}>Active</p>
            <p>All Systems Online</p>
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Teacher Role Management</h2>
        
        {teachers.length === 0 ? (
          <p>No teachers found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: 12, border: '1px solid #ddd', textAlign: 'left' }}>Teacher Name</th>
                  <th style={{ padding: 12, border: '1px solid #ddd', textAlign: 'left' }}>Username</th>
                  <th style={{ padding: 12, border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: 12, border: '1px solid #ddd', textAlign: 'center' }}>HOD</th>
                  <th style={{ padding: 12, border: '1px solid #ddd', textAlign: 'center' }}>Class Coordinator</th>
                  <th style={{ padding: 12, border: '1px solid #ddd', textAlign: 'center' }}>Subject Teacher</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map(teacher => (
                  <tr key={teacher._id}>
                    <td style={{ padding: 12, border: '1px solid #ddd' }}>
                      {teacher.userId.fullName}
                    </td>
                    <td style={{ padding: 12, border: '1px solid #ddd' }}>
                      {teacher.userId.username}
                    </td>
                    <td style={{ padding: 12, border: '1px solid #ddd' }}>
                      {teacher.userId.email}
                    </td>
                    <td style={{ padding: 12, border: '1px solid #ddd', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={teacher.roles.isHOD}
                        onChange={(e) => handleRoleChange(teacher._id, 'isHOD', e.target.checked)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                    </td>
                    <td style={{ padding: 12, border: '1px solid #ddd', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={teacher.roles.isClassCoordinator}
                        onChange={(e) => handleRoleChange(teacher._id, 'isClassCoordinator', e.target.checked)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                    </td>
                    <td style={{ padding: 12, border: '1px solid #ddd', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={teacher.roles.isSubjectTeacher}
                        onChange={(e) => handleRoleChange(teacher._id, 'isSubjectTeacher', e.target.checked)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

import DashboardLayout from '../../../components/DashboardLayout';
import { useState, useEffect } from 'react';

export default function AdminManageFaculty() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

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
        fetchTeachers();
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
    <DashboardLayout requiredRole="admin">
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#2c3e50', margin: 0 }}>Faculty Management</h2>
          <div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2ecc71',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              {showAddForm ? 'Cancel' : 'Add Faculty'}
            </button>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Export Data
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: '#3498db',
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>Total Faculty</h3>
            <p style={{ fontSize: '32px', margin: '10px 0' }}>{teachers.length}</p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#e74c3c',
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>HODs</h3>
            <p style={{ fontSize: '32px', margin: '10px 0' }}>
              {teachers.filter(t => t.roles.isHOD).length}
            </p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#f39c12',
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>Coordinators</h3>
            <p style={{ fontSize: '32px', margin: '10px 0' }}>
              {teachers.filter(t => t.roles.isClassCoordinator).length}
            </p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#2ecc71',
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>Teachers</h3>
            <p style={{ fontSize: '32px', margin: '10px 0' }}>
              {teachers.filter(t => t.roles.isSubjectTeacher).length}
            </p>
          </div>
        </div>

        {showAddForm && (
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3>Add New Faculty Member</h3>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              Note: Faculty members must first register through the registration page. 
              Use this section to assign roles to registered teachers.
            </p>
            <button
              onClick={() => window.open('/register', '_blank')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Open Registration Page
            </button>
          </div>
        )}

        <div style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: 12, textAlign: 'left' }}>Faculty Name</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Username</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Email</th>
                <th style={{ padding: 12, textAlign: 'center' }}>Employee ID</th>
                <th style={{ padding: 12, textAlign: 'center' }}>HOD</th>
                <th style={{ padding: 12, textAlign: 'center' }}>Coordinator</th>
                <th style={{ padding: 12, textAlign: 'center' }}>Teacher</th>
                <th style={{ padding: 12, textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(teacher => (
                <tr key={teacher._id} style={{ backgroundColor: teacher._id % 2 === 0 ? '#f8f9fa' : 'transparent' }}>
                  <td style={{ padding: 12 }}>{teacher.userId.fullName}</td>
                  <td style={{ padding: 12 }}>{teacher.userId.username}</td>
                  <td style={{ padding: 12 }}>{teacher.userId.email}</td>
                  <td style={{ padding: 12, textAlign: 'center' }}>{teacher.employeeId}</td>
                  <td style={{ padding: 12, textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={teacher.roles.isHOD}
                      onChange={(e) => handleRoleChange(teacher._id, 'isHOD', e.target.checked)}
                      style={{ transform: 'scale(1.2)' }}
                    />
                  </td>
                  <td style={{ padding: 12, textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={teacher.roles.isClassCoordinator}
                      onChange={(e) => handleRoleChange(teacher._id, 'isClassCoordinator', e.target.checked)}
                      style={{ transform: 'scale(1.2)' }}
                    />
                  </td>
                  <td style={{ padding: 12, textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={teacher.roles.isSubjectTeacher}
                      onChange={(e) => handleRoleChange(teacher._id, 'isSubjectTeacher', e.target.checked)}
                      style={{ transform: 'scale(1.2)' }}
                    />
                  </td>
                  <td style={{ padding: 12, textAlign: 'center' }}>
                    <button style={{
                      padding: '6px 12px',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '5px'
                    }}>
                      View Profile
                    </button>
                    <button style={{
                      padding: '6px 12px',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

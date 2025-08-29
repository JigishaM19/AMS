import DashboardLayout from '../../../components/DashboardLayout';
import { useState } from 'react';

export default function AdminManageStudents() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const students = [
    { id: 1, name: 'Alice Johnson', rollNo: '001', class: '10-A', email: 'alice@email.com', phone: '123-456-7890', status: 'Active' },
    { id: 2, name: 'Bob Wilson', rollNo: '002', class: '10-A', email: 'bob@email.com', phone: '123-456-7892', status: 'Active' },
    { id: 3, name: 'Carol Davis', rollNo: '003', class: '10-B', email: 'carol@email.com', phone: '123-456-7894', status: 'Active' },
    { id: 4, name: 'David Brown', rollNo: '004', class: '11-A', email: 'david@email.com', phone: '123-456-7896', status: 'Inactive' }
  ];

  const filteredStudents = selectedClass === 'all' 
    ? students 
    : students.filter(student => student.class === selectedClass);

  const classes = ['10-A', '10-B', '11-A', '11-B', '12-A', '12-B'];

  return (
    <DashboardLayout requiredRole="admin">
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#2c3e50', margin: 0 }}>Student Management</h2>
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
              {showAddForm ? 'Cancel' : 'Add Student'}
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
            <h3>Total Students</h3>
            <p style={{ fontSize: '32px', margin: '10px 0' }}>{students.length}</p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#2ecc71',
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>Active Students</h3>
            <p style={{ fontSize: '32px', margin: '10px 0' }}>
              {students.filter(s => s.status === 'Active').length}
            </p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#e74c3c',
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>Inactive Students</h3>
            <p style={{ fontSize: '32px', margin: '10px 0' }}>
              {students.filter(s => s.status === 'Inactive').length}
            </p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#f39c12',
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>Classes</h3>
            <p style={{ fontSize: '32px', margin: '10px 0' }}>{classes.length}</p>
          </div>
        </div>

        {/* Filter */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Filter by Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minWidth: '150px' }}
          >
            <option value="all">All Classes ({students.length})</option>
            {classes.map(cls => (
              <option key={cls} value={cls}>
                {cls} ({students.filter(s => s.class === cls).length})
              </option>
            ))}
          </select>
        </div>

        {showAddForm && (
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3>Add New Student</h3>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              Note: Students must first register through the registration page. 
              Use this section to manage existing student records.
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
                <th style={{ padding: 12, textAlign: 'left' }}>Student Name</th>
                <th style={{ padding: 12, textAlign: 'center' }}>Roll No.</th>
                <th style={{ padding: 12, textAlign: 'center' }}>Class</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Email</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Phone</th>
                <th style={{ padding: 12, textAlign: 'center' }}>Status</th>
                <th style={{ padding: 12, textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id} style={{ backgroundColor: student.id % 2 === 0 ? '#f8f9fa' : 'transparent' }}>
                  <td style={{ padding: 12 }}>{student.name}</td>
                  <td style={{ padding: 12, textAlign: 'center' }}>{student.rollNo}</td>
                  <td style={{ padding: 12, textAlign: 'center' }}>{student.class}</td>
                  <td style={{ padding: 12 }}>{student.email}</td>
                  <td style={{ padding: 12 }}>{student.phone}</td>
                  <td style={{ padding: 12, textAlign: 'center' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      backgroundColor: student.status === 'Active' ? '#2ecc71' : '#e74c3c', 
                      color: 'white', 
                      borderRadius: '4px', 
                      fontSize: '12px' 
                    }}>
                      {student.status}
                    </span>
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
                      backgroundColor: '#f39c12',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '5px'
                    }}>
                      Edit
                    </button>
                    <button style={{
                      padding: '6px 12px',
                      backgroundColor: student.status === 'Active' ? '#e74c3c' : '#2ecc71',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                      {student.status === 'Active' ? 'Deactivate' : 'Activate'}
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

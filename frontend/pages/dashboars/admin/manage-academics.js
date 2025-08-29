import DashboardLayout from '../../../components/DashboardLayout';
import { useState } from 'react';

export default function AdminManageAcademics() {
  const [activeTab, setActiveTab] = useState('subjects');

  const subjects = [
    { id: 1, name: 'Mathematics', code: 'MATH101', credits: 4, department: 'Science', status: 'Active' },
    { id: 2, name: 'Physics', code: 'PHY101', credits: 4, department: 'Science', status: 'Active' },
    { id: 3, name: 'Chemistry', code: 'CHEM101', credits: 4, department: 'Science', status: 'Active' },
    { id: 4, name: 'Biology', code: 'BIO101', credits: 3, department: 'Science', status: 'Active' }
  ];

  const academicYears = [
    { id: 1, year: '2024-25', status: 'Current', startDate: '2024-06-01', endDate: '2025-03-31' },
    { id: 2, year: '2023-24', status: 'Completed', startDate: '2023-06-01', endDate: '2024-03-31' }
  ];

  const semesters = [
    { id: 1, name: 'Semester 1', year: '2024-25', startDate: '2024-06-01', endDate: '2024-10-31', status: 'Completed' },
    { id: 2, name: 'Semester 2', year: '2024-25', startDate: '2024-11-01', endDate: '2025-03-31', status: 'Current' }
  ];

  return (
    <DashboardLayout requiredRole="admin">
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Academic Management</h2>

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
            <h3>Total Subjects</h3>
            <p style={{ fontSize: '32px', margin: '10px 0' }}>{subjects.length}</p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#2ecc71',
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>Current Year</h3>
            <p style={{ fontSize: '20px', margin: '10px 0' }}>2024-25</p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#f39c12',
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>Current Semester</h3>
            <p style={{ fontSize: '20px', margin: '10px 0' }}>Semester 2</p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#9b59b6',
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>Total Credits</h3>
            <p style={{ fontSize: '32px', margin: '10px 0' }}>
              {subjects.reduce((total, subject) => total + subject.credits, 0)}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTab('subjects')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'subjects' ? '#3498db' : '#ecf0f1',
              color: activeTab === 'subjects' ? 'white' : '#2c3e50',
              border: 'none',
              borderRadius: '5px 0 0 5px',
              cursor: 'pointer'
            }}
          >
            Subjects
          </button>
          <button
            onClick={() => setActiveTab('years')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'years' ? '#3498db' : '#ecf0f1',
              color: activeTab === 'years' ? 'white' : '#2c3e50',
              border: 'none',
              borderRadius: '0',
              cursor: 'pointer'
            }}
          >
            Academic Years
          </button>
          <button
            onClick={() => setActiveTab('semesters')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'semesters' ? '#3498db' : '#ecf0f1',
              color: activeTab === 'semesters' ? 'white' : '#2c3e50',
              border: 'none',
              borderRadius: '0 5px 5px 0',
              cursor: 'pointer'
            }}
          >
            Semesters
          </button>
        </div>

        {/* Subjects Tab */}
        {activeTab === 'subjects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>Subject Management</h3>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#2ecc71',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Add New Subject
              </button>
            </div>
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: 12, textAlign: 'left' }}>Subject Name</th>
                    <th style={{ padding: 12, textAlign: 'center' }}>Code</th>
                    <th style={{ padding: 12, textAlign: 'center' }}>Credits</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>Department</th>
                    <th style={{ padding: 12, textAlign: 'center' }}>Status</th>
                    <th style={{ padding: 12, textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map(subject => (
                    <tr key={subject.id} style={{ backgroundColor: subject.id % 2 === 0 ? '#f8f9fa' : 'transparent' }}>
                      <td style={{ padding: 12 }}>{subject.name}</td>
                      <td style={{ padding: 12, textAlign: 'center' }}>{subject.code}</td>
                      <td style={{ padding: 12, textAlign: 'center' }}>{subject.credits}</td>
                      <td style={{ padding: 12 }}>{subject.department}</td>
                      <td style={{ padding: 12, textAlign: 'center' }}>
                        <span style={{ 
                          padding: '4px 8px', 
                          backgroundColor: '#2ecc71', 
                          color: 'white', 
                          borderRadius: '4px', 
                          fontSize: '12px' 
                        }}>
                          {subject.status}
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
                          Edit
                        </button>
                        <button style={{
                          padding: '6px 12px',
                          backgroundColor: '#e74c3c',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}>
                          Archive
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Academic Years Tab */}
        {activeTab === 'years' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>Academic Year Management</h3>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#2ecc71',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Add New Year
              </button>
            </div>
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: 12, textAlign: 'left' }}>Academic Year</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>Start Date</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>End Date</th>
                    <th style={{ padding: 12, textAlign: 'center' }}>Status</th>
                    <th style={{ padding: 12, textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {academicYears.map(year => (
                    <tr key={year.id} style={{ backgroundColor: year.id % 2 === 0 ? '#f8f9fa' : 'transparent' }}>
                      <td style={{ padding: 12 }}>{year.year}</td>
                      <td style={{ padding: 12 }}>{year.startDate}</td>
                      <td style={{ padding: 12 }}>{year.endDate}</td>
                      <td style={{ padding: 12, textAlign: 'center' }}>
                        <span style={{ 
                          padding: '4px 8px', 
                          backgroundColor: year.status === 'Current' ? '#2ecc71' : '#3498db', 
                          color: 'white', 
                          borderRadius: '4px', 
                          fontSize: '12px' 
                        }}>
                          {year.status}
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
                          Edit
                        </button>
                        <button style={{
                          padding: '6px 12px',
                          backgroundColor: '#f39c12',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}>
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Semesters Tab */}
        {activeTab === 'semesters' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>Semester Management</h3>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#2ecc71',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Add New Semester
              </button>
            </div>
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: 12, textAlign: 'left' }}>Semester</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>Academic Year</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>Start Date</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>End Date</th>
                    <th style={{ padding: 12, textAlign: 'center' }}>Status</th>
                    <th style={{ padding: 12, textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {semesters.map(semester => (
                    <tr key={semester.id} style={{ backgroundColor: semester.id % 2 === 0 ? '#f8f9fa' : 'transparent' }}>
                      <td style={{ padding: 12 }}>{semester.name}</td>
                      <td style={{ padding: 12 }}>{semester.year}</td>
                      <td style={{ padding: 12 }}>{semester.startDate}</td>
                      <td style={{ padding: 12 }}>{semester.endDate}</td>
                      <td style={{ padding: 12, textAlign: 'center' }}>
                        <span style={{ 
                          padding: '4px 8px', 
                          backgroundColor: semester.status === 'Current' ? '#2ecc71' : '#3498db', 
                          color: 'white', 
                          borderRadius: '4px', 
                          fontSize: '12px' 
                        }}>
                          {semester.status}
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
                          Edit
                        </button>
                        <button style={{
                          padding: '6px 12px',
                          backgroundColor: '#f39c12',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}>
                          Activate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

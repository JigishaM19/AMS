export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: 50 }}>
      <h1>Welcome to ABAMS</h1>
      <p>Academic Monitoring System</p>
      <div style={{ marginTop: 30 }}>
        <a href="/login" style={{ 
          margin: 10, 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: 4
        }}>
          Login
        </a>
        <a href="/register" style={{ 
          margin: 10, 
          padding: '10px 20px', 
          backgroundColor: '#28a745', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: 4
        }}>
          Register
        </a>
      </div>
    </div>
  );
}

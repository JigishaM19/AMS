import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginForm({ initialRole = "student" }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    userType: initialRole,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData((prev) => ({ ...prev, userType: initialRole }));
  }, [initialRole]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        // store token and user in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard"); // redirect after login
      } else {
        setError("❌ " + (data.message || "Login failed"));
      }
    } catch (err) {
      setError("⚠️ Server error. Try again later.");
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username / Email</label>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Role</label>
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="parent">Parent</option>
          <option value="subteacher">SubTeacher</option>
          <option value="hod">HOD</option>
          <option value="coordinator">Coordinator</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Login</button>
        {error && <p className="message">{error}</p>}
      </form>

      <p className="switch">
        Don't have an account?{" "}
        <span className="link" onClick={() => router.push("/register")}>
          Register
        </span>
      </p>

      <style jsx>{`
        .container {
          max-width: 450px;
          margin: 50px auto;
          padding: 30px;
          border-radius: 15px;
          background: linear-gradient(145deg, #ffffff, #e0f7ff);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #0070f3;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }
        input,
        select {
          width: 100%;
          padding: 12px;
          margin-bottom: 20px;
          border-radius: 10px;
          border: 1px solid #ccc;
          outline: none;
          transition: 0.3s;
        }
        input:focus,
        select:focus {
          border-color: #0070f3;
          box-shadow: 0 0 5px rgba(0, 112, 243, 0.5);
        }
        button {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(to right, #0070f3, #00c6ff);
          color: #fff;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
        }
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 112, 243, 0.3);
        }
        .message {
          margin-top: 15px;
          text-align: center;
          font-weight: 600;
          color: red;
        }
        .switch {
          text-align: center;
          margin-top: 15px;
          color: #555;
        }
        .link {
          color: #0070f3;
          font-weight: bold;
          cursor: pointer;
        }
        .link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

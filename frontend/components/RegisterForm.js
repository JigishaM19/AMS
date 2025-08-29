import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function RegisterForm({ initialRole = "student" }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    userType: initialRole,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFormData((prev) => ({ ...prev, userType: initialRole }));
  }, [initialRole]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Registration successful! You can now login.");
        setTimeout(() => router.push("/login"), 2000); // redirect to login
      } else {
        setMessage("❌ " + (data.message || "Registration failed"));
      }
    } catch (err) {
      setMessage("⚠️ Server error. Try again later.");
    }
  }

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Mobile Number</label>
        <input
          type="text"
          name="mobileNumber"
          value={formData.mobileNumber}
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

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
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

        <button type="submit">Register</button>
        {message && <p className="message">{message}</p>}
      </form>

      <p className="switch">
        Already have an account?{" "}
        <span className="link" onClick={() => router.push("/login")}>
          Login
        </span>
      </p>

      <style jsx>{`
        .container {
          max-width: 450px;
          margin: 50px auto;
          padding: 30px;
          border-radius: 15px;
          background: linear-gradient(145deg, #ffffff, #ffe6f0);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #d6007a;
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
          border-color: #d6007a;
          box-shadow: 0 0 5px rgba(214, 0, 122, 0.5);
        }
        button {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(to right, #d6007a, #ff66b3);
          color: #fff;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
        }
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(214, 0, 122, 0.3);
        }
        .message {
          margin-top: 15px;
          text-align: center;
          font-weight: 600;
          color: green;
        }
        .switch {
          text-align: center;
          margin-top: 15px;
          color: #555;
        }
        .link {
          color: #d6007a;
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

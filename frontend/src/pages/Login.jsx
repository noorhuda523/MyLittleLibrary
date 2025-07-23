import React, { useState } from "react";
import { FaUser, FaLock, FaBookOpen, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import authpic22 from "../assets/authpic22.png";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "", remember: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login submitted!");
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        {/* Left: Login Form */}
        <div className="login-form-section">
          <FaArrowLeft
            style={{ fontSize: "1.5rem", color: "#742a83", cursor: "pointer", marginBottom: "1.2rem" }}
            onClick={() => navigate("/")}
            title="Back to Home"
          />
          <div className="login-brand">
            <FaBookOpen className="librar-icon" />
            <div className="brand-title">
              <span className="brand-nam">My Little</span>
              <span className="liby">Library</span>
            </div>
          </div>
          <h2 className="login-welcome">WELCOME</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label>Username</label>
              <div className="login-input-wrapper">
                <FaUser className="login-icon" />
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your username"
                />
              </div>
            </div>
            <div className="login-field">
              <label>Password</label>
              <div className="login-input-wrapper">
                <FaLock className="login-icon" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="login-options">
              <label className="login-remember">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                Remember
              </label>
              <a href="/forgot-password" className="login-forgot">
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="login-submit">
              SUBMIT
            </button>
          </form>
          <div style={{ marginTop: 18, textAlign: 'center', fontSize: '1rem' }}>
            Don't have an account?{' '}
            <a href="/signup" style={{ color: '#742a83', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>Sign up</a>
          </div>
        </div>
        {/* Right: Illustration */}
        <div className="login-illustration-section">
          <img
            src={authpic22}
            alt="Login Illustration"
            className="login-illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

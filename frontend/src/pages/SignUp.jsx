import React, { useState } from "react";
import { FaUser, FaLock, FaBookOpen, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import authpic40 from "../assets/authpic40.png";
import "./Login.css"; // Same CSS as login for consistency
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setMessage("OTP sent to your email. Please check your inbox.");
        setStep(2);
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  // Step 2: Complete Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    try {
      const res = await fetch("/api/auth/signupuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, otp }),
      });
      const data = await res.json();
      if (data.status === "Success") {
        setMessage("Signup successful! You can now login.");
        setStep(3);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        {/* Left: Signup Form */}
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
          <h2 className="login-welcome">SIGN UP</h2>
          {step === 1 && (
            <form onSubmit={handleSendOtp}>
              <div className="login-field">
                <label>Name</label>
                <div className="login-input-wrapper">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              <div className="login-field">
                <label>Email</label>
                <div className="login-input-wrapper">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="login-field">
                <label>Password</label>
                <div className="login-input-wrapper">
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Create a password"
                  />
                </div>
              </div>
         
              {/* <div className="login-field">
                <label>Role</label>
                <div className="login-input-wrapper">
                  <input
                    type="text"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder="user"
                  />
                </div>
              </div> */}
              <button type="submit" className="login-submit">
                Send OTP
              </button>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleSignup}>
              <div className="login-field">
                <label>OTP</label>
                <div className="login-input-wrapper">
                  <input
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    placeholder="Enter OTP sent to your email"
                  />
                </div>
              </div>
              <button type="submit" className="login-submit">
                Complete Signup
              </button>
            </form>
          )}
          {step === 3 && (
            <div style={{ color: "#4a6cf7", fontWeight: 600, fontSize: 18 }}>
              Signup successful! <a href="/login" style={{ color: "#4a6cf7" }}>Login Now</a>
            </div>
          )}
          {error && <div style={{ color: "#d63031", marginTop: 12 }}>{error}</div>}
          {message && <div style={{ color: "#4a6cf7", marginTop: 12 }}>{message}</div>}
          <div style={{ marginTop: 18, textAlign: 'center', fontSize: '1rem' }}>
            Already have an account?{' '}
            <a href="/login" style={{ color: '#742a83', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>Login</a>
          </div>
        </div>
        {/* Right: Illustration */}
        <div className="login-illustration-section">
          <img
            src={authpic40}
            alt="Signup Illustration"
            className="login-illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;

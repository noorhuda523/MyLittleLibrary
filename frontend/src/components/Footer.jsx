import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaBookOpen } from "react-icons/fa";
import "./Navbar.css";

const Footer = () => (
  <footer style={{
    background: "linear-gradient(90deg, #49034e 0%, #742a83 50%, #9a47a5 100%)",
    color: "#fff",
    padding: "0.5rem 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "2rem"
  }}>
    <div style={{
      width: "90%",
      maxWidth: "1200px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div className="logo-light">
        <FaBookOpen className="library-icon" />
        <div className="brand-title">
          <span className="brand-name">My Little</span>
          <span className="lib">Library</span>
        </div>
      </div>
      
      <div style={{ color: "#fff", fontSize: "1rem" }}>
        Terms of Services
      </div>
      <div style={{ display: "flex", gap: "1.1rem" }}>
        <a href="#" style={{ color: "#fff", fontSize: "1.3rem" }}><FaFacebookF /></a>
        <a href="#" style={{ color: "#fff", fontSize: "1.3rem" }}><FaTwitter /></a>
        <a href="#" style={{ color: "#fff", fontSize: "1.3rem" }}><FaLinkedinIn /></a>
        <a href="#" style={{ color: "#fff", fontSize: "1.3rem" }}><FaInstagram /></a>
      </div>
    </div>
  </footer>
);

export default Footer;

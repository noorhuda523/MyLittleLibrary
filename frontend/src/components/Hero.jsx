import React from "react";
import heroimg from '../assets/hepic.png';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section
      style={{
        background: "#fbeff5",
        color: "#23262F",
        minHeight: "55vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 0 1rem 0",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          maxWidth: "1200px",
        }}
      >
        {/* Left Side */}
        <div style={{ flex: 1, paddingRight: "2rem" }}>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 700, color: "#23262F", marginBottom: "1rem" }}>
            Discover Your Next <br /> Great Read
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#4B4E6D", marginBottom: "2rem" }}>
            Explore a world of captivating stories, expand your knowledge, and find endless inspiration in our handpicked collection of books. Start your next reading adventure with us!
          </p>
          <button
            style={{
              background: "#a97fd6",
              color: "#fff",
              width: "250px",
              padding: "0.8rem",
              border: "none",
              borderRadius: "2rem",
              fontFamily: "new times roman",
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(169,127,214,0.08)",
              transition: "background 0.2s",
              boxSizing: "border-box",
            }}
            onMouseOver={e => (e.target.style.background = '#8d5bbf')}
            onMouseOut={e => (e.target.style.background = '#a97fd6')}
            onClick={() => navigate('/books')}
          >
            Discover Books
          </button>
        </div>
        {/* Right Side - Image */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <img
            src={heroimg}
            alt="Books Illustration"
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "500px",
              maxHeight: "500px",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

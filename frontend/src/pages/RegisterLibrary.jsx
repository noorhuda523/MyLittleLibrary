import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
// import libpic from '../assets/libpic.png'; // Removed direct import
import './RegisterLibrary.css';

const libpicUrl = new URL('../assets/libpic.png', import.meta.url).href; // New import method

const RegisterLibrary = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    libraryname: '',
    location: '',
    // Adding other fields from the model for future use
    registeredBooks: [],
    createdAt: new Date()
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // This is just a placeholder for future API integration
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just show success and redirect
      console.log('Form submitted with data:', formData);
      navigate('/profile');
      
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-library-container">
      <button className="back-button" onClick={() => navigate('/')}>
        <IoArrowBack size={24} />
      </button>
      
      <div className="register-library-content">
        <div className="register-library-image">
          <img src={libpicUrl} alt="Library" /> {/* Updated image source */}
        </div>
        
        <div className="register-library-form">
          <h2>Register Your Library</h2>
          <p className="form-subtitle">Start your journey as a library owner</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="libraryname">Library Name</label>
              <input
                type="text"
                id="libraryname"
                name="libraryname"
                value={formData.libraryname}
                onChange={handleChange}
                required
                placeholder="Enter your library name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Enter library location"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register Library'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterLibrary;

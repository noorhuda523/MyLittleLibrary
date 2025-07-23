import React, { useState } from 'react';
// REMOVED: import Navbar from '../components/Navbar';
// REMOVED: import Footer from '../components/Footer';
// REMOVED: import { SearchProvider } from '../context/SearchContext';
import './Profile.css';
// REMOVED: import { FaUserFriends, MdOutlinePhotoLibrary } from 'react-icons/fa';
import { FaCommentDots } from 'react-icons/fa';
import { FaCamera } from 'react-icons/fa';
import roadbookPic from '../assets/roadbook.jpg'; // Changed to roadbook.jpg

const Profile = () => {
  const [profileImage, setProfileImage] = useState(roadbookPic);

  // Placeholder data - replace with data from your userModel when integrated
  const user = {
    profileImage: profileImage, // Using state for profile image
    name: 'Noor',
    location: 'Gujranwala, Pakistan',
  
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    // REMOVED: <SearchProvider>
    <div className="profile-page-container">
      {/* REMOVED: <Navbar /> */}
      <div className="profile-card">
        <div className="profile-image-container">
          <img src={user.profileImage} alt="Profile" />
          <label htmlFor="profile-image-upload" className="profile-image-overlay">
            <FaCamera size={30} className="camera-icon" />
          </label>
          <input
            type="file"
            id="profile-image-upload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-location">{user.location}</p>
        <button className="profile-action-button message-button-moved">
          <FaCommentDots size={20} /> Message
        </button>
        <p className="profile-bio">{user.bio}</p>
      </div>
      {/* REMOVED: <Footer /> */}
    </div>
    // REMOVED: </SearchProvider>
  );
};

export default Profile; 
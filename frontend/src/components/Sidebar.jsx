import React, { useRef, useEffect, useContext } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaBook, FaExchangeAlt, FaShoppingCart, FaSignOutAlt, FaHandHoldingUsd, FaBuilding } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef(null);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
        toggleSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
      <div className="sidebar-header">
        <FaUserCircle className="sidebar-profile-icon" />
        <span className="sidebar-username">User Name</span> {/* Replace with actual user name */}
      </div>
      <ul className="sidebar-menu">
        <li><Link to="/profile" onClick={toggleSidebar}><FaUserCircle /> My Profile</Link></li>
        <li><Link to="/my-books" onClick={toggleSidebar}><FaBook /> My Books</Link></li>
        <li><Link to="/rent-books" onClick={toggleSidebar}><FaHandHoldingUsd /> Rent Books</Link></li>
        <li><Link to="/swap-books" onClick={toggleSidebar}><FaExchangeAlt /> Swap Books</Link></li>
        <li><Link to="/sale-books" onClick={toggleSidebar}><FaShoppingCart /> Sale Books</Link></li>
        <li><Link to="/register-library" onClick={toggleSidebar}><FaBuilding /> Register Library</Link></li>
        <li className="sidebar-logout"><Link to="#" onClick={() => { logout(); toggleSidebar(); }}><FaSignOutAlt /> Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBookOpen, FaInfoCircle, FaShoppingCart, FaSearch, FaChevronDown, FaUserCircle, FaComments, FaBell } from 'react-icons/fa';
import { SearchContext } from '../context/SearchContext';
import { AuthContext } from '../context/AuthContext';
import Sidebar from './Sidebar';

function Navbar() {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event) => {
      if (
        !event.target.closest('.dropdown') &&
        !event.target.closest('.dropdown-content')
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const { searchType, setSearchType, searchValue, setSearchValue } = useContext(SearchContext);

  const categories = ['fictional', 'Non-fictional', 'science', 'classic', 'history', 'other'];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="navbar-light">
      <div className="logo-light">
        <FaBookOpen className="library-icon" />
        <div className="brand-title">
          <span className="brand-name">My Little</span>
          <span className="lib">Library</span>
        </div>
      </div>
      <ul className="nav-links-light">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            <FaHome className="nav-icon" /> Home
          </Link>
        </li>
        <li className="dropdown">
          <button 
            className={`dropdown-button ${location.pathname.startsWith('/books') ? 'active' : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaBookOpen className="nav-icon" /> Books <FaChevronDown className="dropdown-icon" />
          </button>
          <div className={`dropdown-content ${isDropdownOpen ? 'show-dropdown' : ''}`}>
            {categories.map(category => (
              <Link 
                key={category}
                to={`/books/${category.toLowerCase()}`}
                className="dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            ))}
          </div>
        </li>
        <li>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            <FaInfoCircle className="nav-icon" /> About
          </Link>
        </li>
      </ul>
      <div className="navbar-right">
        <div className="search-bar-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder={`Search ${searchType === 'book' ? 'books' : 'authors'}...`}
            className="search-bar"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
          <select
            className="search-dropdown"
            value={searchType}
            onChange={e => setSearchType(e.target.value)}
          >
            <option value="book">Book</option>
            <option value="author">Author</option>
          </select>
        </div>
        {isAuthenticated ? (
          <>
            <Link 
              to="#" 
              onClick={() => console.log('Chat icon clicked')} 
              style={{ display: 'flex', alignItems: 'center', marginLeft: '0.7rem', color: '#fff' }}
              onMouseOver={e => e.currentTarget.style.color = '#c19dd8'}
              onMouseOut={e => e.currentTarget.style.color = '#fff'}
            >
              <FaComments style={{ fontSize: '1.6rem', color: 'inherit' }} title="Chat" />
            </Link>
            <Link 
              to="#" 
              onClick={() => console.log('Notification icon clicked')} 
              style={{ display: 'flex', alignItems: 'center', marginLeft: '0.7rem', color: '#fff' }}
              onMouseOver={e => e.currentTarget.style.color = '#c19dd8'}
              onMouseOut={e => e.currentTarget.style.color = '#fff'}
            >
              <FaBell style={{ fontSize: '1.6rem', color: 'inherit' }} title="Notifications" />
            </Link>
            <Link 
              to="/cart" 
              style={{ display: 'flex', alignItems: 'center', marginLeft: '0.7rem', color: '#fff' }}
              onMouseOver={e => e.currentTarget.style.color = '#c19dd8'}
              onMouseOut={e => e.currentTarget.style.color = '#fff'}
            >
              <FaShoppingCart style={{ fontSize: '1.6rem', color: 'inherit' }} title="Cart" />
            </Link>
            <Link 
              to="#" 
              onClick={toggleSidebar} 
              style={{ display: 'flex', alignItems: 'center', marginLeft: '0.7rem', color: '#fff' }}
              onMouseOver={e => e.currentTarget.style.color = '#c19dd8'}
              onMouseOut={e => e.currentTarget.style.color = '#fff'}
            >
              <FaUserCircle style={{ fontSize: '1.6rem', color: 'inherit' }} title="Profile" />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login"><button className="nav-btn">Login</button></Link>
            <Link to="/signup"><button className="nav-btn nav-btn-signup">Signup</button></Link>
          </>
        )}
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </nav>
  );
}

export default Navbar;
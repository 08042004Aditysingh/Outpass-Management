// Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Sidebar = () => {
  const {id} = useParams();

  const [hoveredLink, setHoveredLink] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredLink(index);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const sidebarStyle = {
    width: '250px',
    height: '100vh',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '30px 20px', // Added padding for the sidebar content
    position: 'fixed',
    top: '0',
    left: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    transition: 'width 0.3s ease',
  };

  const linkContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px', // Added spacing between links
    marginTop: '20px', // Added margin to create space between heading and links
  };

  const linkStyle = {
    color: '#ecf0f1',
    textDecoration: 'none',
    padding: '12px 10px',
    fontSize: '18px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
  };

  const linkHoverStyle = {
    backgroundColor: '#34495e',
  };

  const footerStyle = {
    fontSize: '14px',
    color: '#95a5a6',
    paddingTop: '20px',
    textAlign: 'center',
  };

  return (
    <div style={sidebarStyle}>
      <nav style={linkContainerStyle}>
         <Link
          to="/">
      <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>Home</h2></Link>
        
        <Link
          to={`/${id}/student-dashboard`}
          style={hoveredLink === 1 ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
        >
          Student Login
        </Link>
        <Link
          to={`/${id}/status`}
          style={hoveredLink === 2 ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
        >
          Status
        </Link>
      </nav>
      <div style={footerStyle}>Pass Management App © 2024</div>
    </div>
  );
};

export default Sidebar;

// Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
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
    padding: '30px 20px',
    position: 'fixed',
    top: '0',
    left: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  };

  const linkContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const linkStyle = {
    color: '#ecf0f1',
    textDecoration: 'none',
    padding: '12px 15px',
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
    borderTop: '1px solid #34495e',
    marginTop: 'auto',
  };

  return (
    <div style={sidebarStyle}>
      <Link to="/"><h2 style={{ marginBottom: '30px' }}>Home</h2></Link>
      <nav style={linkContainerStyle}>
        <Link
          to="/councellor"
          style={hoveredLink === 1 ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
        >
          Councellor
        </Link>
        <Link
          to="/hod"
          style={hoveredLink === 2 ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
        >
          HOD
        </Link>
        <Link
          to="/warden"
          style={hoveredLink === 3 ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={handleMouseLeave}
        >
          Warden
        </Link>
        <Link
          to="/jointdirector"
          style={hoveredLink === 4 ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
          onMouseEnter={() => handleMouseEnter(4)}
          onMouseLeave={handleMouseLeave}
        >
          Joint Director
        </Link>
      </nav>
      <div style={footerStyle}>Pass Management App © 2024</div>
    </div>
  );
};

export default Sidebar;

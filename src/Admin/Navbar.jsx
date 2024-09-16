// Navbar.jsx
import React from 'react';

const Navbar = ({ username, role }) => {
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position:'fixed',
    top:'0',
    width:'100%',
  };

  const profileStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const usernameStyle = {
    marginLeft: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
  };

  const imgStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid #fff',
  };

  return (
    <div style={navbarStyle}>
      <div style={profileStyle}>
        <span style={usernameStyle}>{`Welcome ${username}!`}</span>
      <span style={usernameStyle}>{role}</span>
      </div>
    </div>
  );
};

export default Navbar;

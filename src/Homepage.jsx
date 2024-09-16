import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const boxStyle = {
    display: 'inline-block',
    width: '200px',
    height: '100px',
    margin: '20px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    lineHeight: '100px',
    fontSize: '20px',
    cursor: 'pointer',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  };

  const handleHover = (e, isHovering) => {
    e.target.style.backgroundColor = isHovering ? '#ddd' : '#f0f0f0';
  };

  return (<>
  <img src="src/AIT.png" alt="" style={{marginLeft:'20rem'}}/>
  <div><h1>Leave and Outpass Management App</h1></div>
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <div
        style={boxStyle}
        onClick={() => navigate('/s_login')}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        Student Login
      </div>
      <div
        style={boxStyle}
        onClick={() => navigate('/a_login')}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        Admin Login
      </div>
    </div>
    </>
  );
};
export default HomePage
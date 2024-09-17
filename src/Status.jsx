import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar'; // Import Sidebar
import Navbar from './Admin/Navbar';
import { useParams } from 'react-router-dom'; // Import useParams

const Status = () => {
  const [outpassData, setOutpassData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Fetch Outpass Data
    const fetchOutpassData = async () => {
      try {
        const response = await fetch('http://localhost:5000/outpass');
        const data = await response.json();
        setOutpassData(data);
      } catch (error) {
        console.error('Error fetching outpass data:', error);
      }
    };

    // Fetch Leave Data
    const fetchLeaveData = async () => {
      try {
        const response = await fetch('http://localhost:5000/leave');
        const data = await response.json();
        setLeaveData(data);
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    };

    fetchOutpassData();
    fetchLeaveData();
  }, []);

  // Container styling
  const containerStyle = {
    marginLeft: '', // Space after the sidebar
    padding: '20px',
    maxWidth: '70vw',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    width:'100vw'
  };

  // Common table styles
  const tableContainerStyle = {
    overflowX: 'auto', // Ensures responsiveness for smaller screens
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '30px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow
  };

  const thStyle = {
    borderBottom: '2px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#007BFF', // Blue header background
    color: '#fff',
    fontSize: '16px',
  };

  const tdStyle = {
    borderBottom: '1px solid #ddd',
    padding: '12px',
    fontSize: '15px',
    color: '#333',
  };

  // Alternating row color: Blue and white for better readability
  const trBlueStyle = {
    backgroundColor: '#007BFF', // Blue row
    color: '#fff',
  };

  const trWhiteStyle = {
    backgroundColor: '#ffffff', // White row
  };

  const trHoverStyle = {
    backgroundColor: '#f1f1f1',
    cursor: 'pointer',
  };

  // Responsive table heading
  const h2Style = {
    fontSize: '26px',
    color: '#333',
    borderBottom: '2px solid #4CAF50',
    paddingBottom: '10px',
    marginBottom: '20px',
  };

  const h3Style = {
    fontSize: '22px',
    color: '#4CAF50',
    margin: '20px 0 10px 0',
  };

  return (
    <div>
      <Navbar username={`${id}`} />
      <Sidebar />
      <div style={containerStyle}>
        <h2 style={h2Style}>Outpass and Leave Status</h2>

        {/* Outpass Table */}
        <h3 style={h3Style}>Outpass Status</h3>
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Councellor</th>
                <th style={thStyle}>Branch</th>
                <th style={thStyle}>Reason</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {outpassData.map((row, index) => (
                <tr
                  key={index}
                  style={index % 2 === 0 ? trBlueStyle : trWhiteStyle}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? '#00fbff' : '#ffffff')
                  }
                >
                  <td style={tdStyle}>{row.date}</td>
                  
                  <td style={tdStyle}>{row.counselor}</td>
                  <td style={tdStyle}>{row.branch}</td>
                  <td style={tdStyle}>{row.reason}</td>
                  <td style={tdStyle}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Leave Table */}
        <h3 style={h3Style}>Leave Status</h3>
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Start Date</th>
                <th style={thStyle}>End Date</th>
                <th style={thStyle}>Councellor</th>
                <th style={thStyle}>Branch</th>
                <th style={thStyle}>Reason</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.map((row, index) => (
                <tr
                  key={index}
                  style={index % 2 === 0 ? trBlueStyle : trWhiteStyle}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? '#00fbff' : '#ffffff')
                  }
                >
                  <td style={tdStyle}>{row._id}</td>
                  <td style={tdStyle}>{row.endDate}</td>
                  <td style={tdStyle}>{row.counselor}</td>
                  <td style={tdStyle}>{row.branch}</td>
                  <td style={tdStyle}>{row.reason}</td>
                  <td style={tdStyle}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Status;

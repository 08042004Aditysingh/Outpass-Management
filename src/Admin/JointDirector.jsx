import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
const JD = () => {
  const navigate = useNavigate();
  const [emailData, setEmailData] = useState({})
  const {id} = useParams();
  const [leaveData, setLeaveData] = useState([]);
  const [outpassData, setOutpassData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/jointdirectorl")
      .then((response) => {
        setLeaveData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leave data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/jointdirectorop")
      .then((response) => {
        setOutpassData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching outpass data:", error);
      });
  }, []);

  const sendEmailopA = (row) => {
    window.location.reload();
    
    setEmailData({
      name: id,
      email: 'priyaju265@gmail.com',
      message: `Dear ${row.name}, your request for outpass has been ACCEPTED by the Joint Director on date ${row.date}`,
      
    })

    emailjs.send('service_aozwngw', 'template_5rd1m6e', emailData, '2pr-_qVYhjxZJbuwF')
      .then((response) => {
        console.log('Email successfully sent!', response.status, response.text);
        alert('Email sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send the email.');
      });
  };

  const sendEmailopR = (row) => {
    window.location.reload();
    
    setEmailData({
      name: id,
      email: 'priyaju265@gmail.com',
      message: `Dear ${row.name}, your request for outpass has been REJECTED by the Joint Director on date ${row.date}`,
      
    })

    emailjs.send('service_aozwngw', 'template_5rd1m6e', emailData, '2pr-_qVYhjxZJbuwF')
      .then((response) => {
        console.log('Email successfully sent!', response.status, response.text);
        alert('Email sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send the email.');
      });
  };
  
  const sendEmailA = (row) => {
    window.location.reload();
    
    setEmailData({
      name: id,
      email: 'priyaju265@gmail.com',
      message: `Dear ${row.name}, your request for leave has been ACCEPTED by the Joint Director from date ${row.startDate} to ${row.endDate}`,
      
    })

    emailjs.send('service_aozwngw', 'template_5rd1m6e', emailData, '2pr-_qVYhjxZJbuwF')
      .then((response) => {
        console.log('Email successfully sent!', response.status, response.text);
        alert('Email sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send the email.');
      });
  };

  const sendEmailR = (row) => {
    window.location.reload();
    
    setEmailData({
      name: id,
      email: 'priyaju265@gmail.com',
      message: `Dear ${row.name}, your request for leave has been REJECTED by the Joint Director from date ${row.startDate} to ${row.endDate}`,
      
    })

    emailjs.send('service_aozwngw', 'template_5rd1m6e', emailData, '2pr-_qVYhjxZJbuwF')
      .then((response) => {
        console.log('Email successfully sent!', response.status, response.text);
        alert('Email sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send the email.');
      });
  };
  
  const handleAcceptOp = async (row) => {
  
    await axios.delete(`http://localhost:5000/jointdirectorop/${row._id}`);
    await axios.put(`http://localhost:5000/outpass/${row._id}`, {
      name: row.name,
      regNo: "22183",
      status: "Approved by Joint Director",
      reason: row.reason,
      date: row.date,
      branch: row.branch,
      hostel: row.hostel,
      councelor: "Mrs. Nikita Singhal",
    });
  };
  const handleRejectOp = async (row) => {
  
    await axios.delete(`http://localhost:5000/jointdirectorop/${row._id}`);
    await axios.put(`http://localhost:5000/outpass/${row._id}`, {
      name: row.name,
      regNo: "22183",
      status: "Rejected by Joint Director",
      reason: row.reason,
      date: row.date,
      branch: row.branch,
      hostel: row.hostel,
      councelor: "Mrs. Nikita Singhal",
    });
  };

  const handleAccept = async (row) => {
   
    await axios
      .delete(`http://localhost:5000/jointdirectorl/${row._id}`)
      .then((response) => {
        console.log(response.data);
      });
      
      await axios
      .put(`http://localhost:5000/leave/${row._id}`, {
        name: row.name,
        regNo: "22183",
        status: "Approved by Joint Director",
        reason: row.reason,
        startDate: row.startDate,
        endDate: row.endDate,
        branch: row.branch,
        hostel: row.hostel,
        councelor: "Mrs. Nikita Singhal",
      })
      .then((response) => {
        console.log(response.data);
      });
  };
  const handleReject = async (row) => {
    
    await axios
      .delete(`http://localhost:5000/jointdirectorl/${row._id}`)
      .then((response) => {
        console.log(response.data);
      });
      await axios.put(`http://localhost:5000/leave/${row._id}`, {
        name: row.name,
        regNo: "22183",
        status: "Rejected by Joint Director",
        reason: row.reason,
        startDate: row.startDate,
        endDate: row.endDate,
        branch: row.branch,
        hostel: row.hostel,
        councelor: "Mrs. Nikita Singhal",
      });
      
  };
  const containerStyle = {
    padding: "20px",
    // marginLeft: '250px',
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    width: "75vw",
  };

  const headingStyle = {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#2c3e50",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "30px",
  };

  const thStyle = {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#2c3e50",
    color: "#fff",
    fontSize: "18px",
  };

  const tdStyle = {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#fff",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    color: "#fff",
    marginRight: "10px",
    outline: "none",
  };

  const acceptButtonStyle = {
    backgroundColor: "#4CAF50", // Green
  };

  const rejectButtonStyle = {
    backgroundColor: "#e74c3c", // Red
  };

  // Separate leave and outpass data
  const leaveRequests = [
    { name: "John Doe", type: "Leave", reason: "Medical Leave" },
  ];

  const outpassRequests = [
    { name: "Jane Smith", type: "Outpass", reason: "Family Function" },
  ];

  return (
    <div>
      {/* <Sidebar /> */}
      <div style={containerStyle}>
        <h2 style={headingStyle}>Joint Director Dashboard</h2>

        {/* Leave Requests Table */}
        <h3 style={headingStyle}>Leave Requests</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Student Name</th>
              <th style={thStyle}>Reason</th>
              <th style={thStyle}>Leave Starts</th>
              <th style={thStyle}>Leave Ends</th>
              <th style={thStyle}>Attendence</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.map((row, index) => (
              <tr key={index}>
                <td style={tdStyle}>{row.name}</td>
                <td style={tdStyle}>{row.reason}</td>
                <td style={tdStyle}>{row.startDate}</td>
                <td style={tdStyle}>{row.endDate}</td>
                <td style={tdStyle}>{`${Math.floor(Math.random() * (95 - 50 + 1)) + 50}%`}</td>
                

                <td style={tdStyle}>
                  <button
                    style={{ ...buttonStyle, ...acceptButtonStyle }}
                    onClick={(e) => {
                      handleAccept(row);
                      sendEmailA(row);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    style={{ ...buttonStyle, ...rejectButtonStyle }}
                    onClick={(e) => {
                      handleReject(row);
                      sendEmailR(row);
                    }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Outpass Requests Table */}
        <h3 style={headingStyle}>Outpass Requests</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Student Name</th>

              <th style={thStyle}>Reason</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Attendence</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {outpassData.map((row, index) => (
              <tr key={index}>
                <td style={tdStyle}>{row.name}</td>
                <td style={tdStyle}>{row.reason}</td>
                <td style={tdStyle}>{row.date}</td>
                <td style={tdStyle}>{`${Math.floor(Math.random() * (95 - 50 + 1)) + 50}%`}</td>
                <td style={tdStyle}>
                  <button
                    style={{ ...buttonStyle, ...acceptButtonStyle }}
                    onClick={(e) => {
                      handleAcceptOp(row);
                      sendEmailopA(row);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    style={{ ...buttonStyle, ...rejectButtonStyle }}
                    onClick={(e) => {
                      handleRejectOp(row);
                      sendEmailopR(row);
                    }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JD;

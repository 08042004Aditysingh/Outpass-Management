import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Warden = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [leaveData, setLeaveData] = useState([]);
  const [outpassData, setOutpassData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/wardenl")
      .then((response) => {
        setLeaveData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leave data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/wardenop")
      .then((response) => {
        setOutpassData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching outpass data:", error);
      });
  }, []);
  const handleRejectop = async (row) => {
    window.location.reload();
    await axios
      .delete(`http://localhost:5000/wardenop/${row._id}`)
      .then((response) => {
        console.log(response.data);
      });

    await axios.put(`http://localhost:5000/outpass/${row._id}`, {
      name: row.name,
      regNo: "22183",
      status: "Rejected",
      reason: row.reason,
      startDate: row.startDate,
      endDate: row.endDate,
      branch: row.branch,
      hostel: row.hostel,
      councelor: "Mrs. Nikita Singhal",
    });
  };

  const handleReject = async (row) => {
    window.location.reload();
    await axios
      .delete(`http://localhost:5000/wardenl/${row._id}`)
      .then((response) => {
        console.log(response.data);
      });

    await axios.put(`http://localhost:5000/leave/${row._id}`, {
      name: row.name,
      regNo: "22183",
      status: "Rejected",
      reason: row.reason,
      startDate: row.startDate,
      endDate: row.endDate,
      branch: row.branch,
      hostel: row.hostel,
      councelor: "Mrs. Nikita Singhal",
    });
  };
  const handleForwardL = async (row) => {
    alert(`Forwarded ${row.name}'s request to Joint Director`);
    window.location.reload();
    // await axios.delete(`http://localhost:5000/wardenl/${row._id}`);

    await axios
      .post(
        "http://localhost:5000/jointdirectorl",
        {
          name: row.name,
          reason: row.reason,
          status: row.status,
          hostel: row.hostel,
          branch: row.branch,
          startDate: row.startDate,
          endDate: row.endDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(
          "Error forwarding data:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const handleForwardop = async(row) => {
    alert(`Forwarded ${row.name}'s request to Joint Director`);
    window.location.reload();
    // await axios.delete(`http://localhost:5000/wardenop/${row._id}`);

    await axios
      .post(
        "http://localhost:5000/jointdirectorop",
        {
          name: row.name,
          reason: row.reason,
          status: row.status,
          hostel: row.hostel,
          branch: row.branch,
          date: row.date,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(
          "Error forwarding data:",
          error.response ? error.response.data : error.message
        );
      });
  };
  const containerStyle = {
    padding: "20px",
    // marginLeft: '250px',
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    width: "70vw",
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
    marginRight: "10px",
    color: "#fff",
  };

  const acceptButtonStyle = {
    backgroundColor: "#4CAF50", // Green
  };

  const rejectButtonStyle = {
    backgroundColor: "#e74c3c", // Red
  };

  const forwardButtonStyle = {
    backgroundColor: "#3498db", // Blue
    marginRight: "0", // Remove margin-right for forward button
  };



  return (
    <div>
      {/* <Sidebar /> */}
      <div style={containerStyle}>
        <h2 style={headingStyle}>Warden Dashboard</h2>

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
                  <button style={{ ...buttonStyle, ...acceptButtonStyle }}>
                    Accept
                  </button>
                  <button
                    style={{ ...buttonStyle, ...rejectButtonStyle }}
                    onClick={(e) => {
                      handleReject(row);
                    }}
                  >
                    Reject
                  </button>
                  <button
                    style={{ ...buttonStyle, ...forwardButtonStyle }}
                    onClick={(e) => {
                      handleForwardL(row);
                    }}
                  >
                    Forward to Joint Director
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
                  <button style={{ ...buttonStyle, ...acceptButtonStyle }}>
                    Accept
                  </button>
                  <button
                    style={{ ...buttonStyle, ...rejectButtonStyle }}
                    onClick={(e) => {
                      handleRejectop(row);
                    }}
                  >
                    Reject
                  </button>
                  <button
                    style={{ ...buttonStyle, ...forwardButtonStyle }}
                    onClick={(e) => {
                      handleForwardop(row);
                    }}
                  >
                    Forward to Joint Director
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

export default Warden;

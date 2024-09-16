import React,{useEffect,useState} from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com'
const Councellor = () => {

  const [emailData, setEmailData] = useState({
    name: '',
    email: '',
    message: '',
  });



  const sendEmail = (row) => {
    
    setEmailData({
      name: row.name,
      email: 'priyaju265@gmail.com',
      message: `Dear Sir, Please approve the leave request of ${row.name}.`,
      
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

  const {id} = useParams();
  const navigate = useNavigate();
  const [leaveData, setLeaveData] = useState([]);
  const [outpassData, setOutpassData] = useState([]);
  useEffect(() => {
     axios.get('http://localhost:5000/leave')
      .then((response) => {
        setLeaveData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching leave data:', error);
      });
  }, []);

  useEffect(() => {
     axios.get('http://localhost:5000/outpass')
      .then((response) => {
        setOutpassData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching outpass data:', error);
      });
  }, []);

  

  const handleForwardl=async(row)=>{
    alert(`Forwarded ${row.name}'s request to HOD of branch${row.branch}`);

    await axios.post('http://localhost:5000/hodl', { name: row.name, reason: row.reason, status: row.status, hostel:row.hostel, branch: row.branch,startDate:row.startDate, endDate:row.endDate }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error('Error forwarding data:', error.response ? error.response.data : error.message);
    });
    
    
  }
  const handleForwardop=async(row)=>{
    alert(`Forwarded ${row.name}'s request to HOD`);

   await axios.post('http://localhost:5000/hodop', { name: row.name, reason: row.reason, status: row.status, hostel:row.hostel, branch: row.branch,date:row.date }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error('Error forwarding data:', error.response ? error.response.data : error.message);
    });
    
    
  }

  const handleRejectop = async (row) => {
  

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

  const containerStyle = {
    padding: '20px',
    // marginLeft: '250px',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
    width:'70vw'
  };

  const headingStyle = {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#2c3e50',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '30px',
  };

  const thStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#2c3e50',
    color: '#fff',
    fontSize: '18px',
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#fff',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    marginRight: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const acceptButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#4CAF50',
    color: '#fff',
  };

  const rejectButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#e74c3c',
    color: '#fff',
  };

  const forwardButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#3498db',
    color: '#fff',
  };

  // const leaveRequests = [
  //   { name: 'John Doe', type: 'Leave', reason: 'Medical Leave' },
  // ];

  // const outpassRequests = [
  //   { name: 'Jane Smith', type: 'Outpass', reason: 'Family Function' },
  // ];

  return (
    <div>
      {/* <Sidebar /> */}
      <div><Navbar username={`Mr. ${id}`}/></div>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Counsellor Dashboard</h2>

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
              <th style={thStyle}>Forward</th>
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
                  <button style={acceptButtonStyle} >Accept</button>
                  <button style={rejectButtonStyle}  onClick={(e)=>{handleReject(row)}}>Reject</button>
                </td>
                <td style={tdStyle}>
                  <button style={forwardButtonStyle} onClick={(e)=>{handleForwardl(row);}}>Forward</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={headingStyle}>Outpass Requests</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Student Name</th>
              <th style={thStyle}>Reason</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Attendence</th>
              <th style={thStyle}>Actions</th>
              <th style={thStyle}>Forward</th>
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
                  <button style={acceptButtonStyle} >Accept</button>
                  <button style={rejectButtonStyle} onClick={(e)=>{handleRejectop(row)}}>Reject</button>
                </td>
                <td style={tdStyle}>
                  <button style={forwardButtonStyle} onClick={(e)=>{handleForwardop(row); sendEmail(row)}}>Forward</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Councellor;

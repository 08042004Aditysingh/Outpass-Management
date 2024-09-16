// App.js
import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentLogin from './StudentLogin';
import Status from './Status';
import HomePage from './Homepage';
import Councellor from './Admin/Councellor.jsx';
import Hod from './Admin/Hod';
import Warden from './Admin/Warden';
import JD from './Admin/JointDirector.jsx';
import Login from './Login.jsx';
import AdminLogin from './Admin/AdminLogin.jsx';

function App() {
  const [role,setRole] = useState("")
  const [name, setName] = useState("")
  // Dummy Outpass Data for the Status Page
  const outpassData = [
    { startDate: '2024-09-01', endDate: '2024-09-02', status: 'Pending' },
    { startDate: '2024-09-03', endDate: '2024-09-04', status: 'Approved' },
    { startDate: '2024-09-05', endDate: '2024-09-06', status: 'Rejected' },
  ];

  // Ensuring content area adjusts based on sidebar width
  const containerStyle = {
    marginLeft: '250px', // Matches the sidebar width
    padding: '20px',
  };

  return (
    <Router>
      <div style={containerStyle}>
        <Routes>
           <Route path="/" element={<HomePage />} />
          <Route path="/:id/student-dashboard" element={<StudentLogin />} />
          <Route path="/:id/status" element={<Status outpassData={outpassData} />} />
          <Route path=":id/councellor" element={<Councellor role={role} name={name}/>} />

            <Route path="/:id/hod" element={<Hod/>} />
            <Route path="/:id/warden" element={<Warden/>} />
            <Route path="/:id/jointdirector" element={<JD/>}/>
            <Route path="s_login" element = {<Login />}/>
            <Route path = "a_login" element={<AdminLogin role={role} name={name}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

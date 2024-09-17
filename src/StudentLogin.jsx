import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar"; // Import Sidebar
import axios from "axios"; // Import axios
import { useParams } from "react-router-dom";
import Navbar from "./Admin/Navbar";

const StudentLogin = () => {
  const { id } = useParams();
  const [option, setOption] = useState("leave");
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    date: "",
    startDate: "",
    endDate: "",
    counselor: "",
    reason: "",
    branch: "",
    hostel: "",
    status: "Pending",
  });

  // Define counselor mapping for each branch
  const counselorMapping = {
    COMP: ["Rushali Patil", "Sushma Shirke", "Umakant Dhatrak", "M B Lonare", "Aarti Gangshetty", "Nikita Singhal", "Yogita Hambir", "NK Bansode", "Kuldeep Hule"],
    IT: ["Rupali Bagate","Vaishali Ingale","Rahul Desai", "Yuvraj Gholap", "Kavita", "Hudedamani", "Dipika Birari", "Sandeep Samleti", "Sangeeta Jadhav"],
    ENTC: ["Rajshree Suryawanshi", "Sandeep Bidwai", "Shilpa Pawar", "Girish Kapse", "Renuka Bhandari", "Vijay Karra", "Pragati Rana", "JB Jawale", "Komal Gill"],
    MECH: ["RS Verma", "VR Kulkarni", "JD Patil","PM Purohit", "PV Dorlikar","RB Gurav", "YV Patel", "UV Awsarmol", "SM Gaikwad", "LD Jathar"],
  };

  // State to hold the list of counselors based on selected branch
  const [availableCounselors, setAvailableCounselors] = useState([]);

  // Update available counselors when branch changes
  useEffect(() => {
    if (formData.branch) {
      setAvailableCounselors(counselorMapping[formData.branch] || []);
      setFormData((prevData) => ({
        ...prevData,
        counselor: "", // Reset counselor selection when branch changes
      }));
    } else {
      setAvailableCounselors([]);
      setFormData((prevData) => ({
        ...prevData,
        counselor: "",
      }));
    }
  }, [formData.branch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClick=async()=>{
    const url = 
    option === "leave"
      ? "http://localhost:5000/councellorl"
      : "http://localhost:5000/councellorop";
    const requestBody =
      option === "leave"
        ? {
            name: formData.name,
            reason: formData.reason,
            status: formData.status,
            branch: formData.branch,
            hostel: formData.hostel,
            startDate: formData.startDate,
            endDate: formData.endDate,
          }
        : {
            name: formData.name,
            reason: formData.reason,
            status: formData.status,
            branch: formData.branch,
            hostel: formData.hostel,
            date: formData.date,
        };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      option === "leave"
        ? "http://localhost:5000/leave"
        : "http://localhost:5000/outpass";
    const requestBody =
      option === "leave"
        ? {
            name: formData.name,
            regNo: formData.regNo,
            startDate: formData.startDate,
            endDate: formData.endDate,
            counselor: formData.counselor,
            status: formData.status,
            reason: formData.reason,
            branch: formData.branch,
            hostel: formData.hostel,
          }
        : {
            name: formData.name,
            regNo: formData.regNo,
            date: formData.date,
            counselor: formData.counselor,
            status: formData.status,
            reason: formData.reason,
            branch: formData.branch,
            hostel: formData.hostel,
          };

    try {
      const response = await axios.post(url, requestBody);
      if (response.status === 200 || response.status === 201) {
        alert("Form submitted successfully!");
        // Optionally, reset the form here
        setFormData({
          name: "",
          regNo: "",
          date: "",
          startDate: "",
          endDate: "",
          counselor: "",
          reason: "",
          branch: "",
          hostel: "",
          status: "Pending",
        });
        setOption("leave");
      } else {
        alert("Error submitting form.");
        console.error("Error Response:", response.data);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error submitting form.");
    }


    
  };

  const containerStyle = {
    marginLeft: "300px",
    padding: "40px",
    maxWidth: "700px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    fontSize: "28px",
    color: "#333",
    borderBottom: "3px solid #4CAF50",
    paddingBottom: "10px",
    marginBottom: "20px",
  };

  const labelStyle = {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "5px",
    display: "block",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "15px",
  };

  const selectStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "15px",
  };

  const textareaStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minHeight: "120px",
    fontSize: "15px",
  };

  const buttonStyle = {
    padding: "14px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    width: "100%",
  };

  const formWrapperStyle = {
    marginBottom: "15px",
  };

  return (
    <div>
      <Navbar username={`${id}`} />
      <Sidebar />
      <div style={containerStyle}>
        <h2 style={headingStyle}>
          {option === "leave"
            ? "Leave Application Form"
            : "Outpass Application Form"}
        </h2>

        <div style={formWrapperStyle}>
          <label style={labelStyle}>Select Option: </label>
          <select
            onChange={(e) => setOption(e.target.value)}
            value={option}
            style={selectStyle}
          >
            <option value="leave">Leave</option>
            <option value="outpass">Outpass</option>
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={formWrapperStyle}>
            <label style={labelStyle}>Name: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={formWrapperStyle}>
            <label style={labelStyle}>Registration No: </label>
            <input
              type="text"
              name="regNo"
              value={formData.regNo}
              onChange={handleInputChange}
              required
              style={inputStyle}
            />
          </div>

          {option === "outpass" && (
            <>
              <div style={formWrapperStyle}>
                <label style={labelStyle}>Date: </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={formWrapperStyle}>
                <label style={labelStyle}>Counselor Name: </label>
                <select
                  name="counselor"
                  value={formData.counselor}
                  onChange={handleInputChange}
                  required
                  style={selectStyle}
                  disabled={!formData.branch}
                >
                  <option value="">
                    {formData.branch
                      ? "Select Counselor"
                      : "Select Branch First"}
                  </option>
                  {availableCounselors.map((counselor, index) => (
                    <option key={index} value={counselor}>
                      {counselor}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {option === "leave" && (
            <>
              <div style={formWrapperStyle}>
                <label style={labelStyle}>Start Date: </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={formWrapperStyle}>
                <label style={labelStyle}>End Date: </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={formWrapperStyle}>
                <label style={labelStyle}>Counselor Name: </label>
                <select
                  name="counselor"
                  value={formData.counselor}
                  onChange={handleInputChange}
                  required
                  style={selectStyle}
                  disabled={!formData.branch}
                >
                  <option value="">
                    {formData.branch
                      ? "Select Counselor"
                      : "Select Branch First"}
                  </option>
                  {availableCounselors.map((counselor, index) => (
                    <option key={index} value={counselor}>
                      {counselor}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div style={formWrapperStyle}>
            <label style={labelStyle}>Reason: </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              required
              style={textareaStyle}
            />
          </div>

          <div style={formWrapperStyle}>
            <label style={labelStyle}>Branch: </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              required
              style={selectStyle}
            >
              <option value="">Select Branch</option>
              <option value="COMP">COMP</option>
              <option value="IT">IT</option>
              <option value="ENTC">ENTC</option>
              <option value="MECH">MECH</option>
            </select>
          </div>

          <div style={formWrapperStyle}>
            <label style={labelStyle}>Hostel: </label>
            <select
              name="hostel"
              value={formData.hostel}
              onChange={handleInputChange}
              required
              style={selectStyle}
            >
              <option value="">Select Hostel</option>
              <option value="OBH">OBH</option>
              <option value="Vishweshwariya">Vishweshwariya</option>
              <option value="Girls Hostel">Girls Hostel</option>
            </select>
          </div>

          <button type="submit" style={buttonStyle}>
            Submit
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default StudentLogin
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate

const TeacherDashboard = () => {
  const [sections, setSections] = useState(['A', 'B', 'C']); // Example sections
  const [selectedSection, setSelectedSection] = useState('');
  const [students, setStudents] = useState([]);

  const navigate = useNavigate(); // Initialize the navigate function

  const fetchStudents = async (section) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/students/view/${section}`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSectionChange = (e) => {
    const section = e.target.value;
    setSelectedSection(section);
    fetchStudents(section);
  };

  const handleNavigate = () => {
    navigate('/mark-attendance'); // Programmatic navigation to the attendance page
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>
      <div className="mb-4">
        <label htmlFor="section" className="block mb-2">Select Section:</label>
        <select id="section" onChange={handleSectionChange} className="p-2 border rounded">
          <option value="">--Select a section--</option>
          {sections.map((section) => (
            <option key={section} value={section}>{section}</option>
          ))}
        </select>
      </div>
      {students.length === 0 && (
        <p>No students in this section.</p>
      )}
      {students.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Students in Section {selectedSection}</h2>
          <ul className="list-disc pl-5">
            {students.map((student) => (
              <li key={student._id} className="mb-2">
                {student.name} - {student.email}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button 
        onClick={handleNavigate} // Attach the navigate function to a button click
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Mark Attendance
      </button>
    </div>
  );
};

export default TeacherDashboard;

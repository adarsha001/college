import React, { useState, useEffect } from 'react';

const AttendanceMarking = () => {
  const [classSection, setClassSection] = useState('A'); // Default to class 'A'
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({}); // To store attendance status for each student
  const [date, setDate] = useState('');

  // Fetch students from a particular class
  const fetchStudents = async (section) => {
    try {
      const response = await fetch(`hhttp://localhost:5000/api/students/view/${section}`);
      const data = await response.json();
      if (response.ok) {
        setStudents(data);
        initializeAttendanceData(data); // Initialize attendance state for each student
      } else {
        console.error('Error fetching students:', data.message);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Initialize attendance data with all students marked absent initially
  const initializeAttendanceData = (students) => {
    const attendance = {};
    students.forEach(student => {
      attendance[student._id] = { isPresent: false }; // Each student marked as absent initially
    });
    setAttendanceData(attendance);
  };

  // Handle attendance change for a specific student
  const handleAttendanceChange = (studentId, isPresent) => {
    setAttendanceData(prevData => ({
      ...prevData,
      [studentId]: { isPresent }
    }));
  };

  // Submit attendance for all students
  const submitAttendance = async () => {
    const attendanceRecords = students.map(student => ({
      studentId: student._id,
      isPresent: attendanceData[student._id].isPresent,
    }));

    try {
      const response = await fetch('http://localhost:5000/api/attendence/mark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classSection,
          date,
          attendanceRecords,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Attendance marked successfully:', data);
      } else {
        console.error('Error marking attendance:', data.message);
      }
    } catch (error) {
      console.error('Error submitting attendance:', error);
    }
  };

  // Fetch students whenever the selected class/section changes
  useEffect(() => {
    if (classSection) {
      fetchStudents(classSection);
    }
  }, [classSection]);

  return (
    <div>
      <h2>Mark Attendance</h2>

      {/* Select class/section */}
      <select value={classSection} onChange={(e) => setClassSection(e.target.value)}>
        <option value="A">Class A</option>
        <option value="B">Class B</option>
        <option value="C">Class C</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Select date"
      />

      {/* List students for marking attendance */}
      {students.map((student) => (
        <div key={student._id}>
          <h3>{student.name} ({student.usn})</h3>
          <label>
            Present:
            <input
              type="checkbox"
              checked={attendanceData[student._id]?.isPresent || false}
              onChange={(e) => handleAttendanceChange(student._id, e.target.checked)}
            />
          </label>
        </div>
      ))}

      <button onClick={submitAttendance}>Submit Attendance</button>
    </div>
  );
};

export default AttendanceMarking;

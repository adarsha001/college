import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MarkAttendance = () => {
  const [sections, setSections] = useState(['A', 'B', 'C']); // Example sections
  const [selectedSection, setSelectedSection] = useState(''); // State for selected section
  const [students, setStudents] = useState([]); // State for students
  const [attendanceData, setAttendanceData] = useState([]); // State for attendance data
  const [subjects, setSubjects] = useState([]); // State for subjects
  const [selectedSubject, setSelectedSubject] = useState(''); // State for selected subject

  // Fetch subjects when the component loads
  useEffect(() => {
    const fetchSubjects = async () => {
      const token = localStorage.getItem('token'); // Fetch JWT token from local storage
    
      try {
        const response = await axios.get('http://localhost:5000/api/users/subjects', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the headers
          },
        });
        console.log('Subjects fetched:', response.data); // Log the response data
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    
    fetchSubjects();
  }, []);
  
  // Fetch students based on selected section
  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedSection) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/students/view/${selectedSection}`);
        setStudents(response.data);
        setAttendanceData(
          response.data.map((student) => ({
            studentId: student._id,
            isPresent: false, // Default attendance value is false (Absent)
          }))
        );
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [selectedSection]);

  // Handle attendance change for a student
  const handleAttendanceChange = (studentId, isPresent) => {
    setAttendanceData((prevState) =>
      prevState.map((record) =>
        record.studentId === studentId
          ? { ...record, isPresent }
          : record
      )
    );
  };

  // Handle attendance form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Fetch JWT token from local storage

    try {
      const response = await axios.put(
        'http://localhost:5000/api/attendance/mark-attendance',
        {
          section: selectedSection,
          periodName: selectedSubject, // Use the selected subject for period name
          attendanceData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        }
      );

      if (response.status === 200) {
        alert('Attendance marked successfully');
      }
    } catch (error) {
      console.error('Error submitting attendance:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6">Mark Attendance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Section</label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="">Select Section</option>
            {sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Subject (Period)</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <label className="mr-4">
                      <input
                        type="radio"
                        name={`attendance_${student._id}`}
                        value="present"
                        onChange={() => handleAttendanceChange(student._id, true)}
                        className="mr-1"
                      />
                      Present
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`attendance_${student._id}`}
                        value="absent"
                        onChange={() => handleAttendanceChange(student._id, false)}
                        className="mr-1"
                      />
                      Absent
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200">Submit Attendance</button>
      </form>
    </div>
  );
};

export default MarkAttendance;

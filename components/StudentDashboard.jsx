import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/Authcontext';

const StudentDashboard = () => {
  const { user } = useUserContext(); // Assuming user context has user info
  const [attendance, setAttendance] = useState(null);

  // Fetch the student's attendance when the component mounts
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attendance/attendance', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          },
        });
        setAttendance(response.data);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Your Attendance</h1>

      {attendance ? (
        <div>
          {attendance.attendanceRecords.map((record, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 rounded">
              <h2 className="text-xl font-semibold">
                Date: {new Date(record.date).toLocaleDateString()}
              </h2>
              <table className="min-w-full border-collapse border border-gray-200 mt-4">
                <thead>
                  <tr>
                    <th className="border border-gray-200 p-4">Period</th>
                    <th className="border border-gray-200 p-4">Present</th>
                    <th className="border border-gray-200 p-4">Marked By</th>
                    <th className="border border-gray-200 p-4">Time Marked</th>
                  </tr>
                </thead>
                <tbody>
                  {record.periods.map((period, pIndex) => (
                    <tr key={pIndex}>
                      <td className="border border-gray-200 p-4">{period.periodName}</td>
                      <td className="border border-gray-200 p-4">
                        {period.isPresent ? 'Yes' : 'No'}
                      </td>
                      <td className="border border-gray-200 p-4">{period.teacherName}</td>
                      <td className="border border-gray-200 p-4">
                        {new Date(period.timeMarked).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p>No attendance records available for you.</p>
      )}
    </div>
  );
};

export default StudentDashboard;

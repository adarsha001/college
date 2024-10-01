import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Room = ({ section }) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                // Get the token from localStorage
                const token = localStorage.getItem('token');

                // Make the request with the Authorization header
                const response = await fetch(`http://localhost:5000/api/students/section/${section}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token  // Attach token in the request header
                    }
                });

                if (response.status === 401) {
                    console.error('Unauthorized access');
                    // Optionally handle the unauthorized access (e.g., redirect to login)
                }

                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, [section]);

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Room {section}</h2>
                {students.length > 0 ? (
                    <ul className="space-y-4">
                        {students.map((student) => (
                            <li key={student._id} className="bg-gray-50 p-4 rounded-md shadow-sm">
                                <Link to={`/student/${student._id}`} className="text-lg font-semibold text-gray-700 hover:underline">
                                    {student.name}
                                    <div className="text-sm text-gray-500">{student.usn}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No students found in this room.</p>
                )}
            </div>

            {/* Link to the attendance page with the section as a URL parameter */}
            <div className="mt-6 text-center">
                <Link to={`/attendance/${section}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Mark Attendance
                </Link>
            </div>
        </div>
    );
};

export default Room;

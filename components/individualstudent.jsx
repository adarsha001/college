import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentAttendanceDetail = () => {
    const { id } = useParams(); // Extract the student ID from the URL
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentAttendance = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/students/${id}/attendance`, {
                    headers: {
                        'x-auth-token': token
                    }
                });

                setStudent(response.data); // Set the student attendance data
            } catch (error) {
                console.error('Error fetching student attendance:', error);
            } finally {
                setLoading(false); // Stop the loading state
            }
        };

        fetchStudentAttendance();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {student ? (
                <>
                    <h1>{student.name}</h1>
                    <h3>Attendance History for {student.name}</h3>
                    <ul>
                        {student.attendance && student.attendance.length > 0 ? (
                            student.attendance.map((record, index) => (
                                record.isPresent && (
                                    <li key={index}>
                                        {new Date(record.date).toLocaleString()} - Present
                                    </li>
                                )
                            ))
                        ) : (
                            <p>No attendance records found.</p>
                        )}
                    </ul>
                </>
            ) : (
                <p>Student data not found.</p>
            )}
        </div>
    );
};

export default StudentAttendanceDetail;

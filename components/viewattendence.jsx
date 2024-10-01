import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewAttendance = () => {
    const { section } = useParams(); // Extract the section from the URL
    const [students, setStudents] = useState([]);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/students/section/${section}`, {
                    headers: {
                        'Authorization': token
                    }
                });

                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, [section]);

    const calculateTotalPresent = (attendance) => {
        return attendance.filter(record => record.isPresent).length;
    };

    const handleStudentClick = (student) => {
        // Navigate to the student's detailed attendance page using useNavigate
        navigate(`/individual/${student._id}`);
    };

    return (
        <div>
            <h2>Attendance Records for Section {section}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Total Present</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student._id} onClick={() => handleStudentClick(student)}>
                            <td>{student.name}</td>
                            <td>{calculateTotalPresent(student.attendance)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewAttendance;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StudentDetail = () => {
    const { id } = useParams(); // Retrieve the student ID from the URL
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage
                const response = await fetch(`http://localhost:5000/api/students/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token, // Include token in the request header
                    }
                });

                if (response.status === 401) {
                    console.error('Unauthorized access');
                    // Handle unauthorized access (e.g., redirect to login)
                }

                const data = await response.json();
                setStudent(data);
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

        fetchStudent();
    }, [id]);

    if (!student) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Student Details</h2>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-700">Name:</h3>
                    <p className="text-lg text-gray-600">{student.name}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-700">USN:</h3>
                    <p className="text-lg text-gray-600">{student.usn}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-700">Section:</h3>
                    <p className="text-lg text-gray-600">{student.section}</p>
                </div>
            </div>
        </div>
    );
};

export default StudentDetail;

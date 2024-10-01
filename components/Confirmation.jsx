import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, usn, section, password } = location.state || {}; // Destructure state

  const [timeLeft, setTimeLeft] = useState(10); // Initial countdown time in seconds

  useEffect(() => {
    if (!name || !usn || !section || !password) {
      return; // If no data, do not start the countdown
    }

    // Timer to update the countdown
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          navigate('/login');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Update every second

    // Clean up the interval if the component is unmounted
    return () => clearInterval(timer);
  }, [navigate, name, usn, section, password]);

  if (!name || !usn || !section || !password) {
    return <p>Error: No data found</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Details</h2>
      <div className="bg-white p-6 rounded shadow-lg">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>USN:</strong> {usn}</p>
        <p><strong>Section:</strong> {section}</p>
        <p><strong>Password:</strong> {password}</p>
      </div>
      <p className="mt-4 text-gray-500">You will be redirected to the login page in {timeLeft} seconds.</p>
    </div>
  );
};

export default Confirmation;

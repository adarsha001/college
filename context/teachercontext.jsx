import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const TeacherContext = createContext();

// Provider component
export const TeacherProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [teacher, setTeacher] = useState(null);

  // Function to store token in localStorage and update state
  const storeToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  // Function to clear token (for logout)
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setTeacher(null);
  };

  // Function to check if a user is logged in
  const isLoggedIn = !!token;

  // Fetch teacher details if logged in
  useEffect(() => {
    if (token) {
      fetchTeacherDetails(token);
    }
  }, [token]);

  // Fetch teacher details from the backend
  const fetchTeacherDetails = async (authToken) => {
    try {
      const response = await fetch('http://localhost:5000/api/teachers/teacherdetails', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      setTeacher(data.teacher); // Store the teacher data in state
    } catch (error) {
      console.error('Error fetching teacher details:', error);
      logout(); // Log out the user if the token is invalid
    }
  };

  return (
    <TeacherContext.Provider value={{ token, teacher, storeToken, logout, isLoggedIn }}>
      {children}
    </TeacherContext.Provider>
  );
};

// Custom hook to use the context
export const useTeacherContext = () => {
  return useContext(TeacherContext);
};

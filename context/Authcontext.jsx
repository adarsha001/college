// src/context/UserContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context for user details
const UserContext = createContext();

// Custom hook to use UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};

// Provide the UserContext to the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // To store user details
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To store any errors
  const token = localStorage.getItem('token'); // Get token from local storage
  const [teachers, setTeachers] = useState({});
  // Function to fetch the user details
  const fetchUserDetails = async () => {
    if (!token) {
      setError('No token found'); // Set error if no token
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data); // Store user data
        setLoading(false); // Stop loading once data is fetched
      } else {
        console.error('Error fetching user details');
        setError('Failed to fetch user details');
        setLoading(false);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch user details');
      setLoading(false);
    }
  };
  const fetchTeachers = async () => {
    if (!token) return;
  
    try {
      const response = await fetch('http://localhost:5000/api/users/teacher', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setTeachers(data);  // Store teachers data
  
        // Log assigned subject for each teacher
        data.forEach((teacher) => {
          console.log(teacher.name); // Teacher name
          if (teacher.assignedSubject && teacher.assignedSubject.name) {
            console.log(teacher.assignedSubject.name); // Subject name
          } else {
            console.log('No assigned subject');
          }
        });
      } else {
        console.error('Error fetching teachers');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  

  // Fetch user details when component mounts
  useEffect(() => {
    fetchUserDetails();
    fetchTeachers()
  }, [token]);

  // If the user details are still loading, show a loading spinner (optional)
  if (loading) {
    return <div>Loading...</div>;
  }

  // Provide user details and error state to the rest of the app
  return (
    <UserContext.Provider value={{ user, loading, error,teachers  }}>
      {children}
    </UserContext.Provider>
  );
};

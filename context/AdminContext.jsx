import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [pendingUsers, setPendingUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [admin, setAdmin] = useState([]);
  const [role, setRole] = useState("");

  // Store token in localStorage and context
  const storeToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    }
  };

  // Function to remove token (logout)
  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Fetch pending users
  const fetchPendingUsers = async () => {
    if (!token) return;
    try {
      const response = await fetch('http://localhost:5000/api/admin/pending-users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPendingUsers(data);
      } else {
        console.error('Error fetching pending users');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Fetch teachers
  const fetchTeachers = async () => {
    if (!token) return;
    try {
      const response = await fetch('http://localhost:5000/api/admin/teachers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTeachers(data);
      } else {
        console.error('Error fetching teachers');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Fetch students
  const fetchStudents = async () => {
    if (!token) return;
    try {
      const response = await fetch('http://localhost:5000/api/admin/students', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error('Error fetching students');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Approve user
  const approveUser = async (userId, approve) => {
    if (!token) return;
    try {
      await fetch(`http://localhost:5000/api/admin/approve-user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ approve }),
      });
      fetchPendingUsers(); // Refresh pending users list
    } catch (error) {
      console.error('Approval error:', error);
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    if (!token) return;
    try {
      await fetch(`http://localhost:5000/api/admin/delete-user/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPendingUsers(); // Refresh pending users list
      fetchTeachers(); // Refresh teachers list
      fetchStudents(); // Refresh students list
    } catch (error) {
      console.error('Delete user error:', error);
    }
  };

  // Fetch admin
  const fetchAdmin = async () => {
    if (!token) return;
    try {
      const response = await fetch('http://localhost:5000/api/admin/admins', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAdmin(data); // Assuming data is an array of admin details
        
        // Assuming that each item in the `data` array has a role, email, or ID that matches the logged-in user
        const loggedInUser = data.find(admin => admin.token === token); // Adjust this logic based on your backend
        
        if (loggedInUser) {
          setRole(loggedInUser.role); // Extract the role from the matched user
        } else {
          console.error("Logged in user not found in admin data");
        }
      } else {
        console.error('Error fetching admin');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPendingUsers();
      fetchTeachers();
      fetchStudents();
      fetchAdmin(); // Fetch admin details to set role
    }
  }, [token]);

  // Update user
  const updateUser = async (userId, userData) => {
    if (!token) return;
    try {
      await fetch(`http://localhost:5000/api/admin/update-user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      fetchPendingUsers(); // Refresh pending users list
      fetchTeachers(); // Refresh teachers list
      fetchStudents(); // Refresh students list
      setEditingUser(null); // Close the edit form
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  // Track if logged in
  const isLoggedIn = !!token;

  return (
    <AdminContext.Provider
      value={{
        token,
        storeToken,
        removeToken,
        pendingUsers,
        fetchPendingUsers,
        approveUser,
        teachers,
        fetchTeachers,
        students,
        fetchStudents,
        handleDeleteUser,
        updateUser,
        editingUser,
        setEditingUser,
        admin,
        isLoggedIn,
        role, // Make role available in the context
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);

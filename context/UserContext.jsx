// import React, { createContext, useState, useContext } from 'react';

// // Create the UserContext
// const UserContext = createContext();

// // Custom hook to use the UserContext
// export const useUserContext = () => useContext(UserContext);

// // Provider Component
// export const UserProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem('token') || null);
//   const [userDetails, setUserDetails] = useState(null);

//   // Function to save token in context and local storage
//   const storeToken = (newToken) => {
//     localStorage.setItem('token', newToken);
//     setToken(newToken);
//   };
//   const isloggedin = !!token; 
//   // Function to remove token (logout)
//   const removeToken = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUserDetails(null);
//   };

//   // Fetch user details using the token
//   const fetchUserDetails = async () => {
//     if (token) {
//       try {
//         const response = await fetch('http://localhost:5000/api/users/me', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`, // Send token in headers
//           },
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setUserDetails(data);
//           console.log("userdata",data);
          
//           // Store user details in context
//         } else {
//           console.error('Failed to fetch user details:', data);
//         }
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     }
//   };

//   return (
//     <UserContext.Provider value={{ token, storeToken,isloggedin, removeToken, userDetails, fetchUserDetails }}>
//       {children}
//     </UserContext.Provider>
//   );
// };




import { useContext, createContext, useEffect, useState } from 'react';

// Create the context
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
const [user, setuser] = useState("")
  // Logout the user and clear the token
  const logoutuser = () => {
    setToken(""); // Clear token from state
    localStorage.removeItem("token"); // Clear token from localStorage
  };

  // Store token in localStorage and update state
  const storeToken = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken); // Update token in state
  };

  // Determine if the user is logged in
  const isloggedin = !!token; // Boolean based on the presence of the token

  // Use effect to monitor changes to the token (optional)
  useEffect(() => {
    console.log("Token updated:", token);
    console.log("Is logged in:", isloggedin);
  }, [token, isloggedin]);
const userAuthentication =async () => {
  
  try {
    const response=await fetch("http://localhost:5000/api/students/user",{
      method:"GET",headers:{
        Authorization:`Bearer ${token}`
      }
    });
    if(response.ok){
      const data= await response.json();
      console.log("data",data.userdata)
      setuser(data.userdata);

    }
  } catch (error) {
    
  }}

  useEffect(() => {
  userAuthentication();
  }, [])

  return (
    <AppContext.Provider value={{user, isloggedin, token, storeToken, logoutuser }}>
      {children}
    </AppContext.Provider>
  );
};

const useStudentContext = () => {
  return useContext(AppContext);
};

export { useStudentContext, AppProvider };

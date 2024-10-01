import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { AppProvider } from "../context/studentcontext.jsx";
// import { TeacherProvider } from "../context/teachercontext.jsx";
import { AdminProvider } from "../context/AdminContext.jsx";
import { UserProvider  } from '../context/Authcontext.jsx';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <UserProvider>
      
     <AdminProvider>

        <App />
    
     </AdminProvider>
    </UserProvider>
  </React.StrictMode>
);

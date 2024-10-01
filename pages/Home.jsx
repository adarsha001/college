import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminContext } from '../context/AdminContext';
import { useUserContext } from '../context/Authcontext';

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAdminContext(); // Access role
const {user}=useUserContext()
//   console.log("role", user);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <nav className="w-full bg-blue-600 p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">My College App</h1>
        <ul className="flex space-x-4">
          {isLoggedIn ? (
            <>
              {user.role === 'admin' && (
                <li>
                  <Link to="/admin-dashboard" className="text-white text-lg hover:underline">
                    Admin Dashboard
                  </Link>
                </li>
              )}
              {user.role === 'teacher' && (
                <li>
                  <Link to="/teacher-dashboard" className="text-white text-lg hover:underline">
                    Teacher Dashboard
                  </Link>
                </li>
              )}
              {user.role === 'student' && (
                <li>
                  <Link to="/student-dashboard" className="text-white text-lg hover:underline">
                    Student Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link to="/logout" className="text-white text-lg hover:underline">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup" className="text-white text-lg hover:underline">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white text-lg hover:underline">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="text-center mt-10">
        <p className="text-lg text-gray-600 mt-4">Your gateway to managing attendance and more!!</p>
      </div>

      <div>
        {user ? (
            <h1>Welcome, {user.name}</h1>
        ) : (
            <h1>Welcome, Guest</h1>
        )}
    </div>
      <div onClick={() => navigate('/room-a')} className="cursor-pointer p-4 border border-gray-300 rounded-md">
      section-A
      </div>

      <div onClick={() => navigate('/room-b')} className="cursor-pointer p-4 border border-gray-300 rounded-md">
        Section B
      </div>
      <div onClick={() => navigate('/room-c')} className="cursor-pointer p-4 border border-gray-300 rounded-md">
        Section C
      </div>
      <div onClick={() => navigate('/timetable')} className="cursor-pointer p-4 border border-gray-300 rounded-md">
        Timetable
      </div>
    </div>
  );
};

export default Home;

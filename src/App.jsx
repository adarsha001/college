import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from '../components/SignUp.jsx';
import Login from '../components/Login.jsx';
import Room from '../components/Room.jsx';
import Home from '../pages/Home.jsx';
import Confirmation from '../components/Confirmation.jsx';
import StudentDetail from '../components/StudentDetail.jsx';
import './index.css';
// import AttendanceMarking from '../components/attendence.jsx';
import TeacherRegister from './components/TeacherRegister.jsx';
import TeacherLogin from './components/TeacherLogin.jsx';
import SectionSelection from '../components/teacherselect.jsx';
import ViewAttendance from '../components/viewattendence.jsx';
import StudentAttendanceDetail from '../components/individualstudent.jsx';
import Timetable from '../timetable/timetable.jsx';
import Logout from '../components/Logout.jsx';
import AdminDashboard from '../components/AdminDashboard.jsx';
import LoginPage from '../components/Login.jsx';
import Teacherdasbord from '../components/teacherdasbord.jsx';
import StudentDashboard from '../components/StudentDashboard.jsx';
import AttendanceMarking from '../components/AttendanceMarking.jsx';
import MarkAttendance from '../components/MarkAttendance.jsx';
// import { AuthProvider } from '../context/Authcontext.jsx';

function App() {
  return (
    <>
      <Router>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/room-a" element={<Room section="A" />} />
            <Route path="/room-b" element={<Room section="B" />} />
            <Route path="/room-c" element={<Room section="C" />} />
            <Route path="/student/:id" element={<StudentDetail />} />
            <Route path="/select-section" element={<SectionSelection />} />
            {/* <Route path="/attendance/:section" element={<AttendanceMarking />} /> */}
            <Route path="/register/teacher" element={<TeacherRegister />} />
            <Route path="/login/teacher" element={<TeacherLogin />} />
            <Route path="/individual/:id" element={<StudentAttendanceDetail />} />
            <Route path="/attendance/view/:section" element={<ViewAttendance />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/login" element={<LoginPage />} />
          {/* <Route path='/mark-attendance' element={<AttendanceMarking/>} /> */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/teacher-dashboard" element={<Teacherdasbord />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path='/mark-attendance' element={<MarkAttendance/>}/>
          </Routes>

      </Router>
    </>
  );
}

export default App;

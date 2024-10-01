import React, { useState, useEffect } from 'react';
import { useAdminContext } from '../context/AdminContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const { 
    pendingUsers, 
    teachers, 
    students, 
    approveUser, 
    handleDeleteUser, 
    updateUser, 
    editingUser, 
    setEditingUser, 
    admin 
  } = useAdminContext();
  
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: '',
    isApproved: false
  });

  const [newSubject, setNewSubject] = useState('');
  const [newSubjectCode, setNewSubjectCode] = useState('');
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (editingUser) {
      setEditForm({
        name: editingUser.name || '',
        email: editingUser.email || '',
        role: editingUser.role || '',
        isApproved: editingUser.isApproved || false,
        assignedSubject: editingUser.assignedSubject ? editingUser.assignedSubject.map(sub => sub._id) : [],
        section: editingUser.section || '',
      });
    }
  }, [editingUser]);

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    if (editingUser) {
      updateUser(editingUser._id, editForm);
    }
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, [subjects]);

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/subjects', { 
        name: newSubject, 
        code: newSubjectCode 
      });
      alert(response.data.message);
      setNewSubject('');
      setNewSubjectCode('');
    } catch (error) {
      console.error('Error adding subject:', error);
      alert('Failed to add subject');
    }
  };

  const deleteSubject = async (subjectId) => {
    try {
      await axios.delete(`http://localhost:5000/api/subjects/subjectdelete/${subjectId}`);
      // After deleting, filter out the deleted subject from the state
      setSubjects(subjects.filter((subject) => subject._id !== subjectId));
    } catch (error) {
      console.error("Error deleting subject", error);
    }
  };
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <Link to="/">Home</Link>
      <Link to="/logout" className="ml-4">Logout</Link>

      {admin && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Admin Details</h2>
          <div className="p-4 border border-gray-200 rounded-md">
            {admin.map((adminItem) => (
              <li key={adminItem._id}>
                <p>Name: {adminItem.name}</p>
                <p>Email: {adminItem.email}</p>
              </li>
            ))}
          </div>
        </div>
      )}

      {/* Edit User Form */}
      {editingUser && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Edit User</h2>
          <div className="flex flex-col mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editForm.name}
              onChange={handleEditChange}
              className="mb-2 p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={editForm.email}
              onChange={handleEditChange}
              className="mb-2 p-2 border rounded"
            />
            <select
              name="role"
              value={editForm.role}
              onChange={handleEditChange}
              className="mb-2 p-2 border rounded"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
            {editForm.role === 'teacher' && (
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="isApproved"
                    checked={editForm.isApproved}
                    onChange={(e) => setEditForm({ ...editForm, isApproved: e.target.checked })}
                    className="mr-2"
                  />
                  Approved
                </label>
              </div>
            )}
            <div className="flex">
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Subject Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Add New Subject</h2>
        <form onSubmit={handleAddSubject} className="flex flex-col">
          <input
            type="text"
            placeholder="New Subject Name"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="mb-2 p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Subject Code"
            value={newSubjectCode}
            onChange={(e) => setNewSubjectCode(e.target.value)}
            className="mb-2 p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
          >
            Add Subject
          </button>
        </form>
      </div>

      {/* Subjects List */}
      <div>
      <h3 className="text-xl font-semibold mt-4">All Subjects</h3>
      <ul className="list-disc pl-5">
        {subjects.map((subject) => (
          <li key={subject._id} className="mb-1 flex justify-between items-center">
            {subject.name} ({subject.code})
            {/* Cross (delete) button */}
            <button
              onClick={() => deleteSubject(subject._id)}
              className="text-red-600 hover:text-red-800 ml-4"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
      {/* Pending Users */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Pending Users</h2>
        <ul className="list-disc pl-5">
          {pendingUsers.map((user) => (
            <li key={user._id} className="mb-2">
              {user.name} - {user.email}
              <div className="flex mt-2">
                <button
                  onClick={() => approveUser(user._id, true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                >
                  Approve
                </button>
                <button
                  onClick={() => approveUser(user._id, false)}
                  className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                >
                  Reject
                </button>
                <button
                  onClick={() => setEditingUser(user)}
                  className="ml-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Teachers */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Teachers</h2>
        <ul className="list-disc pl-5">
          {teachers.map((teacher) => (
            <li key={teacher._id} className="mb-2">
              {teacher.name} - {teacher.email} - {teacher.isApproved ? 'Approved' : 'Pending'}
              {teacher.assignedSubject && teacher.assignedSubject.length > 0 && (
                <span className="ml-2 text-sm text-gray-600">
                  - Subjects: {teacher.assignedSubject.map((sub) => `${sub.name} (${sub.code})`).join(', ')}
                </span>
              )}
              <div className="flex mt-2">
                <button
                  onClick={() => setEditingUser(teacher)}
                  className="ml-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(teacher._id)}
                  className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Students */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Students</h2>
        <ul className="list-disc pl-5">
          {students.map((student) => (
            <li key={student._id} className="mb-2">
              {student.name} - {student.email} - {student.section}
              <div className="flex mt-2">
                <button
                  onClick={() => setEditingUser(student)}
                  className="ml-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(student._id)}
                  className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;

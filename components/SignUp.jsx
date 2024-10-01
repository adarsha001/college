import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student', // Default role is student
    assignedSubject: [], // Selected subjects
    section: '', // Section for students
  });

  const { name, email, password, role, assignedSubject, section } = formData;
  const [subjects, setSubjects] = useState([]);
  const [sections] = useState(['A', 'B', 'C']); // Example sections
  const navigate = useNavigate();

  // Fetch subjects based on role
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/subjects');
        setSubjects(res.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    if (role === 'teacher') {
      fetchSubjects();
    }
  }, [role]);

  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;

    // Handle multiple selections for assignedSubject (if teacher)
    if (name === 'assignedSubject') {
      const selectedSubjects = Array.from(selectedOptions, (option) => option.value);
      setFormData({ ...formData, [name]: selectedSubjects });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubjectSelect = (subjectId) => {
    setFormData((prev) => ({
      ...prev,
      assignedSubject: [...prev.assignedSubject, subjectId],
    }));
  };

  const handleSubjectDeselect = (subjectId) => {
    setFormData((prev) => ({
      ...prev,
      assignedSubject: prev.assignedSubject.filter((id) => id !== subjectId),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed: ' + (error.response?.data?.msg || error.message));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          className="border p-2 w-full"
          required
        />
        <div>
          <label htmlFor="role" className="block mb-2">Register as:</label>
          <select
            name="role"
            value={role}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        {role === 'teacher' && (
          <div>
            <label htmlFor="assignedSubject" className="block mb-2">Select Subject(s):</label>
            <div className="mb-2">
              {assignedSubject.map((subjectId) => {
                const subject = subjects.find((sub) => sub._id === subjectId);
                return (
                  subject && (
                    <span key={subjectId} className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-2 py-1 mr-2 mb-2">
                      {subject.name}
                      <button
                        type="button"
                        onClick={() => handleSubjectDeselect(subjectId)}
                        className="ml-2 text-blue-500"
                      >
                        &times; {/* Cross icon for removal */}
                      </button>
                    </span>
                  )
                );
              })}
            </div>
            <select
              name="assignedSubject"
              onChange={(e) => handleSubjectSelect(e.target.value)}
              className="border p-2 w-full"
              required
            >
              <option value="" disabled>Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>
          </div>
        )}

        {role === 'student' && (
          <div>
            <label htmlFor="section" className="block mb-2">Select Section:</label>
            <select
              name="section"
              value={section}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            >
              <option value="" disabled>Select a section</option>
              {sections.map((sec) => (
                <option key={sec} value={sec}>
                  Section {sec}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Registration;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const TeacherRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    assignedSubject: '',
  });

  const { name, email, password, assignedSubject } = formData;
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/teachers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setFormData({ name: '', email: '', password: '', assignedSubject: '' });
        navigate('/login/teacher'); // Navigate to login page on successful registration
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Teacher Registration</h2>
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
        <input
          type="text"
          name="assignedSubject"
          value={assignedSubject}
          onChange={handleChange}
          placeholder="Assigned Subject"
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default TeacherRegister;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const SectionSelection = () => {
  const navigate = useNavigate();

  const handleSectionSelect = (section) => {
    // Redirect to the attendance marking page with the selected section
    navigate(`/attendance/${section}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Select a Section to Mark Attendance</h2>
      <div className="space-y-4">
        <button
          onClick={() => handleSectionSelect('A')}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Section A
        </button>
        <button
          onClick={() => handleSectionSelect('B')}
          className="bg-green-500 text-white p-2 rounded"
        >
          Section B
        </button>
        <button
          onClick={() => handleSectionSelect('C')}
          className="bg-red-500 text-white p-2 rounded"
        >
          Section C
        </button>
      </div>
    </div>
  );
};

export default SectionSelection;

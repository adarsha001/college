import React from 'react';

const TeacherTimetable = ({ teachers, periods, teacherTimetable }) => {
  return (
    <div className="w-1/2 ml-8">
      <h2 className="text-2xl font-semibold mb-4">Teacher Timetable</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Teacher</th>
            {periods.map((period, index) => (
              <th key={index} className="border border-gray-300 p-2">{period}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id} className="bg-white">
              <td className="border border-gray-300 p-2">{teacher.name}</td>
              {periods.map((period) => (
                <td key={period} className="border border-gray-300 p-2">
                  {teacherTimetable[teacher.name]?.[period] || 'Free'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTimetable;

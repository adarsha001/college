import React from 'react';

const SectionTimetable = ({ sections, periods, teachers, timetable, updateTimetable, deleteSection, deletePeriod }) => {
  return (
    <div className="w-1/2">
      <h2 className="text-2xl font-semibold mb-4">Section Timetable</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Section</th>
            {periods.map((period, index) => (
              <th key={index} className="border border-gray-300 p-2">
                {period} <button onClick={() => deletePeriod(period)} className="text-red-500 ml-2">X</button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => (
            <tr key={section} className="bg-white">
              <td className="border border-gray-300 p-2">
                {section} <button onClick={() => deleteSection(section)} className="text-red-500 ml-2">X</button>
              </td>
              {periods.map((period) => (
                <td key={period} className="border border-gray-300 p-2">
                  <select
                    className="w-full p-1 border border-gray-400"
                    value={timetable[section]?.[period] || ''}
                    onChange={(e) => updateTimetable(section, period, e.target.value)}
                  >
                    <option value="">Select Teacher</option>
                    <option value="free">Free Period</option>
                    {teachers.map((teacher, index) => (
                      <option key={index} value={teacher.name}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SectionTimetable;

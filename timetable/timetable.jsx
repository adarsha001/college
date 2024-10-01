import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SectionTimetable from './SectionTimetable';
import TeacherTimetable from './TeacherTimetable';
import { useUserContext } from '../context/Authcontext';

const Timetable = () => {
  const [timetable, setTimetable] = useState({});
  const [teacherTimetable, setTeacherTimetable] = useState({});
  const { teachers = [] } = useUserContext();
  const [sections, setSections] = useState(['Section A', 'Section B']);
  const [periods, setPeriods] = useState(['9-10 AM', '10-11 AM']);
  const [newSection, setNewSection] = useState('');
  const [newPeriod, setNewPeriod] = useState('');
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get('/api/timetables');
        if (Array.isArray(response.data)) {
          const fetchedTimetable = response.data.reduce((acc, item) => {
            const { section, period, teacherName } = item;
            acc[section] = acc[section] || {};
            acc[section][period] = teacherName;
            return acc;
          }, {});
          setTimetable(fetchedTimetable);
        } else {
          console.error('Expected response.data to be an array', response.data);
        }
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    };

    fetchTimetable();
  }, []);

  const addSection = () => {
    if (newSection && !sections.includes(newSection)) {
      setSections([...sections, newSection]);
      setNewSection('');
    }
  };

  const addPeriod = () => {
    if (newPeriod && !periods.includes(newPeriod)) {
      setPeriods([...periods, newPeriod]);
      setNewPeriod('');
    }
  };

  const deleteSection = (sectionToDelete) => {
    setSections(sections.filter(section => section !== sectionToDelete));
    setTimetable((prev) => {
      const updatedTimetable = { ...prev };
      delete updatedTimetable[sectionToDelete];
      return updatedTimetable;
    });
  };

  const deletePeriod = (periodToDelete) => {
    setPeriods(periods.filter(period => period !== periodToDelete));
    setTimetable((prev) => {
      const updatedTimetable = { ...prev };
      Object.keys(updatedTimetable).forEach(section => {
        delete updatedTimetable[section][periodToDelete];
      });
      return updatedTimetable;
    });
  };

  const updateTimetable = async (section, period, teacherName) => {
    const previousTeacher = timetable[section]?.[period] || '';

    if (teacherName === 'free') {
      if (previousTeacher && previousTeacher !== 'free') {
        setTeacherTimetable((prev) => ({
          ...prev,
          [previousTeacher]: {
            ...prev[previousTeacher],
            [period]: 'Free',
          },
        }));
      }

      setTimetable((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [period]: 'free',
        },
      }));

      await axios.post('http://localhost:5000/api/timetables', { section, period, teacherName: 'free', date, day });
      return;
    }

    let isTeacherAssignedElsewhere = false;
    Object.keys(timetable).forEach((sec) => {
      if (sec !== section && timetable[sec]?.[period] === teacherName) {
        isTeacherAssignedElsewhere = true;
      }
    });

    if (isTeacherAssignedElsewhere) {
      alert(`${teacherName} is already assigned to another section during ${period}.`);
      return;
    }

    setTimetable((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [period]: teacherName,
      },
    }));

    if (previousTeacher && previousTeacher !== 'free' && previousTeacher !== teacherName) {
      setTeacherTimetable((prev) => ({
        ...prev,
        [previousTeacher]: {
          ...prev[previousTeacher],
          [period]: 'Free',
        },
      }));
    }

    setTeacherTimetable((prev) => ({
      ...prev,
      [teacherName]: {
        ...prev[teacherName],
        [period]: section,
      },
    }));

    await axios.post('/api/timetables', { section, period, teacherName, date, day });
  };

  const postTimetableToDatabase = async () => {
    try {
      const timetableEntries = Object.keys(timetable).flatMap(section =>
        Object.keys(timetable[section]).map(period => ({
          section,
          period,
          teacherName: timetable[section][period],
          date,
          day,
        }))
      );

      await axios.post('http://localhost:5000/api/timetables/batch', timetableEntries);
      alert('Timetable posted successfully!');
    } catch (error) {
      console.error('Error posting timetable:', error);
      alert('Failed to post timetable.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Class Timetable</h1>
      <div className="flex space-x-4 mb-6">
        <div>
          <input
            type="text"
            placeholder="New Section"
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
            className="border p-2"
          />
          <button onClick={addSection} className="ml-2 p-2 bg-green-500 text-white">
            Add Section
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder="New Period"
            value={newPeriod}
            onChange={(e) => setNewPeriod(e.target.value)}
            className="border p-2"
          />
          <button onClick={addPeriod} className="ml-2 p-2 bg-green-500 text-white">
            Add Period
          </button>
        </div>
      </div>
      <div className="flex mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 mr-4"
        />
        <input
          type="text"
          placeholder="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="border p-2"
        />
      </div>
      <div className="flex justify-between">
        <SectionTimetable
          sections={sections}
          periods={periods}
          teachers={teachers}
          timetable={timetable}
          updateTimetable={updateTimetable}
          deleteSection={deleteSection}
          deletePeriod={deletePeriod}
        />
        <TeacherTimetable
          teachers={teachers}
          periods={periods}
          teacherTimetable={teacherTimetable}
        />
      </div>
      <button onClick={postTimetableToDatabase} className="mt-4 p-2 bg-blue-500 text-white">
        Post Timetable to Database
      </button>
    </div>
  );
};

export default Timetable;

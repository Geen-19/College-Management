import React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Admin = () => {
  const [enrollmentsByYear, setEnrollmentsByYear] = useState([]);
  const [enrollmentsByCourse, setEnrollmentsByCourse] = useState([]);
  const [enrollmentsByDepartment, setEnrollmentsByDepartment] = useState([]);
  const [facultyCourseLoad, setFacultyCourseLoad] = useState([]);
  useEffect(() => {
    fetchEnrollmentsByYear();
    fetchEnrollmentsByCourse();
    fetchEnrollmentsByDepartment();
    fetchFacultyCourseLoad();
  }, []);

  const fetchEnrollmentsByYear = async () => {
    const response = await axios.get('http://localhost:8080/admin/enrollments-by-year');
    setEnrollmentsByYear(response.data);
    console.log(response.data);
  };
  const mockEnrollmentsByCourse = enrollmentsByYear.map(item => {
    return { course: item[0], count: item[1] };
});
  const fetchEnrollmentsByCourse = async () => {
    const response = await axios.get('http://localhost:8080/admin/enrollments-by-course');
    setEnrollmentsByCourse(response.data);
    console.log(response.data);
  };

  const fetchEnrollmentsByDepartment = async () => {
    const response = await axios.get('http://localhost:8080/admin/enrollments-by-department');
    setEnrollmentsByDepartment(response.data);
    console.log(response.data);
  };

  const fetchFacultyCourseLoad = async () => {
    const response = await axios.get('http://localhost:8080/admin/faculty-course-load');
    setFacultyCourseLoad(response.data);
  };
  return (
    <div>
    <h1>Dashboard</h1>
    <div className="graphs">
      <div className="graph">
        <h2>Enrollment Trends by Year</h2>
      </div>
      <div className="graph">
        <h2>Enrollment Trends by Course</h2>
        <Bar data={mockEnrollmentsByCourse} />
      </div>
      <div className="graph">
        <h2>Enrollment Trends by Department</h2>
      </div>
      <div className="graph">
        <h2>Faculty Course Load</h2>
      </div>
    </div>
  </div>
  )
}

export default Admin
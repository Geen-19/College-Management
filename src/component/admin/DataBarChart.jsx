import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import axios from "axios";
// Sample Data
const dataArray = [
  ["Fresher", 2],
  ["Calculus I", 1],
  ["Introduction to Programming", 1],
  ["Computer Science", 2],
];

// Transform the data into the format Chart.js expects
const transformDataToChartFormat = (data) => {
  return {
    labels: data.map((item) => item[0]), // Use the first element of each array as the label
    datasets: [
      {
        label: "Count",
        data: data.map((item) => item[1]), // Use the second element as the data value
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Bar border color
        borderWidth: 1,
      },
    ],
  };
};

// Chart options (optional)
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Data Representation",
    },
  },
};

// Bar Chart Component
const DataBarChart = () => {
  const [enrollmentsByYear, setEnrollmentsByYear] = useState([]);
  const [enrollmentsByCourse, setEnrollmentsByCourse] = useState([]);
  const [enrollmentsByDepartment, setEnrollmentsByDepartment] = useState([]);
  const [facultyCourseLoad, setFacultyCourseLoad] = useState([]);
  useEffect(() => {
    fetchEnrollmentsByYear();
    fetchEnrollmentsByCourse();
    fetchEnrollmentsByDepartment();
  }, []);
  const fetchEnrollmentsByYear = async () => {
    const response = await axios.get(
      "http://localhost:8080/admin/enrollments-by-year"
    );
    setEnrollmentsByYear(response.data);
    console.log(response.data);
  };
  const fetchEnrollmentsByCourse = async () => {
    const response = await axios.get(
      "http://localhost:8080/admin/enrollments-by-course"
    );
    setEnrollmentsByCourse(response.data);
    console.log(response.data);
  };

  const fetchEnrollmentsByDepartment = async () => {
    const response = await axios.get(
      "http://localhost:8080/admin/enrollments-by-department"
    );
    setEnrollmentsByDepartment(response.data);
    console.log(response.data);
  };
  const chartDataDepartment = transformDataToChartFormat(enrollmentsByDepartment);
  const chartDataYear = transformDataToChartFormat(enrollmentsByCourse);
  const chartDataCourse = transformDataToChartFormat(enrollmentsByYear);


  return (
    <>
      <div style={{ width: "600px", margin: "0 auto" }}>
        <Bar data={chartDataCourse} options={options} />
      </div>
      <div style={{ width: "600px", margin: "0 auto" }}>
        <Bar data={chartDataYear} options={options} />
      </div>
      <div style={{ width: "600px", margin: "0 auto" }}>
        <Bar data={chartDataDepartment} options={options} />
      </div>
    </>
  );
};

export default DataBarChart;

import React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import DataBarChart from './DataBarChart';
import StudentManagement from './StudentManagement';
import Faculty from '../faculty/Faculty';
import FacultyManagement from './FacultyManagement';
const Admin = () => {
  

  
  return (
    <div>
      <div className="management">
        <StudentManagement />
        <FacultyManagement />
      </div>
    <h1>Dashboard</h1>
    <div className="graphs">
      <div className="graph">
        <h2>Enrollment Trends by Year</h2>
        <DataBarChart />
      </div>
    </div>
  </div>
  )
}

export default Admin
import React, { useEffect, useState } from "react";
import axios from "axios";
const Student = ({ data }) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [students, setStudents] = useState([]);
  const [facultyAdvisors, setFacultyAdvisors] = useState([]);
  const searchStudents = async (name, department, year) => {
    try {
      // Construct the query string based on provided parameters
      let query = [];
      console.log("Name:", name);
      console.log("Department:", department);
      console.log("Year:", year);
      if (name) query.push(`name=${name}`);
      if (department) query.push(`department=${department}`);
      if (year) query.push(`year=${year}`);

      // Join query parameters with '&' if multiple are present
      const queryString = query.length ? `?${query.join("&")}` : "";
      console.log("Query string:", queryString);
      // Perform the GET request with the constructed URL
      const response = await axios.get(
        `http://localhost:8080/api/users/students${queryString}`
      );
      setStudents(response.data);
      console.log(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      return [];
    }
  };

  const fetchFaculties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/faculty-advisors"
      );
      console.log("Faculties:", response.data);
      setFacultyAdvisors(response.data);
      console.log(facultyAdvisors);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };
  useEffect(() => {
    searchStudents();
    fetchFaculties();
  }, []);
  return (
    <div className="profile-container">
      <img src={data.photo} alt="Profile" className="profile-photo" />
      <h2>{data.name}</h2>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone}</p>
      <div>
        <h1>Search for Students</h1>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <button onClick={() => searchStudents(name, department, year)}>
            Search
          </button>
        </div>
        <div>
          <h2>Search Results</h2>
          <ul>
            {students && 
              students.map((student) => (
                <ul key={student.id}>
                  {student.user.role === "STUDENT" && <>{student.user.name} - {student.department.name} -{" "}
                  {student.year}</> }
                  
                </ul>
              ))}
          </ul>
        </div>
      </div>
      <h1>Assigned Faculty Advisors</h1>
      <ul>
        {facultyAdvisors.map((advisor) => (
          <li key={advisor.id} style={{ marginBottom: "20px" }}>
            <div>
              <strong>Name:</strong> {advisor.user.name}
            </div>
            <div>
              <strong>Email: </strong>
              <a href={`mailto:${advisor.email}`}>{advisor.user.email}</a>
            </div>
            <div>
              <strong>Phone:</strong>{" "}
              <a href={`tel:${advisor.phone}`}>{advisor.user.phone}</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Student;

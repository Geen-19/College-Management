import React, { useEffect, useState } from "react";
import axios from "axios";

const FacultyManagement = () => {
  const [faculty, setFaculty] = useState([]);
  const [fac, setFac] = useState({ name: "", department: "", officeHours: "" });

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    const response = await axios.get("http://localhost:8080/admin/faculty");
    setFaculty(response.data);
    console.log(response.data);
  };

  const addFaculty = async () => {
    await axios.post("http://localhost:8080/admin/faculty", fac);
    fetchFaculty();
    setFac({ name: "", department: "", officeHours: "" });
  };

  const updateFaculty = async (id) => {
    await axios.put(`http://localhost:8080/admin/faculty/${id}`, fac);
    fetchFaculty();
    setFac({ name: "", department: "", officeHours: "" });
  };

  const deleteFaculty = async (id) => {
    await axios.delete(`http://localhost:8080/admin/faculty/${id}`);
    fetchFaculty();
  };

  return (
    <div>
      <h1>Faculty Management</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={fac.name}
          onChange={(e) => setFac({ ...fac, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
          value={fac.department}
          onChange={(e) => setFac({ ...fac, department: e.target.value })}
        />
        <input
          type="text"
          placeholder="Office Hours"
          value={fac.officeHours}
          onChange={(e) => setFac({ ...fac, officeHours: e.target.value })}
        />
        <button onClick={addFaculty}>Add Faculty</button>
      </div>
      <ul>
        {faculty
          .filter((f) => f.user.role === "FACULTY_MEMBER") // Filter by role
          .map((f) => (
            <li key={f.id}>
              {f.user.name} - {f.department.NAME} - Office Hours: {f.officeHours}
              <button onClick={() => updateFaculty(f.id)}>Update</button>
              <button onClick={() => deleteFaculty(f.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FacultyManagement;

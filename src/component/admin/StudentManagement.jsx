import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    name: "",
    department: "",
    year: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:8080/admin/students");
    setStudents(response.data);
    console.log(response.data);
  };

  const addStudent = async () => {
    console.log(student);
    await axios.post("http://localhost:8080/admin/students/post", student);
    fetchStudents();
    setStudent({ name: "", department: "", year: "" });
  };

  const updateStudent = async (id) => {
    console.log(student);
    await axios.put(`http://localhost:8080/admin/students/${id}`, student);
    fetchStudents();
    setStudent({ name: "", department: "", year: "" });
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:8080/admin/students/${id}`);
    fetchStudents();
  };

  return (
    <div>
      <h1>Student Management</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
          value={student.department}
          onChange={(e) =>
            setStudent({ ...student, department: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Year"
          value={student.year}
          onChange={(e) => setStudent({ ...student, year: e.target.value })}
        />
        <button onClick={addStudent}>Add Student</button>
      </div>
      <ul>
        {students
          .filter((s) => s.user.role === "STUDENT") // Filter by role
          .map((s) => (
            <li key={s.id}>
              {s.user.name} - {s.department.name} - Year: {s.year}
              <button onClick={() => updateStudent(s.id)}>Update</button>
              <button onClick={() => deleteStudent(s.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default StudentManagement;

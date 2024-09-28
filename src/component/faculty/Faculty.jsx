import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
const Faculty = ({data}) => {
  const [students, setStudents] = useState([]);

    // Fetch the list of students for the faculty member's courses
    useEffect(() => {
        const fetchClassList = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/faculty/courseList/${data.id}`);
                setStudents(response.data);
            } catch (error) {
                console.error("Error fetching class list:", error);
            }
        };

        fetchClassList();
    }, [data.id]);

    return (
        <div>
            <h1>List of student in the enrolled courses</h1>
            <table>
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Contact Info</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>
                                <img
                                    src={student.user.photo || 'https://via.placeholder.com/50'}
                                    alt={`${student.user.name}'s profile`}
                                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                />
                            </td>
                            <td>{student.user.name}</td>
                            <td>
                                <a href={`mailto:${student.user.email}`}>{student.user.email}</a><br />
                                <a href={`tel:${student.phone}`}>{student.user.phone}</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Faculty
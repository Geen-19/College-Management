import React, { useState, useEffect } from "react";
import axios from "axios";

const FacultyProfileUpdate = ({ data }) => {
  // State for faculty profile
  const [facultyProfile, setFacultyProfile] = useState({
    name: "",
    email: "",
    officeHours: "",
  });


  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultyProfile({ ...facultyProfile, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct payload to match the backend structure
    const updatedProfile = {
        id: 1,
        photo : '',  // Add photo field
        officeHours: facultyProfile.officeHours,
      user: {
        id: data.id,
        name: facultyProfile.name,
        email: facultyProfile.email,
      },
    };
    console.log(updatedProfile);
    // Send POST request to update the faculty profile
    axios
      .post(`http://localhost:8080/api/users/faculty/update`, updatedProfile)
      .then((response) => {
        alert("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile", error);
        alert("Failed to update profile");
      });
  };

  return (
    <div>
      <h1>Update Faculty Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={facultyProfile.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={facultyProfile.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Office Hours:</label>
          <input
            type="text"
            name="officeHours"
            value={facultyProfile.officeHours}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default FacultyProfileUpdate;

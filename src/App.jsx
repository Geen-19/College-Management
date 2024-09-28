import "./App.css";
import Admin from "./component/admin/Admin";
import Faculty from "./component/faculty/Faculty";
import axios from "axios";
import { useEffect, useState } from "react";
import Student from "./component/student/Student";

function App() {
  const [role, setRole] = useState("");
  const [data, setData] = useState([]);
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users/1");
      setRole(response.data.role);
      setData(response.data);
      console.log(role);
    } catch (error) {
      console.error(error);
    }  finally {
      console.log("finally");
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <div className="app">
        {role === "ADMINISTRATOR" && <Admin data = {data} />}
        {role === "FACULTY_MEMBER" && <Faculty data = {data}/>}
        {role === "STUDENT" && <Student data = {data} />}
      </div>
    </>
  );
}

export default App;

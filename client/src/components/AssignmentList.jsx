// fetch data fr. backend GET project_assigments
// useStates: save data in the component
// useEffect: run something when the component loads or updates
import { useEffect, useState } from "react";
import axios from "axios";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/project_assignments")
      .then((res) => {
        setAssignments(res.data);
      })
      .catch((err) => {
        console.error("Error fetching assignments:", err);
      });
  }, []);

  return (
    <div>
      <h2>📋 Project Assignments</h2>
      <ul>
        {assignments.map((a, index) => (
          <li key={index}>
            👤 <strong>{a.employee.full_name}</strong> is assigned to 📁{" "}
            <strong>{a.project.project_name}</strong> on 📅{" "}
            {a.start_date.split("T")[0]} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentList;
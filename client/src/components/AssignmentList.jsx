// fetch data fr. backend GET project_assigments
// useStates: save data in the component
// useEffect: run something when the component loads or updates
import { useEffect, useState } from "react";
import axios from "axios";

function AssignmentList() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/project_assignments")
      .then((res) => {
        // Show only the latest 5 (assuming newest are last)
        const latestFive = res.data.slice(-5).reverse();
        setAssignments(latestFive);
      })
      .catch((err) => {
        console.error("Failed to fetch assignments:", err);
      });
  }, []);

  return (
    <div>
      <h2>Latest 5 Project Assignments</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Employee_ID</th>
            <th>Employee_name</th>
            <th>Project_name</th>
            <th>Start_date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a, index) => (
            <tr key={index}>
              <td>{a.employee_id}</td>
              <td>{a.employee_id?.full_name || a.employee_name}</td>
              <td>{a.project_code?.project_name || a.project_name}</td>
              <td>{new Date(a.start_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignmentList;
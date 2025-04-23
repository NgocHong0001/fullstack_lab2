// fetch data fr. backend GET project_assigments
// useStates: save data in the component
// useEffect: run something when the component loads or updates
import { useEffect, useState } from "react";
import axios from "axios";
import "./table.css"; 

function AssignmentList() {
  const [assignments, setAssignments] = useState([]);
  const [sortField, setSortField] = useState("start_date");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchAssignments = () => {
      axios.get("http://localhost:3000/api/project_assignments")
        .then((res) => {
          const latestFive = res.data.slice(-5);
          setAssignments(latestFive);
        })
        .catch((err) => {
          console.error("Failed to fetch assignments:", err);
        });
    };
  
    fetchAssignments(); // fetch immediately
  
    const interval = setInterval(fetchAssignments, 60000); //refressh 60sec
  
    return () => clearInterval(interval); // stop timer when component unmounts
  }, []);

  //handle sort when user clicks on the header
  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Sort assignments based on the selected field and order
  const sortedAssignments = [...assignments].sort((a, b) => {
    const getValue = (obj, field) => {
      if (field === "employee_name") return obj.employee?.full_name || "";
      if (field === "project_name") return obj.project?.project_name || "";
      if (field === "start_date") return new Date(obj.start_date);
      return obj[field];
    };

    const valA = getValue(a, sortField);
    const valB = getValue(b, sortField);

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="table-container">
      <table className="assignment-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("employee_id")}>Employee_ID</th>
            <th onClick={() => handleSort("employee_name")}>Employee_name</th>
            <th onClick={() => handleSort("project_name")}>Project_name</th>
            <th onClick={() => handleSort("start_date")}>Start_date</th>
          </tr>
        </thead>
        <tbody>
          {sortedAssignments.map((a, index) => (
            <tr key={index}>
              <td>{a.employee_id}</td>
              <td>{a.employee?.full_name}</td>
              <td>{a.project?.project_name}</td>
              <td>{new Date(a.start_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignmentList;
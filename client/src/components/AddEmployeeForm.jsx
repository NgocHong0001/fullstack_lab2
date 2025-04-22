import { useState } from "react";
import axios from "axios";

function AddEmployeeForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    hashed_password: "",
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/employees", formData);
      alert("Employee added!");
      setFormData({ full_name: "", email: "", hashed_password: "" });
    } catch (err) {
      console.error("Failed to add employee:", err);
      alert("Error adding employee.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Employee</h2>
      <input 
        name="full_name" 
        value={formData.full_name} 
        onChange={handleChange} 
        placeholder="Full Name" 
        required 
      />
      <input 
        name="email" 
        type="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="Email" 
        required 
      />
      <input 
        name="hashed_password" 
        type="password" 
        value={formData.hashed_password} 
        onChange={handleChange} 
        placeholder="Password" 
        required 
      />
      <button type="submit">Add Employee</button>
    </form>
  );
}

export default AddEmployeeForm;
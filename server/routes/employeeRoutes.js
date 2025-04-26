import express from "express";
import Employee from "../models/employee.js";

const router = express.Router();

// Add new employee
router.post("/", async (req, res) => {
  try {
    const { full_name, email, hashed_password } = req.body;

    // Validate required fields
    if (!full_name || !email || !hashed_password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check for unique email
    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const newEmployee = new Employee({ full_name, email, hashed_password });
    await newEmployee.save();

    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Get one employee by ID
router.get("/:employee_id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ employee_id: req.params.employee_id });
    if (!employee) return res.status(404).json({ error: "Not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
import express from "express";
import ProjectAssignment from "../models/projectAss.js";
import Employee from "../models/employee.js";
import Project from "../models/Project.js";

const router = express.Router();

//Assign employee to project
router.post("/", async (req, res) => {
  try {
    const { employee_id, project_code, start_date } = req.body;

    if (!employee_id || !project_code || !start_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const employee = await Employee.findOne({ employee_id });
    const project = await Project.findOne({ project_code });

    if (!employee || !project) {
      return res.status(404).json({ error: "Employee or project not found" });
    }

    const newAssignment = new ProjectAssignment({
      employee_id,
      project_code,
      start_date,
    });

    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Get all project assignments (with populated data)
router.get("/", async (req, res) => {
  try {
    const assignments = await ProjectAssignment.find();

    const populated = await Promise.all(
      assignments.map(async (assignment) => {
        const employee = await Employee.findOne({ employee_id: assignment.employee_id });
        const project = await Project.findOne({ project_code: assignment.project_code });

        return {
          ...assignment.toObject(),
          employee,
          project,
          start_date: assignment.start_date.toISOString().split("T")[0], //formats to YYYY-MM-DD
        };
      })
    );

    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
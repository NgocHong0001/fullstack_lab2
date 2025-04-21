import express from "express";
import Project from "../models/Project.js";

const router = express.Router();
//CREATE - Add new project
router.post("/", async (req, res) => {
  try {
    const {project_code, project_name, project_description} = req.body;

    // Validate required fields
    if (!project_code || !project_name || !project_description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existing = await Project.findOne({ project_code });
    if (existing) {
      return res.status(409).json({ error: "Project code already exists" });
    }

    const newProject = new Project({ project_code, project_name, project_description });
    await newProject.save();

    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});


export default router;
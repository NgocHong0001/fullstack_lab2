import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  employee_id: { type: String, ref: "Employee", required: true },
  project_code: { type: String, ref: "Project", required: true },
  start_date: Date
});

export default mongoose.model("ProjectAssignment", assignmentSchema);
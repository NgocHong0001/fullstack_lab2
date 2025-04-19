import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  project_code: { type: String, required: true, unique: true },
  project_name: String,
  project_description: String
});

export default mongoose.model("Project", projectSchema);
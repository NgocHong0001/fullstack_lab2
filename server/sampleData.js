import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import Employee from "./models/employee.js";
import Project from "./models/Project.js";
import ProjectAssignment from "./models/projectAss.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

await mongoose.connect(process.env.MONGODB_URL);
console.log("Connected to MongoDB");

// Reusable helper function
async function seedIfEmpty(model, name, data) {
  const count = await model.countDocuments();
  if (count === 0) {
    await Promise.all(data.map(item => model.create(item)));
    console.log(`${name} inserted`);
  } else {
    console.log(`${name} already exist — skipping`);
  }
}

// ➤ Employees
await seedIfEmpty(Employee, "Employees", [
  { full_name: "Alice Nguyen", email: "alice@example.com", hashed_password: "hashed1" },
  { full_name: "Bob Tran", email: "bob@example.com", hashed_password: "hashed2" },
  { full_name: "Charlie Le", email: "charlie@example.com", hashed_password: "hashed3" },
  { full_name: "Diana Vu", email: "diana@example.com", hashed_password: "hashed4" },
  { full_name: "Eli Pham", email: "eli@example.com", hashed_password: "hashed5" },
]);

// ➤ Projects
await seedIfEmpty(Project, "Projects", [
  { project_code: "P001", project_name: "Redesign", project_description: "Revamp the UI/UX" },
  { project_code: "P002", project_name: "API", project_description: "Develop backend APIs" },
  { project_code: "P003", project_name: "Mobile", project_description: "Build mobile app" },
  { project_code: "P004", project_name: "Migration", project_description: "Migrate legacy system" },
  { project_code: "P005", project_name: "Analytics", project_description: "Create dashboard" },
]);

// ➤ Assignments
await seedIfEmpty(ProjectAssignment, "ProjectAssignments", [
  { employee_id: 1, project_code: "P001", start_date: new Date("2024-04-01") },
  { employee_id: 2, project_code: "P002", start_date: new Date("2024-04-02") },
  { employee_id: 3, project_code: "P003", start_date: new Date("2024-04-03") },
  { employee_id: 4, project_code: "P004", start_date: new Date("2024-04-04") },
  { employee_id: 5, project_code: "P005", start_date: new Date("2024-04-05") },
]);

process.exit();

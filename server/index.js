import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import employeeR from "./routes/employeeRoutes.js";
import projectR from "./routes/projectRoutes.js";
import projectAssignmentR from "./routes/projectAssignmentRoutes.js";

app.use("/api/employees", employeeR);
app.use("/api/projects", projectR);
app.use("/api/project_assignments", projectAssignmentR);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the same folder as index.js
dotenv.config({ path: path.join(__dirname, ".env") });

console.log("🔍 MONGODB_URL =", process.env.MONGODB_URL);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

try {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Connected to MongoDB Atlas");
  console.log(`🛢️ Using database: ${mongoose.connection.name}`);
} catch (err) {
  console.error("MongoDB connection error:", err);
}

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
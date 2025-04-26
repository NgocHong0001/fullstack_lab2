import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import employeeR from "./routes/employeeRoutes.js";
import projectR from "./routes/projectRoutes.js";
import projectAssignmentR from "./routes/projectAssignmentRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the same folder as index.js
dotenv.config({ path: path.join(__dirname, ".env") });

//console.log("MONGODB_URL =", process.env.MONGODB_URL); testing connection string

//Middleware
const app = express();
// Serve static frontend files from /client/dist (for production)
const clientPath = path.resolve(__dirname, "../client/dist");

const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes, always after express!
app.use(express.json());
app.use(express.static(clientPath));

app.use("/api/employees", employeeR);
app.use("/api/projects", projectR);
app.use("/api/project_assignments", projectAssignmentR);

try {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Connected to MongoDB Atlas");
  console.log(`Using database: ${mongoose.connection.name}`);
} catch (err) {
  console.error("MongoDB connection error:", err);
}

app.get("/", (req, res) => {
  res.json({message: 'Backend is working!'});
});

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(clientPath, "index.html"));
}); // Serve the index.html file for all other routes and NOT "*" in the get request!

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


//when done developing run: cd client, npm run build  //ONLY WHEN DONE! with frontend too!
// that will create a /dist folder, and the code will serve vite via Express!
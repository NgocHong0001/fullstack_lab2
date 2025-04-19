import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const employeeSchema = new mongoose.Schema({
  employee_id: { type: Number, unique: true },
  full_name: String,
  email: String,
  hashed_password: String
});

// IMPORTANT: Plugin must go after schema is created
employeeSchema.plugin(AutoIncrement, { inc_field: "employee_id" });

export default mongoose.model("Employee", employeeSchema);
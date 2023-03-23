import mongoose from "mongoose";

const { Schema } = mongoose;

const exerciseSchema = new Schema({
  date: { type: String, required: true },
  userName: { type: String },
  reps: { type: Number },
  sets: { type: Number },
  kilos: { type: Number },
  mins: { type: Number },
  kiloms: { type: Number },
  exerciseStrength: { type: String },
  exerciseRunning: { type: String },
  sportSelected: { type: String, required: true },
});

const Exercise =
  mongoose?.models?.Exercise ||
  mongoose.model("Exercise", exerciseSchema, "exercises");

export default Exercise;

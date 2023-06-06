import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is Required"],
    trim: true,
    maxlength: [50, "Title Must have only 50 characters"],
  },
  venue: {
    type: String,
    required: [true, "Venue is Required"],
    trim: true,
    maxlength: [50, "Venue Must have only 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Description & Time is required"],
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: [true, "Date is Required"],
  },
  createdBy: {
    type: String,
    required: [true, "Created By required"],
  },
  creator:{
    type: String,
    required:[true,"Creator is Required"]
  },
  users: [String],
});

const Event = mongoose.model("Event", eventSchema);

export default Event;

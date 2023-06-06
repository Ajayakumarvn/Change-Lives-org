import Event from "../models/Event_Model.js";
import User from "../models/User_Model.js";
import mongoose from "mongoose";
// Get Event
const getEvent = async (req, res) => {
  try {
    const getpost = await Event.find();

    res.status(200).json({ status: "success", data: { getpost } });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// to get non participated events
const findEventsUserNotParticipated = async (req, res) => {
  try {
    const user = req.User.id;
    const participatedEventIds = user.participatedEvents;
    const eventsUserNotParticipated = await Event.find({
      _id: { $nin: participatedEventIds },
    });

    res.status(200).json({ status: "success", eventsUserNotParticipated });
  } catch (err) {
    console.log(err.message);
    res.json(400).json({
      error: err.message,
    });
  }
};

const getOrgEvent = async (req, res) => {
  try {
    console.log(req.User.id);
    const getpost = await Event.find({ createdBy: req.User.id });
    console.log(getpost);
    res.status(200).json({ status: "success", data: { getpost } });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById({ _id: req.params.id });

    res.status(200).json({ status: "success", data: { event } });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

// Post event
const postEvent = async (req, res) => {
  try {
    req.body.createdBy = req.User.id;
    req.body.creator=req.User.name;
    console.log(req.body.creator);
    const newpost = await Event.create(req.body);
    res.status(201).json({ status: "success", data: { newpost } });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

// Update Event

const updateEvent = async (req, res) => {
  console.log("ok");
  console.log(req.params.id);
  try {
    const updatepost = await Event.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({ status: "Updated", data: { updatepost } });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

// Delete Event

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete({ _id: req.params.id });
    console.log(req.params.id);
    res.status(200).json({ status: "Deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const NotParticipatedEvents = async (req, res) => {
  try {
    const npEvents = await Event.find({ users: { $nin: [req.User.id] } });
    console.log(npEvents);
    res.status(200).json({ message: "success", npEvents });
  } catch (err) {
    console.log(err.message, err);
    res.status(400).json({
      error: err.message,
    });
  }
};

const EventsController = {
  getEvent,
  getSingleEvent,
  postEvent,
  updateEvent,
  deleteEvent,
  NotParticipatedEvents,
  getOrgEvent,
};

export default EventsController;

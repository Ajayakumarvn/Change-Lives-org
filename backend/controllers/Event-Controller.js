import Event from "../models/Event_Model.js";

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

// to get non-participated events
const getNonPEvent = async (req, res) => {
  try {
    const getpost = await Event.find();
    res.status(200).json({ status: "success", data: { getpost } });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Post event
const postEvent = async (req, res) => {
  try {
    const newpost = await Event.create(req.body);
    res.status(201).json({ status: "success", data: { newpost } });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Update Event

const updateEvent = async (req, res) => {
  try {
    const updatepost = await Event.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({ status: "Updated", data: { updatepost } });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Delete Event

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ status: "Deleted" });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const EventsController = { getEvent, postEvent, updateEvent, deleteEvent };

export default EventsController;

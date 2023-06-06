import User from "../models/User_Model.js";
import Event from "../models/Event_Model.js";

// Get Event
const ViewAllUsers = async (req, res) => {
  try {
    const viewAll = await User.find({ role: { $ne: "Admin" } });
    res.status(200).json({ status: "success", data: { viewAll } });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const viewOrganizers = async (req, res) => {
  try {
    const organizers = await User.find({ role: "Organizer" });
    res.status(200).json({ status: "success", organizers });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const viewVolunteers = async (req, res) => {
  try {
    const volunteers = await User.find({ role: "Volunteer" });
    console.log(volunteers);
    res.status(200).json({ status: "success", volunteers });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const viewDonors = async (req, res) => {
  try {
    const donors = await User.find({ role: "Donor" });

    res.status(200).json({ status: "success", donors });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Delete Event

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "Deleted Successfully" });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Participate Event
const participateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const participated = await User.findByIdAndUpdate(
      { _id: req.User.id },
      { $push: { events: eventId } },
      { new: true }
    );

    const participatedids = await Event.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { users: req.User.id } },
      { new: true }
    );

    console.log(participated, participatedids);
    res.status(200).json({ status: "Success", participated, participatedids });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const participatedEvents = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.User.id });

    const eventIds = user.events;

    const events = await Event.find({ _id: { $in: eventIds } });

    console.log(events);
    res.status(200).json({ status: "Success", events });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const UserController = {
  ViewAllUsers,
  viewOrganizers,
  viewVolunteers,
  viewDonors,
  deleteUser,
  participateEvent,
  participatedEvents,
};

export default UserController;

import express from "express";
import EventsController from "../controllers/Event_Controller.js";
import auth from "../controllers/auth_Controller.js";

const EventRouter = express.Router();

EventRouter.route("/view").get(auth.protect, EventsController.getEvent);
EventRouter.route("/viewmy").get(auth.protect, EventsController.getOrgEvent);
EventRouter.route("/viewNon").get(
  auth.protect,
  EventsController.NotParticipatedEvents
);

EventRouter.route("/view/:id").get(
  auth.protect,
  EventsController.getSingleEvent
);
EventRouter.route("/add").post(auth.protect, EventsController.postEvent);
EventRouter.route("/update/:id").patch(
  auth.protect,
  EventsController.updateEvent
);
EventRouter.route("/delete/:id").delete(
  auth.protect,
  EventsController.deleteEvent
);

export default EventRouter;

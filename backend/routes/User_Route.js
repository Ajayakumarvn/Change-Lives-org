import express from "express";
import UserController from "../controllers/User_Controller.js";
import auth from "../controllers/auth_Controller.js";
import EventsController from "../controllers/Event_Controller.js";

const userRouter = express.Router();

userRouter.route("/signup").post(auth.signup);
userRouter.route("/login").post(auth.login);

userRouter.route("/viewAll").get(auth.protect, UserController.ViewAllUsers);

userRouter
  .route("/viewNon")
  .get(auth.protect, EventsController.NotParticipatedEvents);

userRouter
  .route("/viewVolunteers")
  .get(auth.protect, UserController.viewVolunteers);
userRouter
  .route("/viewOrganizers")
  .get(auth.protect, UserController.viewOrganizers);
userRouter.route("/viewDonors").get(auth.protect, UserController.viewDonors);

userRouter.route("/delete/:id").delete(auth.protect, UserController.deleteUser);

userRouter
  .route("/participate/:id")
  .patch(auth.protect, UserController.participateEvent);

userRouter
  .route("/participated")
  .get(auth.protect, UserController.participatedEvents);

export default userRouter;

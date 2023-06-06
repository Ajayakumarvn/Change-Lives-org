import express from "express";
import DonationController from "../controllers/Donation_Controller.js";
import auth from "../controllers/auth_Controller.js";

const DonationRouter = express.Router();

DonationRouter.route("/view").get(auth.protect, DonationController.getDonation);
DonationRouter.route("/donate").post(
  auth.protect,
  DonationController.postDonation
);

export default DonationRouter;

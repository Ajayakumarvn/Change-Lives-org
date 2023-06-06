import Donation from "../models/Donation_Modal.js";

// Get Donation
const getDonation = async (req, res) => {
  try {
    const viewDonation = await Donation.find();
    res.status(200).json({ status: "success", viewDonation });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Post event
const postDonation = async (req, res) => {
  try {
    const newDonation = await Donation.create(req.body);
    res.status(201).json({ status: "success", data: { newDonation } });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const DonationController = {
  getDonation,
  postDonation,
};

export default DonationController;

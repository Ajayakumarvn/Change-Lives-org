import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import User from "../models/User_Model.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { log } from "console";

// JWT TOKEN CREATION

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// SIGNUP

const signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    const token = signToken(newUser._id);
    const role = req.body.role;
    const name = req.body.name;
    res.status(200).json({
      status: "Created",
      token,
      role,
      name,
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// LOGIN

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("err");
      throw new Error("Provide An Email and Password");
    }

    const user = await User.findOne({ email }).select("+password");
    const correct = await user.correctPassword(password, user.password);
    const role = user.role;
    const name = user.name;
    if (!user || !correct) {
      console.log("err");
      throw new Error("Incorrect Email or Password");
    }

    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
      role,
      name,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

// PROTECT
const protect = async (req, res, next) => {
  try {
    //1.getting & checking Token if it's there
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new Error("You are not logged in!");
    }

    //Verification

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      throw new Error("The User belonging to this token does no longer exist");
    }

    req.User = currentUser;

    next();
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const auth = { signup, login, protect };

export default auth;

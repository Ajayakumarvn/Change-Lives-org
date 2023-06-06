import express from "express";
import EventRouter from "./routes/Events_Route.js";
import DonationRouter from "./routes/Donation_Route.js";
import userRouter from "./routes/User_Route.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.json());

app.use("/changelives/events", EventRouter);
app.use("/changelives/donation", DonationRouter);
app.use("/changelives/users", userRouter);

export default app;

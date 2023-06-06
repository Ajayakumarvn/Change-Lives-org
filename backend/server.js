import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

import app from "./index.js";

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

await mongoose
  .connect(DB, { useNewUrlParser: true })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => console.log(err));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Running on Port :${port}`);
});

import express from "express";
import dotenv from "dotenv";
import Connect from "./config/db.js";
import cors from "cors";

// routes import
import UserRoute from "./routes/user.route.js";
import TicketRoute from "./routes/ticket.route.js";

const app = express();
const port = 3000;
dotenv.config();


// cors middleware
const corsOptions = {
  origin: process.env.FRONTEND_LINK, // Allow only this domain
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Hello Home!");
});
app.use("/api/v1/auth", UserRoute);
app.use("/api/v1/ticket", TicketRoute);

app.listen(port, async () => {
  console.log(`Server is running on port ${port} \nwait for mongo srv...`);
  await Connect;
  console.log("Mongo server Start...");
});

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware অবশ্যই routes-এর আগে থাকবে
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("Student ID Finder API is running");
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
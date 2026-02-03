require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

connectDB();
const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(5000, () => {
  console.log("Server running");
});

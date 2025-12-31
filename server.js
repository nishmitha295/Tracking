const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const campaignRoutes = require("./src/routes/campaignRoutes");
const authMiddleware = require("./src/middleware/authMiddleware");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/campaigns", authMiddleware, campaignRoutes);

// Test route to debug token
app.get("/api/test", authMiddleware, (req, res) => {
  res.json({ message: "Token works!", user: req.user });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

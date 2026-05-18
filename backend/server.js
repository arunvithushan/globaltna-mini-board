const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ FIXED CORS (frontend safe)
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

// ✅ MongoDB Connection (better error handling)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1); // stop server if DB fails
  });

// ✅ Routes
app.use("/api/jobs", require("./routes/jobRoutes"));

// ✅ Health check route (VERY useful for debugging)
app.get("/", (req, res) => {
  res.json({ message: "API is running successfully 🚀" });
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// ✅ Start server safely
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const countryRoutes = require("./routes/countryRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const historyRoutes = require("./routes/historyRoutes");
const config = require("./config");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/history", historyRoutes);

// Connect to MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

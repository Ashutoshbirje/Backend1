const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const firRoutes = require("./routes/firRoutes");
const reportRoutes  = require("./routes/reportRoutes");
const Predict = require("./routes/predictiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", firRoutes);
app.use("/api", reportRoutes);
app.use("/api", Predict);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB error:", err));

// GEMINI_API_KEY=AIzaSyAguHfOIdjwp95TFzVtjnQf9wmbK7DaFhc
// PORT=5000
// MONGO_URI=mongodb+srv://AshutoshBirje:nojd2wsTSPH7D4Ma@clusterone.lg23t.mongodb.net/FIRDB?retryWrites=true&w=majority
// JWT_SECRET=12345

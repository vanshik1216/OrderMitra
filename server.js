// --------------------------
// FILE: server.js
// --------------------------

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./Routes/auth.routes");
const ordersRoutes = require("./Routes/orders.routes");
const restaurantRoutes = require("./Routes/restaurant.routes");
const menuRoutes = require("./Routes/menu.routes");

const app = express();
app.use(express.json());
app.use(express.static(__dirname+"/public"))

// Health check
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/Profile.html");
});

// mount modular routes
app.use("/api", authRoutes);
app.use("/api", ordersRoutes);
app.use("/api", restaurantRoutes);
app.use("/api", menuRoutes);

const PORT = process.env.PORT || 6789;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
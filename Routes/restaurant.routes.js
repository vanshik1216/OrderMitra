// --------------------------
// FILE: modules/restaurant/restaurant.routes.js
// --------------------------
const express = require("express");
const router = express.Router();
const { getRestaurantOrders, addMenuItem } = require("../Controller/restaurant.controller");
const { authenticate } = require("../Middleware/auth.middleware");

router.get("/restaurant/orders", authenticate, getRestaurantOrders);
router.post("/restaurant/menu", authenticate, addMenuItem);

module.exports = router;
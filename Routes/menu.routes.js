// --------------------------
// FILE: modules/menu/menu.routes.js
// --------------------------
const express = require("express");
const router = express.Router();
const { getMenuForRestaurant, listRestaurants } = require("../Controller/menu.controller");
const { authenticate } = require("../Middleware/auth.middleware");

router.get("/restaurant/:id/menu", authenticate, getMenuForRestaurant);
router.get("/restaurants", authenticate, listRestaurants);

module.exports = router;

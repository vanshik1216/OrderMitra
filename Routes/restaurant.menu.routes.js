const express = require("express");
const router = express.Router();
const { authenticate } = require("../Middleware/auth.middleware");

const {
    getMenu,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require("../Controller/restaurant.menu.controller");

router.get("/", authenticate, getMenu);
router.post("/add", authenticate, addMenuItem);
router.put("/update/:id", authenticate, updateMenuItem);
router.delete("/delete/:id", authenticate, deleteMenuItem);

module.exports = router;

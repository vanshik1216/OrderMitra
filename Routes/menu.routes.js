const express = require("express");
const router = express.Router();
const { authenticate } = require("../Middleware/auth.middleware");
const {
    getMenu,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require("../Controller/menu.controller");

// GET all menu items for logged restaurant
router.get("/", authenticate, getMenu);

// Add a new item
router.post("/add", authenticate, addMenuItem);

// Update item
router.put("/update/:id", authenticate, updateMenuItem);

// Delete item
router.delete("/delete/:id", authenticate, deleteMenuItem);

module.exports = router;
// const express = require("express");
// const router = express.Router();

// const {
//     getMenuForRestaurant,
//     listRestaurants,
//     searchRestaurants
// } = require("../Controller/menu.controller");

// const { authenticate } = require("../Middleware/auth.middleware");

// // CUSTOMER menu routes
// router.get("/restaurants", authenticate, listRestaurants);
// router.get("/restaurants/search", authenticate, searchRestaurants);
// router.get("/restaurant/:id/menu", authenticate, getMenuForRestaurant);

// module.exports = router;


// --------------------------
// FILE: modules/auth/auth.routes.js
// --------------------------
const express = require("express");
const router = express.Router();

const {
    signup,
    login,
    updateCustomer,
    getCustomerProfile
} = require("../Controller/auth.controller");

const { authenticate } = require("../Middleware/auth.middleware");


// AUTH ROUTES
router.post("/signup", signup);
router.post("/login", login);


// CUSTOMER PROFILE ROUTES
console.log("authenticate:", authenticate);
console.log("getCustomerProfile:", getCustomerProfile);

router.get("/customer/me", authenticate, getCustomerProfile);
router.put("/customer/update", authenticate, updateCustomer);

module.exports = router;

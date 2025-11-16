// --------------------------
// FILE: Controller/restaurant.controller.js
// --------------------------
const prisma = require("../Utility/prisma");
const bcrypt = require("bcryptjs");

// ------------------------------
// GET Restaurant Profile (LOGGED IN RESTAURANT)
// ------------------------------
async function getRestaurantProfile(req, res) {
    try {
        if (req.user.role !== "restaurant-owner") {
            return res.json({ success: false, message: "Access denied" });
        }

        const restaurant = await prisma.restaurant.findUnique({
            where: { id: req.user.id }
        });

        if (!restaurant) {
            return res.json({ success: false, message: "Restaurant not found" });
        }

        return res.json({ success: true, restaurant });

    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
}



// ------------------------------
// UPDATE Restaurant Profile
// ------------------------------
async function updateRestaurant(req, res) {
    try {
        const { name, email, password, address, phone } = req.body;

        if (req.user.role !== "restaurant-owner") {
            return res.json({ success: false, message: "Access denied" });
        }

        // CHECK EMAIL DUPLICATE IN RESTAURANT TABLE ONLY
        const existing = await prisma.restaurant.findUnique({
            where: { email }
        });

        if (existing && existing.id !== req.user.id) {
            return res.json({
                success: false,
                message: "Email already in use"
            });
        }

        // Only hash if password is provided
        let hashedPassword = undefined;
        if (password && password.trim() !== "") {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updated = await prisma.restaurant.update({
            where: { id: req.user.id },
            data: {
                name,
                email,
                address,
                phone,
                ...(hashedPassword && { password: hashedPassword })
            }
        });

        return res.json({
            success: true,
            message: "Restaurant profile updated",
            restaurant: updated
        });

    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
}



// ------------------------------
// GET ORDERS FOR RESTAURANT
// ------------------------------
async function getRestaurantOrders(req, res) {
    try {
        if (req.user.role !== "restaurant-owner") {
            return res.json({ success: false, message: "Access denied" });
        }

        const orders = await prisma.order.findMany({
            where: { restaurantId: req.user.id },
            include: {
                items: { include: { menuItem: true } },
                user: true
            }
        });

        return res.json({ success: true, orders });

    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
}



// ------------------------------
// ADD MENU ITEM
// ------------------------------
async function addMenuItem(req, res) {
    try {
        if (req.user.role !== "restaurant-owner") {
            return res.json({ success: false, message: "Forbidden" });
        }

        const { name, price } = req.body;

        if (!name || !price) {
            return res.json({ success: false, message: "Name & Price required" });
        }

        const menuItem = await prisma.menuItem.create({
            data: {
                name,
                price: Number(price),
                restaurantId: req.user.id
            }
        });

        return res.json({
            success: true,
            message: "Menu item added",
            menuItem
        });

    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
}

module.exports = {
    getRestaurantProfile,
    updateRestaurant,
    getRestaurantOrders,
    addMenuItem
};

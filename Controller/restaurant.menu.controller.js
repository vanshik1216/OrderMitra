const prisma = require("../Utility/prisma");

exports.getMenu = async (req, res) => {
    try {
        if (req.user.role !== "restaurant-owner") {
            return res.json({ success: false, message: "Access denied" });
        }

        const menu = await prisma.menuItem.findMany({
            where: { restaurantId: req.user.id }
        });

        return res.json({ success: true, menu });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

exports.addMenuItem = async (req, res) => {
    try {
        const { name, price } = req.body;

        const item = await prisma.menuItem.create({
            data: {
                name,
                price: Number(price),
                restaurantId: req.user.id
            }
        });

        res.json({ success: true, item });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

exports.updateMenuItem = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const item = await prisma.menuItem.update({
            where: { id },
            data: req.body
        });

        res.json({ success: true, item });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

exports.deleteMenuItem = async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.menuItem.delete({ where: { id } });

        res.json({ success: true, message: "Deleted" });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

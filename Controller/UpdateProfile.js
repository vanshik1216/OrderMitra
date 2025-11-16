// const bcrypt = require("bcryptjs");
// const prisma = require("../Utility/prisma");

// async function updateProfile(req, res) {
//     try {
//         const userId = req.user.id;
//         const role = req.user.role;

//         const { name, address, phone, password } = req.body;

//         let data = {};
//         if (name) data.name = name;
//         if (address) data.address = address;
//         if (phone) data.phone = phone;
//         if (password) data.password = await bcrypt.hash(password, 10);

//         let updatedUser;

//         if (role === "user") {
//             updatedUser = await prisma.user.update({ where: { id: userId }, data });
//         } else if (role === "restaurant") {
//             updatedUser = await prisma.restaurant.update({ where: { id: userId }, data });
//         } else {
//             return res.status(400).json({ success: false, message: "Invalid role" });
//         }

//         delete updatedUser.password;

//         return res.json({
//             success: true,
//             message: "Profile updated",
//             user: updatedUser,
//             role
//         });

//     } catch (err) {
//         return res.status(400).json({ success: false, message:"Update Failed" });
//     }
// }

// module.exports = { updateProfile };




const bcrypt = require("bcryptjs");
const prisma = require("../Utility/prisma");
async function updateCustomer(req, res) {
    try {
        const { name, email, password, address, phone } = req.body;

        if (req.user.role !== "customer") {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        // check duplicate email
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing && existing.id !== req.user.id) {
            return res.status(409).json({ success: false, message: "Email already in use" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const updated = await prisma.user.update({
            where: { id: req.user.id },
            data: {
                name,
                email,
                password: hashed,
                address,
                phone
            }
        });

        return res.json({ success: true, message: "Profile updated", user: updated });

    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
}
async function getCustomerProfile(req, res) {
    try {
        if (req.user.role !== "customer") {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });

        return res.json({ success: true, user });

    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
}

module.exports = {  updateCustomer, getCustomerProfile };

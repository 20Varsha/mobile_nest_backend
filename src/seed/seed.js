const User = require("../models/user");
const Product = require("../models/product");
const adminData = require("./admin.json");
const bcrypt = require("bcryptjs");

const seedData = async () => {
    try {
        const adminUser = await User.findOne({ role: "admin" });
        if (!adminUser) {
            const hashedAdminData = await Promise.all(
                adminData.map(async (user) => {
                    const hashedPassword = await bcrypt.hash(user.password, 10); // Hashing the password
                    return { ...user, password: hashedPassword }; // Replace plain password with hashed password
                })
            );
            await User.insertMany(hashedAdminData);
        }
    } catch (error) {
        console.error("Error seeding data:", error);
    }
};

module.exports = seedData;

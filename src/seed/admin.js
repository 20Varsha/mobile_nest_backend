const User = require("../models/user");
const adminData = require("./admin.json");
const bcrypt = require("bcryptjs");

const seedData = async () => {
    try {
        // Check if an admin user already exists
        const adminUser = await User.findOne({ role: "admin" });
        if (!adminUser) {
            // Hash passwords and prepare the data for seeding
            const hashedAdminData = await Promise.all(
                adminData.map(async (user) => {
                    const hashedPassword = await bcrypt.hash(user.password, 10); // Hashing the password
                    return { ...user, password: hashedPassword }; // Replace plain password with hashed password
                })
            );

            // Seed the admin user from hashedAdminData
            await User.insertMany(hashedAdminData);
            console.log("Admin user seeded.");
        } else {
            console.log("Admin user already exists.");
        }
    } catch (error) {
        console.error("Error seeding data:", error);
    }
};

module.exports = seedData;

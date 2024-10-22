// const user = require("../model/user");
// const user_data = require("./user.json");

// const seeded_data=async (req, res) => {
//     const seed_user = await user.find();
//     if (seed_user.length ===0) {
//       user_data.forEach(async (data) => {
//         const user_values = {
//           name: data.name,
//           email: data.email,
//         }
//         const options = { ordered: true };
//         await user.insertMany(user_values, options);
//       })
//     }
// }

// module.exports=seeded_data
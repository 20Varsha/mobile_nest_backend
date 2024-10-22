const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  signupToken: {
    type: String,
  },
  total: {
    type: Number,
    default: 0,
  },
  profileImage: {
    type: String, 
  },
  mobile: {
    type: String,
  },
  resetToken: {
    type: String,
    default: null,
},
resetTokenExpiration: {
    type: Date,
    default: null,
}
});

module.exports = mongoose.model("Users", UsersSchema);

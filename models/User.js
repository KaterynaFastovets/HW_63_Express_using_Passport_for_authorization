const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

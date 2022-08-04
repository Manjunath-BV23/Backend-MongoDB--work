const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pincode: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: false, default: "Male" }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema); // user => users


module.exports = User;

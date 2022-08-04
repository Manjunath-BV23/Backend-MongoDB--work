const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect("mongodb://localhost:5399/Database");
};
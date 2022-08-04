const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect("mongodb+srv://manjunath:manju123@cluster0.5tjcw.mongodb.net/files?");
};

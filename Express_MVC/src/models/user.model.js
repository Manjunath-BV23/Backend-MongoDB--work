const mongoose = require("mongoose")


// step 2 :- create a schema
const userSchema = new mongoose.Schema(
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      gender: { type: String, required: false, default: "Male" },
      date_of_birth: { type: Date,required: true},
      type: {type:String, required:true}
    },
    {
      versionKey: false, // removed __v
      timestamps: true, // createdAt, updatedAt
    }
  );

module.exports = mongoose.model("user", userSchema); // user => users
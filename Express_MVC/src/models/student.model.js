const mongoose = require("mongoose")


// step 2 :- create a schema
const studentSchema = new mongoose.Schema(
    {
        roll_id: { type: String, required: true },
        current_batch: { type: String, required: true },
    },
    {
        versionKey: false, // removed __v
        timestamps: true, // createdAt, updatedAt
    }
  );

module.exports = mongoose.model("student", studentSchema); // user => users
const mongoose = require("mongoose")


// step 2 :- create a schema
const batchSchema = new mongoose.Schema(
    {
      batch_name: { type: String, required: true }
    },
    {
      versionKey: false, // removed __v
      timestamps: true, // createdAt, updatedAt
    }
  );

module.exports = mongoose.model("batch", batchSchema); // user => users
const mongoose = require("mongoose")


// step 2 :- create a schema
const evaluationSchema = new mongoose.Schema(
    {
      date_of_evaluation: { type: Date, required: true },
      instructor: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
      batch_id: { type: mongoose.Schema.Types.ObjectId, ref: "batch", required: true },


    },
    {
      versionKey: false, // removed __v
      timestamps: true, // createdAt, updatedAt
    }
  );

module.exports = mongoose.model("evaluation", evaluationSchema); // user => users
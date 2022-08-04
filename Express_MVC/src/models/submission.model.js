const mongoose = require("mongoose")


// step 2 :- create a schema
const submissionSchema = new mongoose.Schema(
    {
      evaluation_id: { type: mongoose.Schema.Types.ObjectId, ref: "evaluation", required: true },
      student_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
      marks: { type:Number, required: true },


    },
    {
      versionKey: false, // removed __v
      timestamps: true, // createdAt, updatedAt
    }
  );

module.exports = mongoose.model("submission", submissionSchema); // user => users
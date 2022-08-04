const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json())

//step 1 :-connect to monsodb
const connect = () =>{
    return mongoose.connect("mongodb+srv://manjusowji:sowji_53@cluster0.oer66.mongodb.net/PracticeDb?")
}
// PracticeDb?retryWrites=true&w=majority

  // step 2 :- create a schema
  const userSchema = new mongoose.Schema({
    id: { type: Number, required: true },    // not _id
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: false, default: "Male" },
    age: { type: Number, required: true },
    ip_address: { type: String, required: false },
    
  },
  {
    versionKey:false,
    timestamps:true
  }
);



  // step 3 :- create a model
 
  const User = mongoose.model("user", userSchema); // user => users
  
  //db.users.find()
  // User => db.users


  // admin, user, student, teacher, IA, SDE1
  app.get("/users", async (req, res) => {
    // thennable => proper then
    try {
      const users = await User.find().lean().exec(); // db.users.find() // proper promise
      return res.send(users);
    } catch (err) {
      return res.send(err.message);
    }
  });
  app.post("/users", async (req, res) => {
    // thennable => proper then
    try {
      const users = await User.create(req.body)
      return res.status(200).send(users);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
 



app.listen(5399, async function () {
  try {
    await connect();
    console.log("listening on port 5399");
  } catch (e) {
    console.log(e.message);
  }
});
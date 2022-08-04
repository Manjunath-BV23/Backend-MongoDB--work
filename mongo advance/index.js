const express = require("express");
const mongoose = require("mongoose");

const app = express();



  // step 1 :- connect to mongodb
  const connect = () => {
    //  mongodb://127.0.0.1:27017/Database
    return mongoose.connect("mongodb+srv://manjunath_bv:manjus_5399@cluster0.0xkjm.mongodb.net/Database?retryWrites=true&w=majority")
  };


  // step 2 :- create a schema
  const userSchema = new mongoose.Schema({
    id: { type: Number, required: true }, // not _id
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: false, default: "Male" },
    age: { type: Number, required: true },
    ip_address: { type: String, required: false },
  });



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
 


app.listen(4335, async function () {
  try {
    await connect();
    console.log("listening on port 4335");
  } catch (e) {
    console.log(e.message);
  }
});
// admin, user, student, teacher, IA, SDE1
// app.get("/book", logger1("GameOfThrones"), (req, res) => {
//   res.send({bookName: req.name});
// });

// function logger(req, res, next) {
//   console.log("Fetching all books");
//   next();
// }

// function logger1(name) {
//   return function (req, res, next) {
//     if (name == "GameOfThrones" || name == "HarryPotter") {
//       req.name = name;
//     }
//     next();
//   };
// }

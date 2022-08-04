const express = require("express");
const mongoose = require("mongoose");

const app = express();

// 1

const connect = () => {
    return mongoose.connect("mongodb+srv://manjus:manju_11@cluster0.03syb.mongodb.net/practiceDatab?")
}


  // step 2 :- create a schema
  const userSchema = new mongoose.Schema({
    id: { type: Number, required: true }, // not _id
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: false, default: "Male" },
    ip_address: { type: String, required: false },
  });

  // 3

  const User = mongoose.model("users", userSchema)

  app.post("/users", async (req, res) => {
    try {
      const user = await User.create(req.body);
  
      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  app.get("/users", async (req, res) => {
    // thennable => proper then
    try {
      const users = await User.find().lean().exec(); // db.users.find() // proper promise
  
      return res.send(users);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  // met + route => get /users/${variable} and the name of variable is id
  app.get("/users/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id).lean().exec();
  
      if (user) {
        return res.send(user);
      } else {
        return res.status(404).send({message: "User not found"})
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  // met + route => patch /users/${variable} and the name of variable is id
  app.patch("/users/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
  
      res.status(201).send(user);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  // met + route => delete /users/${variable} and the name of variable is id
  app.delete("/users/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id).lean().exec();
  
      res.send(user);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });



app.listen(2353, async function (){
    try{
        await connect()
        console.log("listenig server 2353")
    }
    catch (e){
        console.log(e.message)
    }
})
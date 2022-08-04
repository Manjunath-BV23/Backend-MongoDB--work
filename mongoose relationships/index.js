const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// step 1 :- connect to mongodb
const connect = () => {
  return mongoose.connect(
    // mongodb://127.0.0.1:27017/web14
    "mongodb+srv://dhaval:dhaval_123@cluster0.ljuvz.mongodb.net/web14?retryWrites=true&w=majority"
  );
};

// step 2 :- create a schema
const userSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true }, // not _id
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: false, default: "Male" },
    age: { type: Number, required: true },
    ip_address: { type: String, required: false },
  },
  {
    versionKey: false, // removed __v
    timestamps: true, // createdAt, updatedAt
  }
);

// step 3 :- create a model
const User = mongoose.model("user", userSchema); // user => users

//db.users.find()
// User => db.users

// admin, user, student, teacher, IA, SDE1

/*
  work with users collection
  GET => get /users
  POST => post /users
  GET SINGLE ITEM => get /users/:id
  UPDATE SINGLE ITEM => patch /users/:id
  DELETE SINGLE ITEM => delete /users/:id
*/

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

app.listen(2345, async function () {
  try {
    await connect();
    console.log("listening on port 2345");
  } catch (e) {
    console.log(e.message);
  }
});

// app.get("/user", logger1("admin"), (req, res) => {
//   res.send(req.role);
// });

// function logger1(role) {
//   return function (req, res, next) {
//     if (role == "admin") {
//       req.role = "admin";
//     } else {
//       req.role = "user";
//     }
//     next();
//   };
// }
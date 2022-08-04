const express = require("express")

const connect = require("./configs/db")
const userController = require("./controllers/user.controller");
const studentController = require("./controllers/student.controller");
const batchController = require("./controllers/batch.controller");
const evaluationController = require("./controllers/evaluation.controller");
const submissionController = require("./controllers/submission.controller");



const app = express()

app.use(express.json());
app.use("/users", userController);
app.use("/students", studentController);
app.use("/batch", batchController);
app.use("/evaluation", evaluationController);
app.use("/submission", submissionController);






// app.post("/users", async (req, res) => {
//   try {
//     const user = await User.create(req.body);

//     return res.status(201).send(user);
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// });

// app.get("/users", async (req, res) => {
//   // thennable => proper then
//   try {
//     const users = await User.find().lean().exec(); // db.users.find() // proper promise

//     return res.send(users);
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// });

// // met + route => get /users/${variable} and the name of variable is id
// app.get("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).lean().exec();

//     if (user) {
//       return res.send(user);
//     } else {
//       return res.status(404).send({ message: "User not found" });
//     }
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// });

// // met + routeusers/${variable} and the name of  => patch /variable is id
// app.patch("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     })
//       .lean()
//       .exec();

//     res.status(201).send(user);
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// });

// // met + route => delete /users/${variable} and the name of variable is id
// app.delete("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id).lean().exec();

//     res.send(user);
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// });



app.listen(2345, async function () {
    try {
      await connect();
      console.log("listening on port 2345");
    } catch (e) {
      console.log(e.message);
    }
  });
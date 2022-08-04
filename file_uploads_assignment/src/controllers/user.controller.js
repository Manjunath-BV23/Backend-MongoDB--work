const express = require("express");

const {
  upload,
  uploadSingle,
  uploadMultiple,
} = require("../middlewares/file-upload");

const User = require("../models/user.model");

const router = express.Router();

router.post("/single", uploadSingle("profile_pic"), async (req, res) => {
  try {
    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: req.file.path,
    });

    return res.send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});



// /users
router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.send({ users });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const users = await User.findById().lean().exec();

    return res.send({ users });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
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


router.delete(":id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();

    res.send(user);
  } catch (err) {
    return res.status(500).send(err.message);
    }
  });
   
module.exports = router;

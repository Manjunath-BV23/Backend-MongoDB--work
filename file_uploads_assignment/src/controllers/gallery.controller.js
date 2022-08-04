const express = require("express");

const {
  upload,
  uploadMultiple,
} = require("../middlewares/file-upload");

const Gallery = require("../models/gallery.model");

const router = express.Router();

router.post("/multiple", uploadMultiple("profile_pic"), async (req, res) => {
  try {
    const filePaths = req.files.map((file) => file.path);

    const user = await Gallery.create({
      profile_pic: filePaths,

    });

    return res.send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});



// /users
router.get("", async (req, res) => {
  try {
    const users = await Gallery.find().lean().exec();

    return res.send({ users });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;

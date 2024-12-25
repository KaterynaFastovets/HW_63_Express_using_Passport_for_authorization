const express = require("express");
const router = express.Router();
const User = require("../models/User");
const userController = require("../usersController");


router.get("/", userController.getUsers);


router.get("/add", (req, res) => {
  res.render("users/add");
});

router.post("/add", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.redirect("/users");
  } catch (err) {
    res.status(400).render("error", { message: err.message });
  }
});


router.get("/edit/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("users/edit", { user });
  } catch (err) {
    res.status(404).render("error", { message: "User not found" });
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    await User.updateOne(
      { _id: req.params.id },
      { $set: { name, email, age } }
    );
    res.redirect("/users");
  } catch (err) {
    res.status(400).render("error", { message: err.message });
  }
});


router.post("/delete/:id", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.redirect("/users");
  } catch (err) {
    res.status(400).render("error", { message: err.message });
  }
});

module.exports = router;

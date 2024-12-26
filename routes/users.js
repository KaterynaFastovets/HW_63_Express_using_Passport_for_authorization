const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const userController = require("../usersController");

router.get("/", userController.getUsers);

router.get("/add", (req, res) => {
  res.render("users/add");
});

router.post("/add", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
      req.flash("error", "All fields are required.");
      return res.redirect("/users/add");
    }
    const newUser = new User({ name, email, age });
    await newUser.save();
    req.flash("success", "User added successfully!");
    res.redirect("/users");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/users/add");
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw new Error("Invalid user ID.");
    }
    const user = await User.findById(req.params.id);
    if (!user) throw new Error("User not found.");
    res.render("users/edit", { user });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/users");
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw new Error("Invalid user ID.");
    }
    await User.updateOne(
      { _id: req.params.id },
      { $set: { name, email, age } }
    );
    req.flash("success", "User updated successfully!");
    res.redirect("/users");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect(`/users/edit/${req.params.id}`);
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw new Error("Invalid user ID.");
    }
    await User.deleteOne({ _id: req.params.id });
    req.flash("success", "User deleted successfully!");
    res.redirect("/users");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/users");
  }
});

module.exports = router;

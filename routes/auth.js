const passport = require("../config/passport-config");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

// Registration 
router.get("/register", (req, res) => {
  res.render("register");
});

 router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "Email is already in use");
      return res.redirect("/register");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword, 
    });
    await newUser.save();

    req.flash("success", "Registration successful! Log in.");
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    req.flash("error", "Error during registration.");
    res.redirect("/register");
  }
});

// Login 
router.get("/login", (req, res) => {
  const flashMessages = req.flash("error");
  res.render("login", { messages: flashMessages });
});


router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
    successRedirect: "/dashboard",
    successFlash: "Login successful!",
  })
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have successfully logged out.");
    res.redirect("/login");
  });
});

router.get("/dashboard", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login"); 
  }
  res.render("dashboard");
});

module.exports = router;

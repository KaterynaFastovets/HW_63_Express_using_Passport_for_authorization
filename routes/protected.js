const express = require("express");
const router = express.Router();
const User = require("../models/User");


router.get("/users", async (req, res) => {
  try {
    const users = await User.find(); 
    res.render("users", { users });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error fetching users.");
  }
});

module.exports = router;

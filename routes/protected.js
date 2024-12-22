const express = require("express");
const router = express.Router();

// Middleware for authorization verification
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

router.get("/protected", ensureAuthenticated, (req, res) => {
  res.send(`Welcome, ${req.user.email}! This is a protected route.`);
});

module.exports = router;

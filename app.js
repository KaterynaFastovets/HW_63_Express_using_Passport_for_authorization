require("dotenv").config();
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");
const path = require("path");
const favicon = require("serve-favicon");

process.noDeprecation = true;

const app = express();


app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());


app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success_messages = req.flash("success");
  res.locals.error_messages = req.flash("error");
  next();
});

app.set("view engine", "ejs");

// MongoDB connection
const mongoUri = process.env.MONGO_DB 
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err.message);
    process.exit(1); 
  });


app.use("/", authRoutes); 
app.use("/", protectedRoutes); 

// Home page
app.get("/", (req, res) => {
  const flashMessages = req.flash("error"); 
  res.render("index", { messages: flashMessages });
  req.flash("error", ""); 
});

// Error handling 
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.get("/dashboard", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login"); 
  }
  res.render("dashboard");
  
});


const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

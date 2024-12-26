require("dotenv").config();
const express = require("express");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const path = require("path");
const favicon = require("serve-favicon");
const userRoutes = require("./routes/users");
const session = require("express-session");


process.noDeprecation = true;

const app = express();
const PORT = 3000;

app.use(
  session({
    secret: process.env.SECRET_KEY, 
    resave: false,
    saveUninitialized: true,
  })
);


app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(flash());

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).render("error", { message: "Internal Server Error" });
});



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


// Routes
app.use('/users', userRoutes);

// Root Route
app.get('/', (req, res) => {
    res.redirect('/users');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

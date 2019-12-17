require("dotenv").config();

const express = require("express");
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const app = express();

const db = require("./models");

const indexRoutes = require("./routes/index");

const PORT = process.env.PORT || 8080;

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/fitness_tracker_db",
  { useUnifiedTopology: true, useNewUrlParser: true }
);
app.engine("hbs", hbs({ defaultLayout: "main.hbs" }));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(flash());


// PASSPORT CONFIG
app.use(
  require("express-session")({
    secret: "Tito is the man!",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

// app.use(function(req, res, next) {
//   // res.locals.currentUser = req.user;
//   res.locals.error = req.flash("error");
//   res.locals.success = req.flash("success");
//   next();
// });

app.use("/", indexRoutes);

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

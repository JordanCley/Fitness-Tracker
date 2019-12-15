const router = require("express").Router();
const db = require("../models");
const passport = require("passport");
const LocalStrategy = require("passport-local");

router.get("/", function(req, res) {
  res.render("landing");
});

router.get("/home", function(req, res) {
  res.render("home");
});

router.get("/dashboard", isLoggedIn, function(req, res) {
  res.render("dashboard");
});

router.get("/register", function(req, res) {
  res.render("register");
});

router.post("/register", function(req, res) {
  const newUser = new db.User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });
  db.User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/dashboard");
    });
  });
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("home");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;

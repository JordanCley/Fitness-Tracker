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

router.get("/dashboard/:id", isLoggedIn, function(req, res) {
  db.User.findById(req.params.id).then(dbUser => {
    console.log(dbUser);
    res.render("dashboard", { User: dbUser });
  });
});

// REGISTER ROUTES
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
      res.redirect(`/dashboard/${user._id}`);
    });
  });
});

// LOGIN ROUTES
router.get("/login", function(req, res) {
  res.render("login");
});


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect("/login"); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect(`/dashboard/${user._id}`);
    });
  })(req, res, next);
});


// LOG OUT ROUTE
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

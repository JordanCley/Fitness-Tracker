const router = require("express").Router();
const db = require("../models");

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/home", function(req, res){
    res.render("home");
});

router.get("/register", function(req, res){
    res.render("register");
});

router.get("/login", function(req, res){
    res.render("login");
});

router.get("/logout", function(req, res){
    res.redirect("home");
});

module.exports = router;
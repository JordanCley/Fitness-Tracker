const db = require("../models");
const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
  
middlewareObj.checkUser = function(req, res, next){
    db.User.findById(req.params.id, function(err, foundUser){
      if(err || !foundUser){
        console.log(err);
        // flash error message
        res.redirect("/");
      } else if(foundUser._id.equals(req.user._id)){
        req.user = foundUser;
        next();
      } else {
        // flash error message/dont have permission
        res.redirect("/");
      }
    })
  }

  module.exports = middlewareObj;
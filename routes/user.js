const express = require("express"),
      router  = express.Router(),
      passport = require("passport"),
      User = require("../models/user");


router.get("/register", function(req, res){
    res.render("user/register");
});

router.post("/register", function(req, res){
    User.register(new User({
        username: req.body.username}),
        req.body.password, 
        function(err, user){
            if(err){
                req.flash("error", err.message);
                return res.render("/register");
            } 
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome: " + user.username);
                console.log("works")
                res.redirect("/bugs");
        });
    });
}); 

// Login
router.get("/login", function(req, res){
    res.render("user/login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/bugs",
    failureRedirect: "/login"}), 
    function(req, res){
        req.flash("success", "Hello: " + user.username);
        res.redirect(back);
});

//logout
router.get("/logout", function(req, res){
    req.logOut();
    req.flash("success", "Goodbye");
    res.redirect("/");
});
    
router.get("/user/:userID", function (req, res){
    User.findById(req.params.userID, function (err, user){
        if (err){
            console.log("error")
        } else {
            res.render("user/show")
        }
    })
});
    


module.exports = router;
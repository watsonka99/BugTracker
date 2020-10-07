var Campground = require("../models/bug");
var Comment = require("../models/user");

// all middleware here
const MiddleWare = {

    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        } 
        req.flash("error", "Please login first!");
        res.redirect("/login");
    },
    
    checkBugOwner: function(req, res, next){   
        if(req.isAuthenticated()){
            Bug.findById(req.params.id, function(err, foundCamp){
                if (err) {
                    req.flash("error", "Campground not found");
                    res.redirect("back");
                } else {
                    if (foundCamp.author.id.equals(req.user._id)){
                        return next();
                    } else {
                        req.flash("error", "Permission denied!");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "Please login first!");
        }
    }
};

module.exports = MiddleWare;


const express = require("express"),
      router  = express.Router(),
      Bug = require("../models/bug"),
      Middleware = require("../middleware");

// INDEX
router.get("/", function(req, res){
    Bug.find({}, function(err, bugs){
        if (err) {
            console.log(err);
        } else {
            res.render("bug/index", {bugs: bugs});  
        }
    });
});

// NEW
router.get("/new", function(req, res){
    res.render("bug/new");
});

// CREATE
router.post("/", function(req, res){
    console.log(req.body.severity);
    Bug.create({
        summary: req.body.summary,
        stepsToReproduce: req.body.stepsToReproduce,
        expectedResults: req.body.expectedResults,
        Severity: req.body.severity,
        actualResults: req.body.actualResults
    }, function(err, newBug){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/bugs");
            req.flash("success", "Bug"+ newBug._id + "added")
        }
    });
});

// show
router.get("/:id", function(req, res) {
    Bug.findById(req.params.id, function(err, foundBug){
        if(err){
            res.redirect(back);
        } else {
            res.render("bug/show", {bug:foundBug});
        }
    });
});

// edit
router.get("/:id/edit", Middleware.isLoggedIn, function(req, res){
    Bug.findById(req.params.id, function(err, foundBug){
        if(err){
            res.redirect("back");
        } else {
            res.render("bug/edit", {bug:foundBug});
        }
    });
});
  
// update
router.put("/:id", Middleware.isLoggedIn, function(req, res){
    Bug.findByIdAndUpdate(req.params.id, req.body.bug, function(err, updatedBug){
        if (err){
            res.redirect(back);
        } else {
            res.redirect("/bugs/" + req.params.id);
        }
    });
});
  
  // Destroy
router.delete("/:id", Middleware.isLoggedIn, function(req, res){
    Bug.findByIdAndRemove(req.params.id, function(err){
        if (err){
            res.redirect("/bugs");
        } else {
            res.redirect("/bugs");
        }
    });
});

module.exports = router;
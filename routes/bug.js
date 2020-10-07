

const express = require("express"),
      router  = express.Router(),
      Bug = require("../models/bug"),
      Middleware = require("../middleware");

// INDEX
router.get("/", function(req, res){
    Bug.find({}, function(err, bugs){
        if (err) {
            req.flash("error", "Failed to get bugs")
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
            req.flash("error", "Failure to add Bug, please try again later");
            res.redirect("/bugs");
        } else {
            req.flash("success", "Bug "+ newBug._id + " has been added");
            res.redirect("/bugs");
        }
    });
});

// show
router.get("/:id", function(req, res) {
    Bug.findById(req.params.id, function(err, foundBug){
        if(err){
            req.flash("error", "Failed to show bug");
            res.redirect(back);
        } else {
            res.render("bug/show", {bug:foundBug});
        }
    });
});

// edit
router.get("/:id/edit", Middleware.checkBugOwner, function(req, res){
    Bug.findById(req.params.id, function(err, foundBug){
        if(err){
            req.flash("error", "Failed to load bug, please try again later");
            res.redirect(back);
        } else {
            res.render("bug/edit", {bug:foundBug});
        }
    });
});
  
// update
router.put("/:id", Middleware.checkBugOwner, function(req, res){
    Bug.findByIdAndUpdate(req.params.id, req.body.bug, function(err, updatedBug){
        if (err){
            req.flash("error", "Failed to update bug, please try again later");
            res.redirect(back);
        } else {
            req.flash("success", req.params.id + "has been updated");
            res.redirect("/bugs/" + req.params.id);
        }
    });
});
  
  // Destroy
router.delete("/:id", Middleware.isLoggedIn, function(req, res){
    Bug.findByIdAndRemove(req.params.id, function(err){
        if (err){
            req.flash("error", "Failed to delete bug " + req.params.id);
            res.redirect("/bugs");
        } else {
            req.flash("success", "Bug " + req.params.id + " has been deleted");
            res.redirect("/bugs");
        }
    });
});

module.exports = router;
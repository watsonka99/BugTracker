const express = require("express"),
      router  = express.Router(),
      Bug = require("../models/bug");

// INDEX
router.get("/", function(req, res){
    Bug.find({}, function(err, bugs){
        if (err) {
            console.log(err);
        } else {
            res.render("index", {bugs: bugs});  
        }
    });
});

// NEW
router.get("/new", function(req, res){
    res.render("new");
});

// CREATE
router.post("/", function(req, res){
    Bug.create({
        summary: req.body.summary,
        stepsToReproduce: req.body.stepsToReproduce,
        expectedResults: req.body.expectedResults,
        actualResults: req.body.actualResults
    }, function(err, newBug){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/bugs");
        }
    });
});


module.exports = router;